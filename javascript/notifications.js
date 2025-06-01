(function () {
  function showNotification(message, options = {}) {
    // Unique key for this notification (can be improved for more complex cases)
    const notifKey = options.persistClose ? `notif_closed_${btoa(message)}` : null;

    // If persistClose is enabled and user closed this before, don't show again
    if (notifKey && localStorage.getItem(notifKey) === '1') return;

    const container = document.getElementById('notifications-container') ||
      (() => {
        const c = document.createElement('div');
        c.id = 'notifications-container';
        document.body.appendChild(c);
        return c;
      })();

// Play sound if enabled
if (options.sound !== false) {
  const audio = new Audio(options.soundUrl || "/uploads/branding/notifsound.mp3");
  audio.volume = 0.25;
  audio.play().catch(() => {});
}

// Vibrate if enabled and supported
if (options.vibrate && navigator.vibrate) {
  navigator.vibrate(100);
}

    // Prevent duplicate notifications with the same message within 1s
    if ([...container.children].some(n => n.dataset.message === message)) return;

    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.dataset.message = message;

    notif.innerHTML =
      `<div class="notification-title">${message}</div>` +
      (options.body ? `<div class="notification-body">${options.body}</div>` : '') +
      `<a href="#" class="notification-close" aria-label="Close notification" tabindex="0" role="button">&times;</a>` +
      (options.duration && options.duration > 0 && !options.sticky
        ? `<div class="notification-timer"></div>` : '');

    container.appendChild(notif);

    // Handle close button
    const closeBtn = notif.querySelector('.notification-close');
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeNotification(notif);
    });
    closeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeNotification(notif);
      }
    });

    // Timer bar
    let timerInterval, timerBar, remaining = options.duration || 4000, start, paused = false;

    if (options.duration && options.duration > 0 && !options.sticky) {
      timerBar = notif.querySelector('.notification-timer');
      timerBar.style.width = '100%';
      timerBar.style.height = '3px';
      timerBar.style.background = 'rgba(255,255,255,0.5)';
      timerBar.style.borderRadius = '2px';
      timerBar.style.marginTop = '8px';
      timerBar.style.transition = `width ${remaining}ms linear`;

      setTimeout(() => {
        timerBar.style.width = '0%';
      }, 10);

      start = Date.now();
      timerInterval = setTimeout(() => closeNotification(notif), remaining);

      notif.addEventListener('mouseenter', () => {
        if (paused) return;
        paused = true;
        clearTimeout(timerInterval);
        // Pause timer bar
        const elapsed = Date.now() - start;
        remaining -= elapsed;
        timerBar.style.transition = '';
        timerBar.style.width = `${(remaining / (options.duration || 4000)) * 100}%`;
      });

      notif.addEventListener('mouseleave', () => {
        if (!paused) return;
        paused = false;
        start = Date.now();
        timerBar.style.transition = `width ${remaining}ms linear`;
        setTimeout(() => {
          timerBar.style.width = '0%';
        }, 10);
        timerInterval = setTimeout(() => closeNotification(notif), remaining);
      });
    }

    // Sticky: don't auto-dismiss
    if (!options.duration || options.sticky) {
      notif.classList.add('sticky');
    }

    function closeNotification(n) {
      n.classList.add('hide');
      clearTimeout(timerInterval);
      // If persistClose is enabled, remember this notification was closed
      if (notifKey) {
        localStorage.setItem(notifKey, '1');
      }
      n.addEventListener('animationend', () => n.remove(), { once: true });
    }
  }

  // Expose globally
  window.showNotification = showNotification;

  // Example usage:
  document.addEventListener('DOMContentLoaded', () => {
    showNotification("Welcome to the new update!", {
      body: "Check out the new features we've added.",
      duration: 5000,
      persistClose: true,
    });

  });
})();