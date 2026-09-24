/* Screen flow, answer state and wiring. */
(function (global) {
  'use strict';

  var DASS = global.DASS;
  var I18N = global.I18N;
  var t = I18N.t;

  var answers = new Array(DASS.COUNT).fill(null);
  var currentEntry = null;
  var lastSyncKey = null;
  var toastTimer = null;

  var el = {
    langSwitch: document.getElementById('lang-switch'),
    scale: document.getElementById('rating-scale'),
    form: document.getElementById('quiz-form'),
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),
    scoreList: document.getElementById('score-list'),
    scoreBars: document.getElementById('score-bars'),
    syncNote: document.getElementById('sync-note'),
    historyList: document.getElementById('history-list'),
    toast: document.getElementById('toast'),
  };

  /* ------------------------------------------------------ navigation */
  /* mode: 'push' adds a history entry, 'replace' swaps the current one
   * (used when the finished questionnaire hands over to the result, so that
   * going back from the result lands on home), 'none' leaves history alone. */
  function show(name, mode) {
    document.querySelectorAll('.view').forEach(function (view) {
      view.classList.toggle('is-active', view.id === 'view-' + name);
    });
    var active = document.getElementById('view-' + name);
    var scroll = active && active.querySelector('.view__scroll');
    if (scroll) scroll.scrollTop = 0;

    if (mode === 'replace') history.replaceState(name, '', '#' + name);
    else if (mode !== 'none') history.pushState(name, '', '#' + name);
  }

  global.addEventListener('popstate', function (event) {
    show(event.state || 'home', 'none');
  });

  function currentView() {
    var active = document.querySelector('.view.is-active');
    return active ? active.id.replace('view-', '') : 'home';
  }

  function hideToast() {
    el.toast.classList.remove('is-visible');
    clearTimeout(toastTimer);
  }

  function toast(message) {
    el.toast.textContent = message;
    el.toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.toast.classList.remove('is-visible');
    }, 3600);
  }

  /* --------------------------------------------------------- language */
  function renderLangSwitch() {
    el.langSwitch.textContent = '';

    I18N.LANGS.forEach(function (entry) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'lang' + (entry.code === I18N.lang ? ' is-active' : '');
      button.textContent = entry.label;
      button.lang = entry.html;
      button.setAttribute('aria-label', entry.name);
      button.setAttribute('aria-pressed', entry.code === I18N.lang ? 'true' : 'false');
      button.addEventListener('click', function () {
        I18N.setLang(entry.code);
      });
      el.langSwitch.appendChild(button);
    });
  }

  /* ------------------------------------------------------------ home */
  function renderScale() {
    el.scale.textContent = '';
    for (var value = 0; value <= 3; value++) {
      var li = document.createElement('li');
      li.textContent = t('scale.' + value);
      el.scale.appendChild(li);
    }
  }

  /* ------------------------------------------------------------ quiz */
  /* Rebuilt from scratch on a language change, then the answers already
   * given are ticked back on. */
  function renderQuestions() {
    el.form.textContent = '';
    var fragment = document.createDocumentFragment();

    for (var index = 0; index < DASS.COUNT; index++) {
      /* A labelled radiogroup rather than fieldset/legend: a legend cuts a
       * gap through its fieldset's border, which erases the divider line
       * drawn between questions. */
      var wrap = document.createElement('div');
      wrap.className = 'q';
      wrap.id = 'q' + index;
      wrap.setAttribute('role', 'radiogroup');
      wrap.setAttribute('aria-labelledby', 'q' + index + '-label');

      var label = document.createElement('p');
      label.className = 'q__text';
      label.id = 'q' + index + '-label';
      label.textContent = index + 1 + '. ' + t('q' + (index + 1));
      wrap.appendChild(label);

      var options = document.createElement('div');
      options.className = 'q__options';

      for (var value = 0; value <= 3; value++) {
        var optLabel = document.createElement('label');
        optLabel.className = 'opt';

        var input = document.createElement('input');
        input.type = 'radio';
        input.name = 'q' + index;
        input.value = String(value);
        input.checked = answers[index] === value;

        var dot = document.createElement('span');
        dot.className = 'opt__dot';

        var caption = document.createElement('span');
        caption.textContent = String(value);

        optLabel.appendChild(input);
        optLabel.appendChild(dot);
        optLabel.appendChild(caption);
        options.appendChild(optLabel);
      }

      wrap.appendChild(options);
      fragment.appendChild(wrap);
    }

    el.form.appendChild(fragment);
  }

  function updateProgress() {
    var done = answers.filter(function (value) {
      return value !== null;
    }).length;
    el.progressFill.style.width = (done / answers.length) * 100 + '%';
    el.progressText.textContent = t('quiz.progress', {
      done: done,
      total: answers.length,
    });
  }

  function resetQuiz() {
    answers = new Array(DASS.COUNT).fill(null);
    renderQuestions();
    updateProgress();
  }

  function submit() {
    var missing = answers.indexOf(null);
    if (missing !== -1) {
      var node = document.getElementById('q' + missing);
      node.classList.add('is-missing');
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast(t('quiz.missing', { n: missing + 1 }));
      return;
    }

    hideToast();
    currentEntry = {
      id: global.Storage.deviceId() + '-' + Date.now().toString(36),
      deviceId: global.Storage.deviceId(),
      takenAt: new Date().toISOString(),
      answers: answers.slice(),
      scores: global.Scoring.score(answers),
    };

    global.Storage.save(Object.assign({}, currentEntry, { synced: false }));
    renderResult(currentEntry);
    show('result', 'replace');
    uploadCurrent();
  }

  /* ---------------------------------------------------------- result */
  function renderResult(entry) {
    var scores = global.Scoring.score(entry.answers);

    el.scoreList.textContent = '';
    scores.forEach(function (score) {
      var li = document.createElement('li');
      li.textContent = t('subscale.' + score.key) + ': ' + score.score +
        ' (' + t('severity.' + score.severityKey) + ')';
      el.scoreList.appendChild(li);
    });

    el.scoreBars.textContent = '';
    scores.forEach(function (score) {
      var bar = document.createElement('div');
      bar.className = 'bar';

      var head = document.createElement('div');
      head.className = 'bar__head';
      var name = document.createElement('span');
      name.textContent = t('subscale.' + score.key);
      var value = document.createElement('span');
      value.textContent = t('severity.' + score.severityKey) + ' - ' +
        score.score + ' / ' + DASS.MAX_SCORE;
      head.appendChild(name);
      head.appendChild(value);

      var track = document.createElement('div');
      track.className = 'bar__track';
      var fill = document.createElement('span');
      fill.className = 'bar__fill';
      fill.style.width = (score.score / DASS.MAX_SCORE) * 100 + '%';
      fill.style.background = score.color;
      track.appendChild(fill);

      bar.appendChild(head);
      bar.appendChild(track);
      el.scoreBars.appendChild(bar);
    });

    global.Printout.render(entry);
    setSyncNote(global.Sync.isConfigured() ? 'result.saving' : null);
  }

  /* Held as a key rather than a sentence, so the note follows a language
   * change like everything else. */
  function setSyncNote(key) {
    lastSyncKey = key;
    el.syncNote.textContent = key ? t(key) : '';
    el.syncNote.hidden = !key;
  }

  function uploadCurrent() {
    if (!currentEntry || !global.Sync.isConfigured()) return;
    var entry = currentEntry;

    global.Sync.push(entry)
      .then(function () {
        global.Storage.markSynced(entry.id);
        if (currentEntry === entry) setSyncNote('result.saved');
      })
      .catch(function () {
        if (currentEntry === entry) setSyncNote('result.savedLocal');
      });
  }

  /* --------------------------------------------------------- history */
  function renderHistory() {
    var items = global.Storage.list();
    el.historyList.textContent = '';

    if (!items.length) {
      var empty = document.createElement('p');
      empty.className = 'empty';
      empty.textContent = t('history.empty');
      el.historyList.appendChild(empty);
      return;
    }

    items.forEach(function (entry) {
      var card = document.createElement('div');
      card.className = 'hist';

      var date = document.createElement('p');
      date.className = 'hist__date';
      date.textContent = new Date(entry.takenAt).toLocaleString();
      card.appendChild(date);

      /* Recomputed from the stored answers rather than read back from the
       * stored labels, so older entries render in the current language. */
      global.Scoring.score(entry.answers).forEach(function (score) {
        var row = document.createElement('div');
        row.className = 'hist__row';
        var label = document.createElement('span');
        label.textContent = t('subscale.' + score.key);
        var value = document.createElement('b');
        value.textContent = score.score +
          ' (' + t('severity.' + score.severityKey) + ')';
        row.appendChild(label);
        row.appendChild(value);
        card.appendChild(row);
      });

      el.historyList.appendChild(card);
    });
  }

  /* ----------------------------------------------------------- wiring */
  function retranslate() {
    I18N.apply();
    renderLangSwitch();
    renderScale();
    renderQuestions();
    updateProgress();
    if (currentEntry) renderResult(currentEntry);
    if (lastSyncKey) setSyncNote(lastSyncKey);
    if (currentView() === 'history') renderHistory();
  }

  function init() {
    I18N.apply();
    renderLangSwitch();
    renderScale();
    renderQuestions();
    updateProgress();

    I18N.onChange(retranslate);

    el.form.addEventListener('change', function (event) {
      var input = event.target;
      if (input.type !== 'radio') return;
      var index = Number(input.name.slice(1));
      answers[index] = Number(input.value);
      document.getElementById('q' + index).classList.remove('is-missing');
      updateProgress();
    });

    document.getElementById('btn-start').addEventListener('click', function () {
      resetQuiz();
      show('quiz', 'push');
    });

    document.getElementById('btn-submit').addEventListener('click', submit);

    document.getElementById('btn-print').addEventListener('click', function () {
      if (currentEntry) global.Printout.print(currentEntry);
    });

    document.getElementById('btn-history').addEventListener('click', function () {
      renderHistory();
      show('history', 'push');
    });

    document.getElementById('btn-clear-history').addEventListener('click', function () {
      if (!global.confirm(t('history.confirm'))) return;
      global.Storage.clear();
      renderHistory();
      toast(t('history.cleared'));
    });

    document.querySelectorAll('[data-back]').forEach(function (button) {
      button.addEventListener('click', function () {
        history.back();
      });
    });

    history.replaceState('home', '', '#home');

    global.Sync.syncPending();
    global.addEventListener('online', function () {
      global.Sync.syncPending();
    });

    if ('serviceWorker' in navigator) {
      global.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function () {
          /* offline support is a bonus; the app still runs without it */
        });
      });
    }
  }

  init();
})(window);
