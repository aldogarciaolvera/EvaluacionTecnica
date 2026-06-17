let timeoutId = null;
let warnId = null;
let configured = false;
let timeoutMs = 30 * 60 * 1000; // default 30 minutes
let warnBeforeMs = 5 * 60 * 1000; // default warn 5 minutes before
let onTimeoutCallback = null;
let onWarnCallback = null;

const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'click', 'scroll'];

function clearTimer() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
}

function clearWarning() {
  if (warnId) {
    clearTimeout(warnId);
    warnId = null;
  }
}

function startTimer() {
  clearTimer();
  clearWarning();
  timeoutId = setTimeout(() => {
    if (typeof onTimeoutCallback === 'function') onTimeoutCallback();
    clearWarning();
  }, timeoutMs);

  if (typeof onWarnCallback === 'function' && warnBeforeMs < timeoutMs) {
    warnId = setTimeout(() => {
      try { onWarnCallback(); } catch (e) { /* ignore */ }
    }, timeoutMs - warnBeforeMs);
  }
}

function handleActivity() {
  startTimer();
}

export function initIdleTimer({ timeout = 30 * 60 * 1000, onTimeout, warnBefore = 5 * 60 * 1000, onWarn } = {}) {
  if (configured) return;
  configured = true;
  timeoutMs = timeout;
  warnBeforeMs = warnBefore;
  onTimeoutCallback = onTimeout;
  onWarnCallback = onWarn;

  activityEvents.forEach(ev => window.addEventListener(ev, handleActivity, { passive: true }));
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) handleActivity();
  });

  startTimer();
}

export function resetIdleTimer() {
  startTimer();
}

export function stopIdleTimer() {
  if (!configured) return;
  configured = false;
  clearTimer();
  clearWarning();
  activityEvents.forEach(ev => window.removeEventListener(ev, handleActivity));
  document.removeEventListener('visibilitychange', handleActivity);
}

export default {
  initIdleTimer,
  resetIdleTimer,
  stopIdleTimer,
};
