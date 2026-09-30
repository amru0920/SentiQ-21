/* Node harness for the browser modules: give them a `window`, load them,
 * then assert against the published DASS-21 cutoffs and check that all four
 * translations stay in step with each other. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const sandbox = {
  window: {},
  console,
  fetch: () => Promise.resolve(),
  crypto: { randomUUID: () => 'test-device-uuid' },
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

for (const file of ['config.js', 'js/i18n.js', 'js/data.js', 'js/scoring.js',
                    'js/storage.js', 'js/advice.js', 'js/supabase.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

const { DASS, Scoring, I18N, Advice, Sync } = sandbox.window;
const NOW = '2026-09-30T08:00:00.000Z';
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

/* --------------------------------------------------------------- advice */

const BANDS = ['normal', 'mild', 'moderate', 'severe', 'extreme'];
const SUBS = ['depression', 'anxiety', 'stress'];

/* Answers that put one subscale at a chosen raw (pre-doubling) sum. */
const answersFor = (key, sum) => {
  const answers = new Array(21).fill(0);
  const items = DASS.SUBSCALES.find((s) => s.key === key).items;
  let left = sum;
  for (const item of items) {
    const v = Math.min(3, left);
    answers[item - 1] = v;
    left -= v;
  }
  assert.equal(left, 0, 'sum ' + sum + ' does not fit in seven items');
  return answers;
};

it('has advice text for all 15 subscale and band combinations', () => {
  for (const code of CODES) {
    for (const sub of SUBS) {
      for (const band of BANDS) {
        const key = 'advice.' + sub + '.' + band;
        assert.ok(I18N.DICT[code][key], code + ' is missing ' + key);
      }
      for (let n = 1; n <= 5; n++) {
        const key = 'advice.' + sub + '.s' + n;
        assert.ok(I18N.DICT[code][key], code + ' is missing ' + key);
      }
    }
    for (const band of BANDS) {
      assert.ok(I18N.DICT[code]['advice.action.' + band],
        code + ' is missing advice.action.' + band);
    }
  }
});

it('builds three cards with five steps each, whatever the answers', () => {
  for (const sum of [0, 5, 7, 10, 14, 21]) {
    for (const sub of SUBS) {
      const plan = Advice.build({ answers: answersFor(sub, sum) });
      assert.equal(plan.cards.length, 3);
      for (const card of plan.cards) {
        assert.equal(card.steps.length, 5);
        assert.ok(card.summary.length > 0);
        // A missing key would fall through and render as the key itself.
        assert.ok(!card.summary.startsWith('advice.'));
        for (const step of card.steps) assert.ok(!step.startsWith('advice.'));
      }
    }
  }
});

it('takes the overall action from the worst subscale, not an average', () => {
  // Depression and anxiety at zero, stress at the top: still the top action.
  const plan = Advice.build({ answers: answersFor('stress', 21) });
  assert.equal(plan.bandKey, 'extreme');
  assert.equal(plan.action, I18N.t('advice.action.extreme'));
});

it('orders the cards with the most severe subscale first', () => {
  // Stress extreme, anxiety moderate (raw 6 -> 12), depression left normal.
  const answers = answersFor('anxiety', 6);
  for (const item of DASS.SUBSCALES.find((s) => s.key === 'stress').items) {
    answers[item - 1] = 3;
  }
  const plan = Advice.build({ answers });
  assert.equal(plan.cards.map((c) => c.key).join(','), 'stress,anxiety,depression');
});

it('breaks an ordering tie in the depression, anxiety, stress order', () => {
  const plan = Advice.build({ answers: new Array(21).fill(0) });
  assert.equal(plan.cards.map((c) => c.key).join(','), 'depression,anxiety,stress');
});

it('shows the helplines from the severe band upwards, not below', () => {
  // Anxiety cutoffs, doubled: normal <=7, mild <=9, moderate <=14, severe <=19.
  const at = (doubled) => Advice.build({ answers: answersFor('anxiety', doubled / 2) });
  assert.equal(at(14).needsHelp, false, 'moderate should not trigger');
  assert.equal(at(16).needsHelp, true, 'severe should trigger');
  assert.equal(at(20).needsHelp, true, 'extremely severe should trigger');
});

