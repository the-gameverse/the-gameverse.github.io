/* /javascript/screentimetracking.js */
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

  // Return today's date as YYYY-MM-DD
  function getTodayString() {
    return new Date().toISOString().split('T')[0];
  }

  /***********************
   * GLOBAL VARIABLES & DEFAULTS
   ***********************/
  let trackingInterval = null;
  let midnightTimeout = null;
  const DEFAULT_SETTINGS = {
    usageLimitSeconds: 3600,      // Default to 1 hour
    limitActive: false,
    limitAction: 'reminder',      // Options: "reminder" or "lockout"
    disabledUntil: null,          // e.g., "2025-02-11" when tracking is disabled
    reminderPage: '/reminder.html',
    lockoutPage: '/lockout.html',
    lastReminderRedirect: 0       // Used to control the 5-minute reminder interval
  };

  /***********************
   * LOCAL STORAGE HANDLERS
   ***********************/
  // Load settings from localStorage (or return defaults)
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

  // Load today's tracking data (or initialize it)
  function loadTrackingData() {
    const dataJSON = localStorage.getItem('screenTimeData');
    const todayStr = getTodayString();
    let data;
    if (dataJSON) {
      try {
        data = JSON.parse(dataJSON);
        // If the stored date is not today, reset the counter
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
  // Start a timer that increments seconds spent every second
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
          // Tracking period is over; re-enable tracking
          settings.disabledUntil = null;
          saveSettings(settings);
        }
      }

      // Increment seconds spent and save
      let data = loadTrackingData();
      data.secondsSpent += 1;
      saveTrackingData(data);
      updateDisplay();
      checkLimitReached();
    }, 1000);
  }

  // Update on-page display (if elements exist) and change text to red if limit is reached
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
    
    // Change text color to red if the limit has been reached
    if (data.secondsSpent >= settings.usageLimitSeconds) {
      if (timeSpentElem) timeSpentElem.style.color = "red";
      if (timeRemainingElem) timeRemainingElem.style.color = "red";
    } else {
      if (timeSpentElem) timeSpentElem.style.color = "white";
      if (timeRemainingElem) timeRemainingElem.style.color = "white";
    }
  }

  /***********************
   * LIMIT HANDLING
   ***********************/
  // Check if the usage limit has been reached and perform the configured action.
  // On the settings page (if a settings form is present), no lockout or reminder is triggered.
  function checkLimitReached() {
    const data = loadTrackingData();
    const settings = loadSettings();
    if (!settings.limitActive) return;

    // If on the settings page, do not perform any redirection.
    if (document.getElementById('settingsForm')) {
      return;
    }

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
  // Initialize settings form fields with saved values
  function initSettingsForm() {
    const settings = loadSettings();
    const limitActiveCheckbox = document.getElementById('limitActiveCheckbox');
    const presetTimeDropdown = document.getElementById('presetTimeDropdown');
    const customTimeInput = document.getElementById('customTimeInput');
    const limitActionDropdown = document.getElementById('limitActionDropdown');

    if (limitActiveCheckbox) {
      limitActiveCheckbox.checked = settings.limitActive;
    }
    if (presetTimeDropdown && customTimeInput) {
      // Preset times (in seconds): 900, 1800, 3600, 7200, 10800
      const presets = [900, 1800, 3600, 7200, 10800];
      if (presets.includes(settings.usageLimitSeconds)) {
        presetTimeDropdown.value = String(settings.usageLimitSeconds);
        document.getElementById('customTimeContainer').style.display = 'none';
      } else {
        presetTimeDropdown.value = 'custom';
        document.getElementById('customTimeContainer').style.display = 'inline';
        // Format the stored usageLimitSeconds as HH:MM:SS
        let hrs = Math.floor(settings.usageLimitSeconds / 3600);
        let rem = settings.usageLimitSeconds % 3600;
        let mins = Math.floor(rem / 60);
        let secs = rem % 60;
        customTimeInput.value = [hrs, mins, secs].map(n => String(n).padStart(2, '0')).join(':');
      }
    }
    if (limitActionDropdown) {
      limitActionDropdown.value = settings.limitAction;
    }
  }

  // Save settings based on form input values
  function handleSaveSettings() {
    const limitActiveCheckbox = document.getElementById('limitActiveCheckbox');
    const presetTimeDropdown = document.getElementById('presetTimeDropdown');
    const customTimeInput = document.getElementById('customTimeInput');
    const limitActionDropdown = document.getElementById('limitActionDropdown');

    const limitActive = limitActiveCheckbox ? limitActiveCheckbox.checked : true;
    let usageLimitSeconds;

    if (presetTimeDropdown.value === 'custom') {
      let customTime = customTimeInput.value;
      let parts = customTime.split(':');
      if (parts.length === 3) {
        let hours = parseInt(parts[0], 10);
        let minutes = parseInt(parts[1], 10);
        let seconds = parseInt(parts[2], 10);
        usageLimitSeconds = hours * 3600 + minutes * 60 + seconds;
        if (isNaN(usageLimitSeconds)) {
          alert("Invalid custom time. Please enter time as HH:MM:SS.");
          return;
        }
      } else {
        alert("Invalid custom time format. Please use HH:MM:SS.");
        return;
      }
    } else {
      usageLimitSeconds = parseInt(presetTimeDropdown.value, 10);
    }
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

  /***********************
   * INITIALIZATION
   ***********************/
  document.addEventListener('DOMContentLoaded', function() {
    // If the settings form exists on the page, initialize it and attach listeners.
    if (document.getElementById('settingsForm')) {
      initSettingsForm();

      const saveSettingsButton = document.getElementById('saveSettingsButton');
      if (saveSettingsButton) {
        saveSettingsButton.addEventListener('click', handleSaveSettings);
      }
      const disableButton = document.getElementById('disableButton');
      if (disableButton) {
        disableButton.addEventListener('click', handleDisableTracking);
      }
    }
    scheduleMidnightReset();
    startTracking();
    updateDisplay();
  });
})();
