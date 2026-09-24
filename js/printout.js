/* Fills the hidden .printout block, which the print stylesheet reveals.
 * The layout mirrors the PDF the original app produced. */
(function (global) {
  'use strict';

  function text(tag, value, className) {
    var node = document.createElement(tag);
    node.textContent = value;
    if (className) node.className = className;
    return node;
  }

  function render(entry) {
    var root = document.getElementById('printout');
    root.textContent = '';

    root.appendChild(text('h1', 'DASS-21 Results'));

    var scores = document.createElement('div');
    scores.className = 'scores';
    entry.scores.forEach(function (score) {
      scores.appendChild(
        text('p', score.label + ': ' + score.score + ' (' + score.severity + ')')
      );
    });
    root.appendChild(scores);

    root.appendChild(text('h2', 'About DASS-21'));

    var about = document.createElement('div');
    about.className = 'about';
    about.appendChild(text('p',
      'The DASS-21 should not be used to replace a face-to-face clinical ' +
      'interview. If you are experiencing significant emotional difficulties, ' +
      'please consult your doctor or a qualified mental health professional.'
    ));
    about.appendChild(text('p',
      'The DASS-21 is a set of three self-report scales designed to measure ' +
      'the emotional states of depression, anxiety and stress. It does not ' +
      'diagnose disorders but measures their severity based on symptoms.'
    ));
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
