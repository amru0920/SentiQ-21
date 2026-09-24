/* Screen flow, answer state and wiring. */
(function (global) {
  'use strict';

  var DASS = global.DASS;
  var answers = new Array(DASS.QUESTIONS.length).fill(null);
  var currentEntry = null;
  var toastTimer = null;

  var el = {
    scale: document.getElementById('rating-scale'),
    form: document.getElementById('quiz-form'),
    quizScroll: document.getElementById('quiz-scroll'),
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
    }, 3200);
  }

  /* ------------------------------------------------------------ home */
  function renderScale() {
    DASS.RATING_SCALE.forEach(function (line) {
      var li = document.createElement('li');
      li.textContent = line;
      el.scale.appendChild(li);
    });
  }

  /* ------------------------------------------------------------ quiz */
  function renderQuestions() {
    var fragment = document.createDocumentFragment();

    DASS.QUESTIONS.forEach(function (statement, index) {
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
      label.textContent = index + 1 + '. ' + statement;
      wrap.appendChild(label);

      var options = document.createElement('div');
      options.className = 'q__options';

      for (var value = 0; value <= 3; value++) {
        var label = document.createElement('label');
        label.className = 'opt';

        var input = document.createElement('input');
        input.type = 'radio';
        input.name = 'q' + index;
        input.value = String(value);

        var dot = document.createElement('span');
        dot.className = 'opt__dot';

        var caption = document.createElement('span');
        caption.textContent = String(value);

        label.appendChild(input);
        label.appendChild(dot);
        label.appendChild(caption);
        options.appendChild(label);
      }

      wrap.appendChild(options);
      fragment.appendChild(wrap);
    });

    el.form.appendChild(fragment);

    el.form.addEventListener('change', function (event) {
      var input = event.target;
      if (input.type !== 'radio') return;
      var index = Number(input.name.slice(1));
      answers[index] = Number(input.value);
      document.getElementById('q' + index).classList.remove('is-missing');
      updateProgress();
    });
  }

  function updateProgress() {
    var done = answers.filter(function (value) {
      return value !== null;
    }).length;
    el.progressFill.style.width = (done / answers.length) * 100 + '%';
    el.progressText.textContent = done + ' of ' + answers.length + ' answered';
  }

  function resetQuiz() {
    answers = new Array(DASS.QUESTIONS.length).fill(null);
    el.form.reset();
    document.querySelectorAll('.q.is-missing').forEach(function (node) {
      node.classList.remove('is-missing');
    });
    updateProgress();
  }

  function submit() {
    var missing = answers.indexOf(null);
    if (missing !== -1) {
      var node = document.getElementById('q' + missing);
      node.classList.add('is-missing');
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast('Please answer question ' + (missing + 1) + ' to continue.');
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
    el.scoreList.textContent = '';
    entry.scores.forEach(function (score) {
      var li = document.createElement('li');
      li.textContent = score.label + ': ' + score.score + ' (' + score.severity + ')';
      el.scoreList.appendChild(li);
    });

    el.scoreBars.textContent = '';
    entry.scores.forEach(function (score) {
      var bar = document.createElement('div');
      bar.className = 'bar';

      var head = document.createElement('div');
      head.className = 'bar__head';
      var name = document.createElement('span');
      name.textContent = score.label;
      var value = document.createElement('span');
      value.textContent = score.severity + ' - ' + score.score + ' / ' + DASS.MAX_SCORE;
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
    setSyncNote(global.Sync.isConfigured() ? 'Saving to your account...' : '');
  }

  function setSyncNote(message) {
    el.syncNote.textContent = message;
    el.syncNote.hidden = !message;
  }

  function uploadCurrent() {
    if (!currentEntry || !global.Sync.isConfigured()) return;
    var entry = currentEntry;

    global.Sync.push(entry)
      .then(function () {
        global.Storage.markSynced(entry.id);
        if (currentEntry === entry) setSyncNote('Saved to your account.');
      })
      .catch(function () {
        if (currentEntry === entry) {
          setSyncNote('Saved on this device. It will sync when you are back online.');
        }
      });
  }

  /* --------------------------------------------------------- history */
  function renderHistory() {
    var items = global.Storage.list();
    el.historyList.textContent = '';

    if (!items.length) {
      var empty = document.createElement('p');
      empty.className = 'empty';
      empty.textContent =
        'No results saved yet. Finish a DASS-21 screening and it will appear here.';
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

      entry.scores.forEach(function (score) {
        var row = document.createElement('div');
        row.className = 'hist__row';
        var label = document.createElement('span');
        label.textContent = score.label;
        var value = document.createElement('b');
        value.textContent = score.score + ' (' + score.severity + ')';
        row.appendChild(label);
        row.appendChild(value);
        card.appendChild(row);
      });

      el.historyList.appendChild(card);
    });
  }

  /* ----------------------------------------------------------- wiring */
  function init() {
    renderScale();
    renderQuestions();
    updateProgress();

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
      if (!global.confirm('Delete every result saved on this device?')) return;
      global.Storage.clear();
      renderHistory();
      toast('History cleared.');
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
