/* Optional Supabase sync over the PostgREST endpoint - no SDK, no bundler.
 *
 * Every request carries the device id both as a filter and as an x-device-id
 * header, which is what the row-level security policy in
 * supabase/schema.sql checks against. */
(function (global) {
  'use strict';

  var config = global.SENTIQ_CONFIG || {};
  var url = (config.SUPABASE_URL || '').replace(/\/+$/, '');
  var key = config.SUPABASE_ANON_KEY || '';
  var table = config.SUPABASE_TABLE || 'dass_results';

  function isConfigured() {
    return Boolean(url && key);
  }

  function endpoint(query) {
    return url + '/rest/v1/' + table + (query || '');
  }

  function headers(extra) {
    return Object.assign(
      {
        apikey: key,
        Authorization: 'Bearer ' + key,
        'Content-Type': 'application/json',
        'x-device-id': global.Storage.deviceId(),
      },
      extra || {}
    );
  }

  /* Severity is stored in English whatever language the app is showing, so
   * rows stay comparable across devices. */
  function level(score) {
    return global.I18N.tIn('en', 'severity.' + score.severityKey);
  }

  function rowFor(entry) {
    var byKey = {};
    global.Scoring.score(entry.answers).forEach(function (score) {
      byKey[score.key] = score;
    });

    return {
      id: entry.id,
      device_id: entry.deviceId,
      taken_at: entry.takenAt,
      answers: entry.answers,
      depression: byKey.depression.score,
      depression_level: level(byKey.depression),
      anxiety: byKey.anxiety.score,
      anxiety_level: level(byKey.anxiety),
      stress: byKey.stress.score,
      stress_level: level(byKey.stress),
    };
  }

  /* Upsert, so a retry of an entry that actually landed is harmless. */
  function push(entry) {
    if (!isConfigured()) return Promise.reject(new Error('Supabase is not configured'));

    return fetch(endpoint('?on_conflict=id'), {
      method: 'POST',
      headers: headers({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
      body: JSON.stringify([rowFor(entry)]),
    }).then(function (response) {
      if (!response.ok) {
        return response.text().then(function (body) {
          throw new Error('Supabase ' + response.status + ': ' + body);
        });
      }
      return true;
    });
  }

  /* Walks the local queue once. Resolves with the number of rows uploaded;
   * a failure (offline, misconfigured) leaves the queue untouched. */
  function syncPending() {
    if (!isConfigured()) return Promise.resolve(0);

    var queue = global.Storage.pending();
    if (!queue.length) return Promise.resolve(0);

    var uploaded = 0;
    return queue
      .reduce(function (chain, entry) {
        return chain.then(function () {
          return push(entry).then(function () {
            global.Storage.markSynced(entry.id);
            uploaded += 1;
          });
        });
      }, Promise.resolve())
      .then(function () {
        return uploaded;
      })
      .catch(function () {
        return uploaded;
      });
  }

  global.Sync = {
    isConfigured: isConfigured,
    push: push,
    syncPending: syncPending,
  };
})(window);
