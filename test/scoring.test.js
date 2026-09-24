/* Node harness for the browser scoring modules: give them a `window`, load
 * them, then assert against the published DASS-21 cutoffs. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const sandbox = { window: {}, console };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

for (const file of ['js/data.js', 'js/scoring.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

const { DASS, Scoring } = sandbox.window;
const byKey = (answers) =>
  Object.fromEntries(Scoring.score(answers).map((s) => [s.key, s]));

let passed = 0;
const it = (name, fn) => {
  fn();
  passed += 1;
  console.log('  ok  ' + name);
};

it('has 21 statements and 7 items per subscale', () => {
  assert.equal(DASS.QUESTIONS.length, 21);
  for (const s of DASS.SUBSCALES) assert.equal(s.items.length, 7);
});

it('uses each question exactly once across the three subscales', () => {
  // Joined, because arrays built inside the VM realm are never
  // reference-equal to arrays built out here.
  const all = DASS.SUBSCALES.flatMap((s) => s.items).sort((a, b) => a - b);
  assert.equal(all.join(','), Array.from({ length: 21 }, (_, i) => i + 1).join(','));
});

it('scores all-zero answers as 0 / Normal', () => {
  const scores = byKey(new Array(21).fill(0));
  for (const key of ['depression', 'anxiety', 'stress']) {
    assert.equal(scores[key].score, 0);
    assert.equal(scores[key].severity, 'Normal');
  }
});

it('scores all-three answers as 42 / Extremely Severe', () => {
  const scores = byKey(new Array(21).fill(3));
  for (const key of ['depression', 'anxiety', 'stress']) {
    assert.equal(scores[key].score, DASS.MAX_SCORE);
    assert.equal(scores[key].severity, 'Extremely Severe');
  }
});

it('keeps subscales independent and doubles the item sum', () => {
  const answers = new Array(21).fill(0);
  for (const item of DASS.SUBSCALES[0].items) answers[item - 1] = 2;
  const scores = byKey(answers);
  assert.equal(scores.depression.score, 28);
  assert.equal(scores.depression.severity, 'Extremely Severe');
  assert.equal(scores.anxiety.score, 0);
  assert.equal(scores.stress.score, 0);
});

it('places the severity bands on the documented cutoffs', () => {
  const band = (key, value) =>
    Scoring.severityFor(DASS.SUBSCALES.find((s) => s.key === key), value);

  assert.equal(band('depression', 9), 'Normal');
  assert.equal(band('depression', 10), 'Mild');
  assert.equal(band('depression', 13), 'Mild');
  assert.equal(band('depression', 14), 'Moderate');
  assert.equal(band('depression', 28), 'Extremely Severe');

  assert.equal(band('anxiety', 7), 'Normal');
  assert.equal(band('anxiety', 8), 'Mild');
  assert.equal(band('anxiety', 15), 'Severe');
  assert.equal(band('anxiety', 20), 'Extremely Severe');

  assert.equal(band('stress', 14), 'Normal');
  assert.equal(band('stress', 19), 'Moderate');
  assert.equal(band('stress', 26), 'Severe');
  assert.equal(band('stress', 34), 'Extremely Severe');
});

it('reproduces the worked example from the project report', () => {
  // Report appendix: Depression 30, Anxiety 34, Stress 36 - all Extremely Severe.
  const answers = new Array(21).fill(0);
  const set = (key, values) => {
    const s = DASS.SUBSCALES.find((x) => x.key === key);
    s.items.forEach((item, i) => { answers[item - 1] = values[i]; });
  };
  set('depression', [3, 2, 2, 2, 2, 2, 2]); // sum 15 -> 30
  set('anxiety',    [3, 3, 3, 2, 3, 2, 1]); // sum 17 -> 34
  set('stress',     [3, 3, 3, 3, 3, 2, 1]); // sum 18 -> 36

  const scores = byKey(answers);
  assert.equal(scores.depression.score, 30);
  assert.equal(scores.anxiety.score, 34);
  assert.equal(scores.stress.score, 36);
  for (const key of ['depression', 'anxiety', 'stress']) {
    assert.equal(scores[key].severity, 'Extremely Severe');
  }
});

console.log('\n' + passed + ' passed');
