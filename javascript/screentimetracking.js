/* screenTimeTracker.js */
(function() {
  /***********************
   * UTILITY FUNCTIONS
   ***********************/
  // Format seconds as HH:MM:SS
  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hrs, mins, secs].map(num => String(num).padStart(2, '0')).join(':');
  }

  // Returns today's date as YYYY-MM-DD
  function getTodayString() {
    return new Date().toISOString().split('T')[0];
  }

  /***********************
   * GLOBAL VARIABLES & DEFAULTS
   ***********************/
  let trackingInterval = null;
  let midnightTimeout = null;
  const DEFAULT_SETTINGS = {
    usageLimitSeconds: 3600,      // 1 hour by default
    limitActive: true,
    limitAction: 'reminder',      // "reminder" or "lockout"
    disabledUntil: null,          // e.g. "2025-02-11" when tracking is disabled
    reminderPage: 'reminder.html',
    lockoutPage: 'lockout.html',
    lastReminderRedirect: 0       // Timestamp to control the 5-minute reminder interval
  };

  /***********************
   * LOCAL STORAGE HANDLERS
   ***********************/
  // Load settings from localStorage or fall back to defaults
  function loadSettings() {
    const settingsJSON = localStorage.getItem('screenTimeSettings');
    let settings;
    if (settingsJSON) {
      try {
        settings = JSON.parse(settingsJSON);
      } catch (e) {
        settings = DEFAULT_SETTINGS;
      }
    } else {
      settings = DEFAULT_SETTINGS;
    }
    return settings;
  }

  // Save settings to localStorage
  function saveSettings(settings) {
    localStorage.setItem('screenTimeSettings', JSON.stringify(settings));
  }

  // Load tracking data for today
  function loadTrackingData() {
    const dataJSON = localStorage.getItem('screenTimeData');
    const todayStr = getTodayString();
    let data;
    if (dataJSON) {
      try {
        data = JSON.parse(dataJSON);
        // If the saved date isn’t today, reset the counter
        if (data.date !== todayStr) {
          data = { date: todayStr, secondsSpent: 0 };
        }
      } catch (e) {
        data = { date: todayStr, secondsSpent: 0 };
      }
    } else {
      data = { date: todayStr, secondsSpent: 0 };
    }
    return data;
  }

  // Save tracking data to localStorage
  function saveTrackingData(data) {
    localStorage.setItem('screenTimeData', JSON.stringify(data));
  }

  /***********************
   * MIDNIGHT RESET
   ***********************/
  // Schedule a reset of the tracking data at midnight
  function scheduleMidnightReset() {
    if (midnightTimeout) clearTimeout(midnightTimeout);
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilMidnight = nextMidnight - now;
    midnightTimeout = setTimeout(() => {
      const newData = { date: getTodayString(), secondsSpent: 0 };
      saveTrackingData(newData);
      updateDisplay();
      scheduleMidnightReset(); // Reschedule for the next day
    }, msUntilMidnight);
  }

  /***********************
   * TRACKING & DISPLAY
   ***********************/
  // Increment secondsSpent every second
  function startTracking() {
    if (trackingInterval) clearInterval(trackingInterval);
    trackingInterval = setInterval(() => {
      const settings = loadSettings();

      // Check if tracking is disabled
      if (settings.disabledUntil) {
        const disabledDate = new Date(settings.disabledUntil);
        const today = new Date(getTodayString());
        if (today <= disabledDate) {
          // Skip tracking while disabled
          return;
        } else {
          // Disable period over; re-enable tracking
          settings.disabledUntil = null;
          saveSettings(settings);
        }
      }

      // Increment time spent and save
      let data = loadTrackingData();
      data.secondsSpent += 1;
      saveTrackingData(data);
      updateDisplay();
      checkLimitReached();
    }, 1000);
  }

  // Update on-page display if elements exist
  function updateDisplay() {
    const data = loadTrackingData();
    const timeSpentElem = document.getElementById('timeSpent');
    const timeRemainingElem = document.getElementById('timeRemaining');

    if (timeSpentElem) {
      timeSpentElem.textContent = formatTime(data.secondsSpent);
    }

    const settings = loadSettings();
    if (settings.limitActive && timeRemainingElem) {
      const remaining = settings.usageLimitSeconds - data.secondsSpent;
      timeRemainingElem.textContent = remaining > 0 ? formatTime(remaining) : "00:00:00";
    } else if (timeRemainingElem) {
      timeRemainingElem.textContent = "No Limit";
    }
  }

  /***********************
   * LIMIT HANDLING
   ***********************/
  // Check if the usage limit is reached and act accordingly
  function checkLimitReached() {
    const data = loadTrackingData();
    const settings = loadSettings();
    if (!settings.limitActive) return;

    if (data.secondsSpent >= settings.usageLimitSeconds) {
      if (settings.limitAction === 'lockout') {
        window.location.href = settings.lockoutPage;
      } else if (settings.limitAction === 'reminder') {
        const now = Date.now();
        if (!settings.lastReminderRedirect || now - settings.lastReminderRedirect >= 5 * 60 * 1000) {
          settings.lastReminderRedirect = now;
          saveSettings(settings);
          window.location.href = settings.reminderPage;
        }
      }
    }
  }

  /***********************
   * SETTINGS FORM HANDLERS
   ***********************/
  // Populate settings form if present on the page
  function initSettingsForm() {
    const settings = loadSettings();
    const limitActiveCheckbox = document.getElementById('limitActiveCheckbox');
    const hoursDropdown = document.getElementById('hoursDropdown');
    const minutesInput = document.getElementById('minutesInput');
    const limitActionDropdown = document.getElementById('limitActionDropdown');

    if (limitActiveCheckbox) {
      limitActiveCheckbox.checked = settings.limitActive;
    }
    if (hoursDropdown && minutesInput) {
      const hours = Math.floor(settings.usageLimitSeconds / 3600);
      const minutes = Math.floor((settings.usageLimitSeconds % 3600) / 60);
      hoursDropdown.value = hours;
      minutesInput.value = minutes;
    }
    if (limitActionDropdown) {
      limitActionDropdown.value = settings.limitAction;
    }
  }

  // Save settings from the form
  function handleSaveSettings() {
    const limitActiveCheckbox = document.getElementById('limitActiveCheckbox');
    const hoursDropdown = document.getElementById('hoursDropdown');
    const minutesInput = document.getElementById('minutesInput');
    const limitActionDropdown = document.getElementById('limitActionDropdown');

    const limitActive = limitActiveCheckbox ? limitActiveCheckbox.checked : true;
    const hours = hoursDropdown ? parseInt(hoursDropdown.value, 10) : 1;
    const minutes = minutesInput ? parseInt(minutesInput.value, 10) : 0;
    const usageLimitSeconds = (hours * 3600) + (minutes * 60);
    const limitAction = limitActionDropdown ? limitActionDropdown.value : 'reminder';

    let settings = loadSettings();
    settings.limitActive = limitActive;
    settings.usageLimitSeconds = usageLimitSeconds;
    settings.limitAction = limitAction;
    saveSettings(settings);
    alert("Settings saved!");
    updateDisplay();
  }

  // Disable tracking for today or for multiple days
  function handleDisableTracking() {
    const disableDaysDropdown = document.getElementById('disableDaysDropdown');
    const days = disableDaysDropdown ? parseInt(disableDaysDropdown.value, 10) : 0;
    const today = new Date(getTodayString());
    today.setDate(today.getDate() + days);
    const disabledUntilStr = today.toISOString().split('T')[0];

    let settings = loadSettings();
    settings.disabledUntil = disabledUntilStr;
    saveSettings(settings);
    alert("Tracking disabled until " + disabledUntilStr);
  }

  // Turn off usage limit while continuing to track time
  function handleTurnOffLimit() {
    let settings = loadSettings();
    settings.limitActive = false;
    saveSettings(settings);
    alert("Usage limit turned off. Tracking will continue.");
    updateDisplay();
  }

  // Initialize event listeners for the settings form (if present)
  function initEventListeners() {
    const saveSettingsButton = document.getElementById('saveSettingsButton');
    const disableButton = document.getElementById('disableButton');
    const turnOffLimitButton = document.getElementById('turnOffLimitButton');

    if (saveSettingsButton) {
      saveSettingsButton.addEventListener('click', handleSaveSettings);
    }
    if (disableButton) {
      disableButton.addEventListener('click', handleDisableTracking);
    }
    if (turnOffLimitButton) {
      turnOffLimitButton.addEventListener('click', handleTurnOffLimit);
    }
  }

  /***********************
   * INITIALIZATION
   ***********************/
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize the settings form only if it exists on this page.
    if (document.getElementById('settingsForm')) {
      initSettingsForm();
      initEventListeners();
    }
    scheduleMidnightReset();
    startTracking();
    updateDisplay();
  });
})();
