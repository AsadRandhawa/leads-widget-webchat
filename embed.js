(function () {
  'use strict';

  if (document.getElementById('leads-chatbot-widget-container')) return;

  var currentScript = document.currentScript;
  var baseUrl = (currentScript && currentScript.src)
    ? new URL(currentScript.src).origin
    : 'https://leads-widget-webchat-production.up.railway.app';

  // Create floating container
  var container = document.createElement('div');
  container.id = 'leads-chatbot-widget-container';
  container.style.cssText = [
    'position: fixed',
    'bottom: 0',
    'right: 0',
    'width: 290px',
    'height: 120px',
    'z-index: 2147483647',
    'background: transparent',
    'overflow: visible',
    'transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    'pointer-events: none'
  ].join(';') + ';';

  // Create iframe pointing to the chatbot
  var iframe = document.createElement('iframe');
  iframe.id = 'leads-chatbot-widget-iframe';
  iframe.src = baseUrl + '/?embedded=1';
  iframe.title = 'Leads University Admissions Chatbot';
  iframe.setAttribute('allowtransparency', 'true');
  iframe.setAttribute('allow', 'clipboard-write');
  iframe.style.cssText = [
    'width: 100%',
    'height: 100%',
    'border: none',
    'background: transparent',
    'pointer-events: auto',
    'color-scheme: light'
  ].join(';') + ';';

  container.appendChild(iframe);
  document.body.appendChild(container);

  var isOpen = false;

  function updateSize(open) {
    isOpen = open;
    var isMobile = window.innerWidth <= 600;

    if (isOpen) {
      if (isMobile) {
        container.style.width = '100vw';
        container.style.height = '100dvh';
        container.style.bottom = '0';
        container.style.right = '0';
      } else {
        container.style.width = '420px';
        container.style.height = '670px';
        container.style.bottom = '0';
        container.style.right = '0';
      }
    } else {
      if (isMobile) {
        container.style.width = '96px';
        container.style.height = '96px';
      } else {
        container.style.width = '290px';
        container.style.height = '120px';
      }
    }
  }

  // Handle messages from the iframe
  window.addEventListener('message', function (e) {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'leads-widget:open') {
      updateSize(true);
    } else if (e.data.type === 'leads-widget:close') {
      updateSize(false);
    }
  });

  window.addEventListener('resize', function () {
    updateSize(isOpen);
  });
})();
