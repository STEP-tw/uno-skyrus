const getPlayersStatus = function() {
  setInterval(() => {
    fetch('/playersStatus').then(response => {
      if (response.redirected) {
        window.location.replace(response.url);
      }
    });
  }, 1000);
};

window.onload = getPlayersStatus;