it('shows the helplines when question 21 is answered at the top', () => {
  const answers = new Array(21).fill(0);
  answers[20] = 3; // "I felt that life was meaningless"
  const plan = Advice.build({ answers });
  assert.equal(plan.needsHelp, true);
});

it('gives every helpline a name, a display number and a dialable number', () => {
  assert.ok(Advice.HELPLINES.length > 0);
  for (const line of Advice.HELPLINES) {
    assert.ok(line.name && line.name.trim().length > 0);
    assert.ok(line.number && line.number.trim().length > 0);
    assert.match(line.tel, /^[+0-9]+$/, line.name + ' has an undialable number');
  }
});

/* ---------------------------------------------- counselling hand-off */

it('normalises every way a Malaysian number gets written', () => {
  assert.equal(Advice.waNumber('012-345 6789'), '60123456789');
  assert.equal(Advice.waNumber('+60 12 345 6789'), '60123456789');
  assert.equal(Advice.waNumber('60123456789'), '60123456789');
  assert.equal(Advice.waNumber('0193334444'), '60193334444');
  assert.equal(Advice.waNumber(''), '');
  assert.equal(Advice.waNumber(undefined), '');
});

it('offers no chat link while no counsellor number is configured', () => {
  sandbox.window.SENTIQ_CONFIG.COUNSELLOR_WHATSAPP = '';
  assert.equal(Advice.chatLink({ answers: new Array(21).fill(3), takenAt: NOW }, null), null);
});

it('builds a wa.me link carrying the name, number and every score', () => {
  sandbox.window.SENTIQ_CONFIG.COUNSELLOR_WHATSAPP = '012-345 6789';
  const entry = { answers: new Array(21).fill(3), takenAt: NOW };
  const link = Advice.chatLink(entry, { name: 'Ahmad bin Ali', phone: '019-333 4444' });

  assert.ok(link.startsWith('https://wa.me/60123456789?text='), link.slice(0, 40));

  const message = decodeURIComponent(link.split('?text=')[1]);
  assert.ok(message.includes('Ahmad bin Ali'), 'name missing');
  assert.ok(message.includes('019-333 4444'), 'phone missing');
  for (const label of ['depression', 'anxiety', 'stress']) {
    assert.ok(message.includes(I18N.t('subscale.' + label)), label + ' missing');
  }
  assert.ok(message.includes('42'), 'scores missing');
});

it('says so plainly when the student gave no details', () => {
  sandbox.window.SENTIQ_CONFIG.COUNSELLOR_WHATSAPP = '012-345 6789';
  const message = Advice.messageFor({ answers: new Array(21).fill(0), takenAt: NOW }, null);
  assert.ok(message.includes(I18N.t('wa.notGiven')));
});

it('sends a name to Supabase only when consent was given', () => {
  const entry = {
    id: 'x', deviceId: 'd', takenAt: NOW,
    answers: new Array(21).fill(3), needsFollowup: true,
    profile: { name: 'Ahmad bin Ali', phone: '019-333 4444', consent: true },
  };

  const withConsent = Sync.rowFor(entry);
  assert.equal(withConsent.full_name, 'Ahmad bin Ali');
  assert.equal(withConsent.phone, '019-333 4444');
  assert.equal(withConsent.consent, true);
  assert.equal(withConsent.needs_followup, true);

  const withheld = Sync.rowFor(
    Object.assign({}, entry, { profile: { name: 'Ahmad bin Ali', phone: '019-333 4444', consent: false } })
  );
  assert.equal(withheld.full_name, null, 'name leaked without consent');
  assert.equal(withheld.phone, null, 'phone leaked without consent');
  assert.equal(withheld.consent, false);

  const anonymous = Sync.rowFor(Object.assign({}, entry, { profile: undefined }));
  assert.equal(anonymous.full_name, null);
  assert.equal(anonymous.phone, null);
});

it('flags a row for follow-up on exactly the same rule as the popup', () => {
  const high = { answers: new Array(21).fill(3) };
  const low = { answers: new Array(21).fill(0) };
  assert.equal(Advice.build(high).needsHelp, true);
  assert.equal(Advice.build(low).needsHelp, false);
});

console.log('\n' + passed + ' passed');
