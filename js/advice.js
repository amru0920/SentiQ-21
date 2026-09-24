/* Turns a set of DASS-21 scores into something the person can act on:
 * one overall next step, a card per subscale, and - when the scores are high -
 * the helplines.
 *
 * None of this is a diagnosis. The wording of every band is written to keep
 * self-help and professional help in the right proportion: self-help leads
 * while scores are low, and gives way to "please see someone" as they climb. */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------
   * HELPLINES - CHECK THESE BEFORE YOU LAUNCH, AND AGAIN EVERY SEMESTER.
   *
   * A wrong number on this screen is worse than no number at all: someone
   * in distress dials it and reaches nobody. Ring each one yourself, and
   * replace this list with your own institution's counselling line if you
   * have one.
   * ------------------------------------------------------------------ */
  var HELPLINES = [
    { name: 'Talian Kasih', number: '15999', tel: '15999', always: true },
    { name: 'Talian HEAL (KKM)', number: '15555', tel: '15555', always: true },
    {
      name: 'Befrienders Kuala Lumpur',
      number: '03-7627 2929',
      tel: '+60376272929',
      always: true,
    },
  ];

  var SUBSCALE_ORDER = ['depression', 'anxiety', 'stress'];
  var t = global.I18N.t;

  /* The overall next step follows the worst subscale, not an average: a
   * single severe score still needs acting on. */
  function worstBand(scores) {
    return scores.reduce(function (worst, score) {
      return Math.max(worst, score.severityIndex);
    }, 0);
  }

  /* Question 21 is "I felt that life was meaningless". Answering it at the
   * top of the scale shows the helplines even when the totals stay low.
   * This is a deliberately cautious rule of thumb, not a clinical one. */
  function flaggedItem(answers) {
    return answers[20] === 3;
  }

  function build(entry) {
    var scores = global.Scoring.score(entry.answers);
    var band = worstBand(scores);

    var cards = scores.slice().sort(function (a, b) {
      /* Most severe first; ties keep the depression, anxiety, stress order. */
      return b.severityIndex - a.severityIndex ||
        SUBSCALE_ORDER.indexOf(a.key) - SUBSCALE_ORDER.indexOf(b.key);
    }).map(function (score) {
      return {
        key: score.key,
        color: score.color,
        severityKey: score.severityKey,
        summary: t('advice.' + score.key + '.' + score.severityKey),
        steps: [1, 2, 3, 4, 5].map(function (n) {
          return t('advice.' + score.key + '.s' + n);
        }),
      };
    });

    return {
      bandKey: global.DASS.SEVERITY_KEYS[band],
      action: t('advice.action.' + global.DASS.SEVERITY_KEYS[band]),
      cards: cards,
      needsHelp: band >= 3 || flaggedItem(entry.answers),
    };
  }

  /* ------------------------------------------------------------ render */
  function node(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function renderCard(card) {
    var box = node('section', 'advice');
    box.style.borderLeftColor = card.color;

    var head = node('div', 'advice__head');
    head.appendChild(node('h3', null, t('subscale.' + card.key)));
    head.appendChild(node('span', 'advice__band', t('severity.' + card.severityKey)));
    box.appendChild(head);

    box.appendChild(node('p', 'advice__summary', card.summary));
    box.appendChild(node('p', 'advice__steps-title', t('advice.steps')));

    var list = node('ul', 'advice__steps');
    card.steps.forEach(function (step) {
      list.appendChild(node('li', null, step));
    });
    box.appendChild(list);

    return box;
  }

  function renderHelp() {
    var box = node('section', 'help');
    box.appendChild(node('h3', null, t('help.title')));
    box.appendChild(node('p', 'help__body', t('help.body')));

    var list = node('ul', 'help__list');
    HELPLINES.forEach(function (line) {
      var item = document.createElement('li');

      var link = document.createElement('a');
      link.className = 'help__number';
      link.href = 'tel:' + line.tel;
      link.textContent = line.number;

      item.appendChild(node('span', 'help__name', line.name));
      item.appendChild(link);
      if (line.always) item.appendChild(node('span', 'help__note', t('help.hours24')));
      list.appendChild(item);
    });
    box.appendChild(list);

    box.appendChild(node('p', 'help__emergency', t('help.emergency')));
    return box;
  }

  function render(entry, root) {
    var plan = build(entry);
    root.textContent = '';

    var action = node('p', 'advice-action', plan.action);
    action.classList.add('advice-action--' + plan.bandKey);
    root.appendChild(action);

    if (plan.needsHelp) root.appendChild(renderHelp());

    root.appendChild(node('h2', 'advice-title', t('advice.title')));
    plan.cards.forEach(function (card) {
      root.appendChild(renderCard(card));
    });

    root.appendChild(node('p', 'advice-retest', t('advice.retest')));
  }

  global.Advice = {
    HELPLINES: HELPLINES,
    build: build,
    render: render,
  };
})(window);
