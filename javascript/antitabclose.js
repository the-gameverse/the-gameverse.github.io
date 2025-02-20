    window.addEventListener('beforeunload', function (e) {
      // Cancel the event
      e.preventDefault();
      // Chrome requires returnValue to be set
      e.returnValue = '';
    });
    window.onbeforeunload=function(){return "Anti-tab close enabled."};
