/* The shape of the DASS-21 instrument. No wording lives here - the
 * statements, subscale names and severity labels are looked up by key in
 * js/i18n.js, so the same structure serves every language. */
(function (global) {
  'use strict';

  var COUNT = 21;

  /* Question numbers are 1-based, as they are printed on the form.
   * `cutoffs` are the upper bound of each severity band, in doubled
   * DASS-21 units. */
  var SUBSCALES = [
    {
      key: 'depression',
      items: [3, 5, 10, 13, 16, 17, 21],
      cutoffs: [9, 13, 20, 27],
      color: '#9b89c6',
    },
    {
      key: 'anxiety',
      items: [2, 4, 7, 9, 15, 19, 20],
      cutoffs: [7, 9, 14, 19],
      color: '#5bbfb4',
    },
    {
      key: 'stress',
      items: [1, 6, 8, 11, 12, 14, 18],
      cutoffs: [14, 18, 25, 33],
      color: '#e8899f',
    },
  ];

  var SEVERITY_KEYS = ['normal', 'mild', 'moderate', 'severe', 'extreme'];

  /* Highest possible subscale score: seven items, scored 0-3, doubled. */
  var MAX_SCORE = 42;

  global.DASS = {
    COUNT: COUNT,
    SUBSCALES: SUBSCALES,
    SEVERITY_KEYS: SEVERITY_KEYS,
    MAX_SCORE: MAX_SCORE,
  };
})(window);
