/* Node harness for the browser modules: give them a `window`, load them,
 * then assert against the published DASS-21 cutoffs and check that all four
 * translations stay in step with each other. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const sandbox = { window: {}, console };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

for (const file of ['js/i18n.js', 'js/data.js', 'js/scoring.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

const { DASS, Scoring, I18N } = sandbox.window;
const CODES = I18N.LANGS.map((entry) => entry.code);

const byKey = (answers) =>
  Object.fromEntries(Scoring.score(answers).map((s) => [s.key, s]));
const level = (key, raw) => {
  const subscale = DASS.SUBSCALES.find((s) => s.key === key);
  return DASS.SEVERITY_KEYS[Scoring.severityIndex(subscale, raw)];
};

let passed = 0;
const it = (name, fn) => {
  fn();
  passed += 1;
  console.log('  ok  ' + name);
};

/* ------------------------------------------------------------ structure */

it('has 21 items and 7 per subscale', () => {
  assert.equal(DASS.COUNT, 21);
  for (const s of DASS.SUBSCALES) assert.equal(s.items.length, 7);
});

it('uses each question exactly once across the three subscales', () => {
  // Joined, because arrays built inside the VM realm are never
  // reference-equal to arrays built out here.
  const all = DASS.SUBSCALES.flatMap((s) => s.items).sort((a, b) => a - b);
  assert.equal(all.join(','), Array.from({ length: 21 }, (_, i) => i + 1).join(','));
});

/* -------------------------------------------------------------- scoring */

it('scores all-zero answers as 0 / normal', () => {
  const scores = byKey(new Array(21).fill(0));
  for (const key of ['depression', 'anxiety', 'stress']) {
    assert.equal(scores[key].score, 0);
    assert.equal(scores[key].severityKey, 'normal');
  }
});

it('scores all-three answers as 42 / extreme', () => {
  const scores = byKey(new Array(21).fill(3));
  for (const key of ['depression', 'anxiety', 'stress']) {
    assert.equal(scores[key].score, DASS.MAX_SCORE);
    assert.equal(scores[key].severityKey, 'extreme');
  }
});

it('keeps subscales independent and doubles the item sum', () => {
  const answers = new Array(21).fill(0);
  for (const item of DASS.SUBSCALES[0].items) answers[item - 1] = 2;
  const scores = byKey(answers);
  assert.equal(scores.depression.score, 28);
  assert.equal(scores.depression.severityKey, 'extreme');
  assert.equal(scores.anxiety.score, 0);
  assert.equal(scores.stress.score, 0);
});

it('places the severity bands on the documented cutoffs', () => {
  assert.equal(level('depression', 9), 'normal');
  assert.equal(level('depression', 10), 'mild');
  assert.equal(level('depression', 13), 'mild');
  assert.equal(level('depression', 14), 'moderate');
  assert.equal(level('depression', 28), 'extreme');

  assert.equal(level('anxiety', 7), 'normal');
  assert.equal(level('anxiety', 8), 'mild');
  assert.equal(level('anxiety', 15), 'severe');
  assert.equal(level('anxiety', 20), 'extreme');

  assert.equal(level('stress', 14), 'normal');
  assert.equal(level('stress', 19), 'moderate');
  assert.equal(level('stress', 26), 'severe');
  assert.equal(level('stress', 34), 'extreme');
});

it('reproduces the worked example from the project report', () => {
  // Report appendix: Depression 30, Anxiety 34, Stress 36 - all extreme.
  const answers = new Array(21).fill(0);
  const set = (key, values) => {
    const s = DASS.SUBSCALES.find((x) => x.key === key);
    s.items.forEach((item, i) => { answers[item - 1] = values[i]; });
  };
  set('depression', [3, 2, 2, 2, 2, 2, 2]); // sum 15 -> 30
  set('anxiety', [3, 3, 3, 2, 3, 2, 1]);    // sum 17 -> 34
  set('stress', [3, 3, 3, 3, 3, 2, 1]);     // sum 18 -> 36

  const scores = byKey(answers);
  assert.equal(scores.depression.score, 30);
  assert.equal(scores.anxiety.score, 34);
  assert.equal(scores.stress.score, 36);
  for (const key of ['depression', 'anxiety', 'stress']) {
    assert.equal(scores[key].severityKey, 'extreme');
  }
  assert.equal(I18N.tIn('en', 'severity.extreme'), 'Extremely Severe');
});

/* ---------------------------------------------------------- translation */

it('offers the four languages the project asked for', () => {
  assert.equal(CODES.join(','), 'ms,en,ta,zh');
});

it('translates every key in every language, with nothing left over', () => {
  const base = Object.keys(I18N.DICT.en).sort();
  for (const code of CODES) {
    const keys = Object.keys(I18N.DICT[code]).sort();
    const missing = base.filter((k) => !keys.includes(k));
    const extra = keys.filter((k) => !base.includes(k));
    assert.equal(missing.join(','), '', `${code} is missing: ${missing}`);
    assert.equal(extra.join(','), '', `${code} has unknown keys: ${extra}`);
  }
});

it('never leaves a translation blank or identical to its key', () => {
  for (const code of CODES) {
    for (const [key, value] of Object.entries(I18N.DICT[code])) {
      assert.equal(typeof value, 'string', `${code}/${key} is not a string`);
      assert.ok(value.trim().length > 0, `${code}/${key} is blank`);
      assert.notEqual(value, key, `${code}/${key} was never translated`);
    }
  }
});

it('carries the same placeholders through every language', () => {
  const holders = (text) => (text.match(/\{\w+\}/g) || []).sort().join(',');
  for (const key of Object.keys(I18N.DICT.en)) {
    const expected = holders(I18N.DICT.en[key]);
    for (const code of CODES) {
      assert.equal(holders(I18N.DICT[code][key]), expected,
        `${code}/${key} placeholders do not match English`);
    }
  }
});

it('has all 21 statements, distinct, in every language', () => {
  for (const code of CODES) {
    const items = Array.from({ length: 21 }, (_, i) => I18N.tIn(code, 'q' + (i + 1)));
    assert.equal(new Set(items).size, 21, `${code} repeats a statement`);
  }
});

it('translates the statements away from English in the other languages', () => {
  for (const code of ['ms', 'ta', 'zh']) {
    for (let i = 1; i <= 21; i++) {
      assert.notEqual(I18N.tIn(code, 'q' + i), I18N.tIn('en', 'q' + i),
        `${code}/q${i} is still the English text`);
    }
  }
});

it('gives four install steps per platform in every language', () => {
  for (const code of CODES) {
    for (const platform of ['android', 'ios']) {
      const steps = I18N.STEPS[code][platform];
      assert.equal(steps.length, 4, `${code}/${platform} step count`);
      for (const parts of steps) {
        assert.ok(parts.length >= 2, `${code}/${platform} step has no highlight`);
        parts.forEach((part, index) => {
          assert.equal(typeof part, 'string');
          // Odd positions are the highlighted button labels.
          if (index % 2 === 1) assert.ok(part.trim().length > 0);
        });
      }
    }
  }
});

it('fills placeholders when asked', () => {
  assert.equal(I18N.tIn('en', 'quiz.progress', { done: 3, total: 21 }),
    '3 of 21 answered');
  assert.equal(I18N.tIn('ms', 'quiz.missing', { n: 7 }),
    'Sila jawab soalan 7 untuk teruskan.');
});

it('falls back to English for an unknown key or language', () => {
  assert.equal(I18N.tIn('en', 'no.such.key'), 'no.such.key');
  assert.equal(I18N.tIn('xx', 'result.title'), 'Result');
});

console.log('\n' + passed + ' passed');
