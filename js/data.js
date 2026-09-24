/* The DASS-21 instrument: statements, subscale membership and severity bands. */
(function (global) {
  'use strict';

  var QUESTIONS = [
    'I found it hard to wind down',
    'I was aware of dryness of my mouth',
    "I couldn't seem to experience any positive feeling at all",
    'I experienced breathing difficulty',
    'I found it difficult to work up the initiative to do things',
    'I tended to over-react to situations',
    'I experienced trembling',
    'I felt that I was using a lot of nervous energy',
    'I was worried about situations in which I might panic',
    'I felt that I had nothing to look forward to',
    'I found myself getting agitated',
    'I found it difficult to relax',
    'I felt down-hearted and blue',
    'I was intolerant of anything that kept me from getting on',
    'I felt I was close to panic',
    'I was unable to become enthusiastic about anything',
    "I felt I wasn't worth much as a person",
    'I felt that I was rather touchy',
    'I was aware of the action of my heart',
    'I felt scared without any good reason',
    'I felt that life was meaningless',
  ];

  var RATING_SCALE = [
    '0 - Did not apply to me at all',
    '1 - Applied to me to some degree, or some of the time',
    '2 - Applied to me to a considerable degree or a good part of time',
    '3 - Applied to me very much or most of the time',
  ];

  /* Question numbers are 1-based, as they are printed on the form.
   * `cutoffs` are the upper bound of each band in doubled DASS-21 units. */
  var SUBSCALES = [
    {
      key: 'depression',
      label: 'Depression',
      items: [3, 5, 10, 13, 16, 17, 21],
      cutoffs: [9, 13, 20, 27],
      color: '#9b89c6',
    },
    {
      key: 'anxiety',
      label: 'Anxiety',
      items: [2, 4, 7, 9, 15, 19, 20],
      cutoffs: [7, 9, 14, 19],
      color: '#5bbfb4',
    },
    {
      key: 'stress',
      label: 'Stress',
      items: [1, 6, 8, 11, 12, 14, 18],
      cutoffs: [14, 18, 25, 33],
      color: '#e8899f',
    },
  ];

  var SEVERITY = ['Normal', 'Mild', 'Moderate', 'Severe', 'Extremely Severe'];

  /* Highest possible subscale score: seven items, scored 0-3, doubled. */
  var MAX_SCORE = 42;

  global.DASS = {
    QUESTIONS: QUESTIONS,
    RATING_SCALE: RATING_SCALE,
    SUBSCALES: SUBSCALES,
    SEVERITY: SEVERITY,
    MAX_SCORE: MAX_SCORE,
  };
})(window);
