(function () {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js', { scope: '/' }).catch(function (error) {
      console.warn('Nobody AI PWA registration failed:', error);
    });
  });

  let deferredInstallPrompt = null;

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredInstallPrompt = event;
    showInstallButton();
  });

  window.addEventListener('appinstalled', function () {
    deferredInstallPrompt = null;
    const button = document.getElementById('pwaInstallButton');
    if (button) button.remove();
  });

  function showInstallButton() {
    if (!deferredInstallPrompt || document.getElementById('pwaInstallButton')) return;

    const button = document.createElement('button');
    button.id = 'pwaInstallButton';
    button.type = 'button';
    button.textContent = 'Install App';
    button.setAttribute('aria-label', 'Install Nobody AI app');
    button.style.cssText = [
      'position:fixed',
      'right:16px',
      'bottom:16px',
      'z-index:99999',
      'border:1px solid rgba(255,255,255,.16)',
      'border-radius:8px',
      'padding:10px 14px',
      'background:#ff3b30',
      'color:#fff',
      'font:600 13px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
      'box-shadow:0 12px 28px rgba(0,0,0,.32)',
      'cursor:pointer'
    ].join(';');

    button.addEventListener('click', async function () {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice.catch(function () {});
      deferredInstallPrompt = null;
      button.remove();
    });

    document.body.appendChild(button);
  }
})();
