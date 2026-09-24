/* On-device history. This is the source of truth: Supabase, when configured,
 * is a copy. Anything that fails to upload is retried from here later. */
(function (global) {
  'use strict';

  var HISTORY_KEY = 'sentiq21.history';
  var DEVICE_KEY = 'sentiq21.device';
  var LIMIT = 100;

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  /* A random, non-identifying id so a device can find its own rows again. */
  function deviceId() {
    var id = null;
    try {
      id = localStorage.getItem(DEVICE_KEY);
    } catch (error) {
      /* private mode - fall through to a session-only id */
    }
    if (!id) {
      id = (global.crypto && global.crypto.randomUUID)
        ? global.crypto.randomUUID()
        : 'dev-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
      write(DEVICE_KEY, id);
    }
    return id;
  }

  function list() {
    var items = read(HISTORY_KEY, []);
    return Array.isArray(items) ? items : [];
  }

  function save(entry) {
    var items = list();
    items.unshift(entry);
    write(HISTORY_KEY, items.slice(0, LIMIT));
    return entry;
  }

  function markSynced(id) {
    var items = list().map(function (item) {
      return item.id === id ? Object.assign({}, item, { synced: true }) : item;
    });
    write(HISTORY_KEY, items);
  }

  function pending() {
    return list().filter(function (item) {
      return !item.synced;
    });
  }

  function clear() {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      /* nothing to clear */
    }
  }

  global.Storage = {
    deviceId: deviceId,
    list: list,
    save: save,
    markSynced: markSynced,
    pending: pending,
    clear: clear,
  };
})(window);
