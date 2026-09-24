/* DASS-21 scoring: sum the seven items of a subscale, double it, then read
 * the severity band off that subscale's cutoffs.
 *
 * The result carries keys rather than words, so the same scores can be
 * rendered in any language - and a saved result reads correctly even if the
 * person switches language afterwards. */
(function (global) {
  'use strict';

  var DASS = global.DASS;

  function severityIndex(subscale, score) {
    for (var i = 0; i < subscale.cutoffs.length; i++) {
      if (score <= subscale.cutoffs[i]) return i;
    }
    return DASS.SEVERITY_KEYS.length - 1;
  }

  /* answers: array of 21 integers 0-3, index 0 holding question 1. */
  function score(answers) {
    return DASS.SUBSCALES.map(function (subscale) {
      var total = subscale.items.reduce(function (sum, item) {
        return sum + answers[item - 1];
      }, 0) * 2;

      var index = severityIndex(subscale, total);
      return {
        key: subscale.key,
        color: subscale.color,
        score: total,
        severityIndex: index,
        severityKey: DASS.SEVERITY_KEYS[index],
      };
    });
  }

  global.Scoring = {
    score: score,
    severityIndex: severityIndex,
  };
})(window);
