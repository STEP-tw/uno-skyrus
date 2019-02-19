const joinGame = function() {
  const playerName = document.getElementById('playerName').value;
  const playerDetails = { playerName };

  const req = new Request('/joinGame', {
    method: 'POST',
    body: JSON.stringify(playerDetails),
    headers: { 'Content-Type': 'application/json' }
  });

  fetch(req).then(() => {
    window.location.href = '/lobby.html';
  });
};

const handleJoinGame = function(document, doesGameExist) {
  if (!doesGameExist) {
    document.getElementById('invalidGameKey').innerText = 'Invalid Game Key...';
    return;
  }
  joinGame();
};

const validateGameKey = function(document) {
  const gameKey = document.getElementById('gameKey').value;
  const playerDetails = { gameKey };

  const req = new Request('/validateGameKey', {
    method: 'POST',
    body: JSON.stringify(playerDetails),
    headers: { 'Content-Type': 'application/json' }
  });

  fetch(req)
    .then(response => response.json())
    .then(json => handleJoinGame(document, json.doesGameExist));
};

const initialize = function(document) {
  const joinGameButton = document.getElementById('joinGameButton');
  joinGameButton.onclick = validateGameKey.bind(null, document);
};

window.onload = initialize.bind(null, document);
