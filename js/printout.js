/* Fills the hidden .printout block, which the print stylesheet reveals.
 * The layout mirrors the PDF the original app produced, in whichever
 * language the app is currently showing. */
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
