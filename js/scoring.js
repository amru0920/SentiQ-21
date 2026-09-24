/* DASS-21 scoring: sum the seven items of a subscale, double it, then read
 * the severity band off that subscale's cutoffs. */
(function (global) {
  'use strict';

  var DASS = global.DASS;

  function severityFor(subscale, score) {
    for (var i = 0; i < subscale.cutoffs.length; i++) {
      if (score <= subscale.cutoffs[i]) return DASS.SEVERITY[i];
    }
    return DASS.SEVERITY[DASS.SEVERITY.length - 1];
  }

  /* answers: array of 21 integers 0-3, index 0 holding question 1. */
  function score(answers) {
    return DASS.SUBSCALES.map(function (subscale) {
      var total = subscale.items.reduce(function (sum, item) {
        return sum + answers[item - 1];
      }, 0) * 2;

      return {
        key: subscale.key,
        label: subscale.label,
        color: subscale.color,
        score: total,
        severity: severityFor(subscale, total),
      };
    });
  }

  global.Scoring = { score: score, severityFor: severityFor };
})(window);
