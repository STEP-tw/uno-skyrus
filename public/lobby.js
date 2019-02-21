const getPlayersStatus = function() {
  setInterval(() => {
    fetch('/playersStatus')
      .then(response => {
        if (response.redirected) {
          window.location.replace(response.url);
        }
        return response.json();
      })
      .then(json => {
        document.getElementById('players').innerText = `players joined => ${
          json.playersNames
        }`;
      });
  }, 1000);
};

window.onload = getPlayersStatus;
