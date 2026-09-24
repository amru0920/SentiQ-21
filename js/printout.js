/* Fills the hidden .printout block, which the print stylesheet reveals.
 * The layout mirrors the PDF the original app produced, in whichever
 * language the app is currently showing, and now carries the advice as well
 * so the printed sheet is something a person can take to a counsellor. */
(function (global) {
  'use strict';

  var t = global.I18N.t;

  function text(tag, value, className) {
    var node = document.createElement(tag);
    node.textContent = value;
    if (className) node.className = className;
    return node;
  }

  function render(entry) {
    var root = document.getElementById('printout');
    root.textContent = '';
    root.lang = document.documentElement.lang;

    root.appendChild(text('h1', t('print.title')));

    var scores = document.createElement('div');
    scores.className = 'scores';
    global.Scoring.score(entry.answers).forEach(function (score) {
      scores.appendChild(text('p',
        t('subscale.' + score.key) + ': ' + score.score +
        ' (' + t('severity.' + score.severityKey) + ')'));
    });
    root.appendChild(scores);

    var plan = global.Advice.build(entry);

    root.appendChild(text('p', plan.action, 'action'));

    if (plan.needsHelp) {
      root.appendChild(text('h2', t('help.title')));
      root.appendChild(text('p', t('help.body')));
      var lines = document.createElement('div');
      lines.className = 'scores';
      global.Advice.HELPLINES.forEach(function (line) {
        lines.appendChild(text('p', line.name + ': ' + line.number +
          (line.always ? ' (' + t('help.hours24') + ')' : '')));
      });
      root.appendChild(lines);
      root.appendChild(text('p', t('help.emergency')));
    }

    root.appendChild(text('h2', t('advice.title')));
    plan.cards.forEach(function (card) {
      root.appendChild(text('h3',
        t('subscale.' + card.key) + ' - ' + t('severity.' + card.severityKey)));
      root.appendChild(text('p', card.summary));

      var list = document.createElement('ul');
      card.steps.forEach(function (step) {
        list.appendChild(text('li', step));
      });
      root.appendChild(list);
    });

    root.appendChild(text('h2', t('print.about')));

    var about = document.createElement('div');
    about.className = 'about';
    about.appendChild(text('p', t('result.disclaimer')));
    about.appendChild(text('p', t('print.p2')));
    root.appendChild(about);
  }

  /* The browser's print dialog is also its "Save as PDF" dialog, on both
   * Android and desktop - the same flow the Flutter build used. */
  function print(entry) {
    render(entry);
    global.print();
  }

  global.Printout = { render: render, print: print };
})(window);
