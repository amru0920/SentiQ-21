/* "Add to home screen" helper.
 *
 * Chrome on Android hands us a real install prompt through
 * beforeinstallprompt, so there we can offer one button. Safari on iOS has
 * no such API at all - the only option is to talk the person through Share ->
 * Add to Home Screen, which is what the step list is for. */
(function (global) {
  'use strict';

  var t = global.I18N.t;

  var ua = navigator.userAgent || '';

  /* iPadOS 13+ reports itself as a Mac, so the touch count is the giveaway. */
  var isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  /* Links opened from a chat app land in its embedded browser, where nothing
   * can be installed. Worth saying out loud rather than letting people follow
   * steps that cannot work. */
  var inAppBrowser = /FBAN|FBAV|Instagram|Line\/|MicroMessenger|WhatsApp|Snapchat|TikTok|Twitter/i
    .test(ua);

  function isInstalled() {
    try {
      return global.matchMedia('(display-mode: standalone)').matches ||
        navigator.standalone === true;
    } catch (error) {
      return false;
    }
  }

  var el = {
    open: document.getElementById('btn-install'),
    sheet: document.getElementById('install-sheet'),
    tabs: document.getElementById('install-tabs'),
    steps: document.getElementById('install-steps'),
    warn: document.getElementById('install-warn'),
    now: document.getElementById('btn-install-now'),
  };

  var deferredPrompt = null;

  /* ------------------------------------------------------ rendering */
  /* Each step is an array of alternating plain and highlighted fragments,
   * built as text nodes so nothing is ever parsed as markup. */
  function renderSteps(platform) {
    el.steps.textContent = '';

    global.I18N.steps(platform).forEach(function (parts) {
      var li = document.createElement('li');
      parts.forEach(function (part, index) {
        if (index % 2 === 0) {
          li.appendChild(document.createTextNode(part));
        } else {
          var strong = document.createElement('b');
          strong.textContent = part;
          li.appendChild(strong);
        }
      });
      el.steps.appendChild(li);
    });

    Array.prototype.forEach.call(el.tabs.children, function (tab) {
      var selected = tab.dataset.platform === platform;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
  }

  function refreshWarning(platform) {
    /* If the browser handed us a real prompt, installing plainly works -
     * whatever the user agent string suggests. */
    if (deferredPrompt) {
      el.warn.hidden = true;
      return;
    }
    if (inAppBrowser) {
      el.warn.textContent = t('install.warnInApp');
      el.warn.hidden = false;
      return;
    }
    if (platform === 'ios' && !/Safari/.test(ua)) {
      el.warn.textContent = t('install.warnIos');
      el.warn.hidden = false;
      return;
    }
    el.warn.hidden = true;
  }

  function selectPlatform(platform) {
    renderSteps(platform);
    refreshWarning(platform);
    /* The native prompt is Android-only, so hide it on the iOS tab. */
    el.now.hidden = !(deferredPrompt && platform === 'android');
  }

  /* ---------------------------------------------------------- sheet */
  function openSheet() {
    selectPlatform(isIOS ? 'ios' : 'android');
    el.sheet.hidden = false;
    /* Duplicate the current history entry so the back gesture closes the
     * sheet instead of leaving the screen behind it. */
    history.pushState(history.state, '', location.hash);
    requestAnimationFrame(function () {
      el.sheet.classList.add('is-open');
    });
  }

  function closeSheet(fromPopstate) {
    if (el.sheet.hidden) return;
    el.sheet.classList.remove('is-open');
    el.sheet.hidden = true;
    if (!fromPopstate) history.back();
  }

  /* ---------------------------------------------------------- wiring */
  global.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredPrompt = event;
    if (!el.sheet.hidden) selectPlatform('android');
  });

  global.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    closeSheet();
    el.open.hidden = true;
  });

  el.now.addEventListener('click', function () {
    if (!deferredPrompt) return;
    var prompt = deferredPrompt;
    deferredPrompt = null;
    el.now.hidden = true;
    prompt.prompt();
  });

  el.tabs.addEventListener('click', function (event) {
    var tab = event.target.closest('[data-platform]');
    if (tab) selectPlatform(tab.dataset.platform);
  });

  el.open.addEventListener('click', openSheet);

  document.querySelectorAll('[data-close-install]').forEach(function (node) {
    node.addEventListener('click', function () {
      closeSheet();
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeSheet();
  });

  global.addEventListener('popstate', function () {
    closeSheet(true);
  });

  global.I18N.onChange(function () {
    if (!el.sheet.hidden) {
      selectPlatform(document.querySelector('.tab.is-active').dataset.platform);
    }
  });

  /* Nothing to offer once it is already installed. */
  if (!isInstalled()) el.open.hidden = false;
})(window);
