const getPlayerDetails = function(document) {
  const playerName = document.getElementById('playerName').value;
  const gameKey = document.getElementById('gameKey').value;
  return { playerName, gameKey };
};

const isEmpty = function(playerDetails) {
  const { playerName, gameKey } = playerDetails;
  return playerName === '' || gameKey === '';
};

const joinGame = function() {
  const playerDetails = getPlayerDetails(document);

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
  const playerDetails = getPlayerDetails(document);

  if (isEmpty(playerDetails)) {
    document.getElementById('invalidGameKey').innerText =
      'Name and game key can not be empty';
    return;
  }
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
