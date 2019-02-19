const getPlayersStatus = function() {
  setInterval(() => {
    fetch('/playersStatus').then(response => {
      window.location.replace(response.url);
    });
  }, 1000);
};

window.onload = getPlayersStatus;
