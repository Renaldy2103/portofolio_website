// Lets page intros wait until the BootLoader overlay has finished.

const BOOT_EVENT = 'app:boot-complete';
let bootDone = false;

export function markBootComplete() {
  if (bootDone) return;
  bootDone = true;
  window.dispatchEvent(new Event(BOOT_EVENT));
}

export function isBootComplete() {
  return bootDone;
}

/** Runs `callback` once boot is complete. Returns an unsubscribe function. */
export function onBootComplete(callback) {
  if (bootDone) {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(BOOT_EVENT, handler, { once: true });
  return () => window.removeEventListener(BOOT_EVENT, handler);
}
