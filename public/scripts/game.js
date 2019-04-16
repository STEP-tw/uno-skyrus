/* globals createCard */
/*eslint no-unused-vars: "off"*/

const OTHERS_CARDS_LIMIT = 3;
let calledUno = false;
let numberOfPlayers;

const deleteCookie = function(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const leaveGame = function() {
  fetch('/leaveGame').then(res => {
    window.location.href = '/';
  });
};

const exitToStartGame = function() {
  deleteCookie('gameKey');
  deleteCookie('id');
  window.location = '/';
};

const removePass = function(document) {
  const pass = document.getElementById('passTurn');
  pass.style.visibility = 'hidden';
};

const pass = function() {
  fetch('/passTurn').then(() => removePass(document));
};

const displayPass = function(document) {
  const pass = document.getElementById('passTurn');
  pass.style.visibility = 'visible';
};

const drawCard = function(document) {
  fetch('/drawCard')
    .then(response => {
      return response.json();
    })
    .then(cardDetails => {
      initializeHand(document, cardDetails);
      if (cardDetails.playableCards.length) {
        displayPass(document);
        return;
      }
    });
};

const displayTopDiscard = function(document, card, isCurrentPlayer) {
  const pile = document.getElementById('pile');
  pile.innerHTML = '';
  pile.append(createCard(document, card));
  if (card.isWildCard && !card.isColorDeclared && isCurrentPlayer) {
    document.getElementById('wildCardOverlay').className = 'overlay visible';
  }
  if (card.isWildCard && card.isColorDeclared) {
    document.getElementById('wildCardOverlay').className = 'overlay hidden';
  }
};

const hasSameColor = (card1, card2) => card1.color == card2.color;

const isNumberCardSimilar = (card1, card2) =>
  !isNaN(card1.symbol) &&
  !isNaN(card2.symbol) &&
  (card1.symbol == card2.symbol && hasSameColor(card1, card2));

const isReverseCardSimilar = (card1, card2) =>
  card1.isReverseCard && card2.isReverseCard && hasSameColor(card1, card2);

const isDrawTwoCardSimilar = (card1, card2) =>
  card1.isDrawTwo && card2.isDrawTwo && hasSameColor(card1, card2);

const isSkipCardSimilar = (card1, card2) =>
  card1.isSkipCard && card2.isSkipCard && hasSameColor(card1, card2);

const isWildCardSimilar = (card1, card2) =>
  card1.isWildCard && card2.isWildCard && card1.isDrawFour == card2.isDrawFour;

const isSimilarCards = function(card1, card2) {
  return (
    isWildCardSimilar(card1, card2) ||
    isReverseCardSimilar(card1, card2) ||
    isDrawTwoCardSimilar(card1, card2) ||
    isSkipCardSimilar(card1, card2) ||
    isNumberCardSimilar(card1, card2)
  );
};

const hasCard = (playableCards, card) => {
  return playableCards.some(playableCard => {
    return isSimilarCards(playableCard, card);
  });
};

const displayLog = function(document, log) {
  /*eslint-disable */
  const statusLog = generateStatusLog(log);
  /*eslint-enable */
  const status = document.getElementById('statusBar');
  status.innerHTML = '';
  status.appendChild(statusLog);
};

const setCardAttributes = function(cardView, playableCards, card) {
  let className = 'non-playable-card';
  if (hasCard(playableCards, card)) {
    cardView.setAttribute('draggable', 'true');
    cardView.setAttribute('ondragstart', 'drag(event)');
    className = 'highlight-playable-card';
  }
  cardView.classList.add(className);
  return cardView;
};

const initializeHand = function(document, { cards, playableCards }) {
  const hand = document.getElementById('myHand');
  hand.innerHTML = '';
  cards.forEach((card, cardId) => {
    let cardView = createCard(document, card, cardId);
    const styledCard = setCardAttributes(cardView, playableCards, card);
    hand.append(styledCard);
  });
};

const catchPlayer = function() {
  fetch('/catch', {
    method: 'GET'
  });
};

const setUno = function() {
  calledUno = true;
};

const allowDrop = function(event) {
  event.preventDefault();
};

const drag = function(event) {
  event.dataTransfer.setData('text', event.target.id);
};

const isWildCard = cardId => {
  return cardId.startsWith('wild');
};

const throwCard = function(document, cardId, declaredColor) {
  fetch('/throwCard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cardId, calledUno, declaredColor })
  }).then(() => {
    hidePopUp();
    fetchCards(document);
  });
};

const throwWildCard = function(droppedCardId) {
  const declaredColor = event.target.classList[0];
  throwCard(document, droppedCardId, declaredColor);
};

const declareRunningColor = function() {
  const declaredColor = event.target.classList[0];
  fetch('/updateRunningColor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ declaredColor })
  }).then(() => hidePopUp());
};

const setOnClickOnColors = function(cardId) {
  const setRunningColor = throwWildCard.bind(null, cardId);
  document.getElementById('redColorDiv').onclick = setRunningColor;
  document.getElementById('blueColorDiv').onclick = setRunningColor;
  document.getElementById('greenColorDiv').onclick = setRunningColor;
  document.getElementById('yellowColorDiv').onclick = setRunningColor;
};

const drop = function(event) {
  event.preventDefault();
  const droppedCardId = event.dataTransfer.getData('text');

  if (isWildCard(droppedCardId)) {
    document.getElementById('wildCardOverlay').className = 'overlay visible';
    setOnClickOnColors(droppedCardId);
    return;
  }
  if (droppedCardId != 'stack') {
    throwCard(document, droppedCardId);
    disableGameElements();
  }
};

const drawDrop = function(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData('text');
  if (cardId == 'stack') {
    drawCard(document);
  }

  disableGameElements();
};

const fetchCards = function(document) {
  fetch('/playerCards')
    .then(response => response.json())
    .then(cards => {
      initializeHand(document, cards);
    });
};

const hideCards = function(hand, cardsCount) {
  let cardsToHide = cardsCount;
  for (let count = OTHERS_CARDS_LIMIT - 1; count >= 0; count--) {
    let visibility = 'visible';
    if (cardsToHide > 0) {
      visibility = 'hidden';
    }
    hand[count].style.visibility = visibility;
    cardsToHide--;
  }
};

const updateOthersCards = function(document, id, cardsCount) {
  const hand = document.getElementById(`player${id}Hand`).children;
  if (cardsCount <= OTHERS_CARDS_LIMIT) {
    const cardsToHide = OTHERS_CARDS_LIMIT - cardsCount;
    hideCards(hand, cardsToHide);
  }
};

const getNamesInOrder = function(playerNames, playerPosition) {
  const namesBeforeMe = playerNames.slice(0, playerPosition);
  const namesAfterMe = playerNames.slice(playerPosition);
  const detailsInOrder = namesAfterMe.concat(namesBeforeMe);
  return detailsInOrder;
};

const updateNamesAndClasses = function(document, id, name, isCurrent) {
  document.getElementById(`player${id}`).innerText = name;

  let handClassName = 'other-hand';
  let nameCardClass = 'non-current-player name-cards';
  if (isCurrent) {
    handClassName = 'other-hand current-hand';
    nameCardClass = 'current-player name-cards';
  }
  document.getElementById(`name-card${id}`).className = nameCardClass;
  if (id !== 1) {
    document.getElementById(`player${id}Hand`).className = handClassName;
  }
};

const updatePlayersDetails = function(document, playerDetails, playerPosition) {
  const detailsInOrder = getNamesInOrder(playerDetails, playerPosition);
  if (detailsInOrder[0].isCurrent) {
    enableDraggableElements(document);
  }
  let id = 1;
  detailsInOrder.forEach(({ name, isCurrent, cardsCount }) => {
    updateNamesAndClasses(document, id, name, isCurrent);

    if (id !== 1) {
      updateOthersCards(document, id, cardsCount);
    }
    id++;
  });
};

const getPlayerDetails = document => {
  fetch('/getPlayerNames')
    .then(response => response.json())
    .then(players => {
      const { playerDetails, playerPosition } = players;
      updatePlayersDetails(document, playerDetails, playerPosition);
    });
};

const enableDraggableElements = function(document) {
  const hand = document.getElementById('myHand');
  hand.setAttribute('ondragover', 'allowDrop(event)');
  hand.setAttribute('ondrop', 'drawDrop(event)');

  const stack = document.getElementById('stack');
  stack.setAttribute('draggable', 'true');
  stack.setAttribute('ondragstart', 'drag(event)');
};

const disableGameElements = function() {
  removePass(document);
  const stack = document.getElementById('stack');
  stack.setAttribute('draggable', 'false');
};

const displayVictory = function(document, status) {
	//MAKE A FETCH FOR THE PLAYER CARDS ------------------------------------
	fetch('/playerCards')
	    .then(response => response.json())
	    .then(cards => {
				if (status.hasWon) {
			    document.getElementById('gameEnd').className = 'overlay visible';
			    document.getElementById('popupMessage').innerText = `${
			      status.name
			    } Has Won The Game`;

					//SHOW THE SCORES ---------------------
					document.getElementById('score').innerHTML = cards.score;

					fetch('/getPlayerNames')
		      .then(response => response.json())
		      .then(players => {
		          //console.log(players);
		          document.getElementById('thrownCards').innerHTML = players.playerDetails[players.playerPosition].thrownCards;
		          document.getElementById('maxCard').innerHTML = players.playerDetails[players.playerPosition].maxCard;

		          var string = "";

							players.playerDetails.sort(function(a, b){
								return a.score - b.score
							});

		          for(var i = 0; i < players.playerDetails.length; i++){

								if(i==0){
									string += "<tr><td class='grade'><img class='lead-img' src='../images/first.png'></td><td>  " + players.playerDetails[i].name + "</td> <td class='point'>" + "</td> </tr>";
								}else if(i==1){
									string += "<tr><td class='grade'><img class='lead-img' src='../images/second.png'></td><td>  " + players.playerDetails[i].name + "</td> <td class='point'>" + players.playerDetails[i].score + " pt</td> </tr>";
								}else if(i==2){
									string += "<tr><td class='grade'><img class='lead-img' src='../images/third.png'></td><td>  " + players.playerDetails[i].name + "</td> <td class='point'>" + players.playerDetails[i].score + " pt</td> </tr>";
								}else{
									string += "<tr><td class='grade'><img class='lead-img' src='../images/person.png'></td><td>  " + players.playerDetails[i].name + "</td> <td class='point'>" + players.playerDetails[i].score + " pt</td> </tr>";
								}
		         }
		          document.getElementById('leaderboard').innerHTML = string;
		      });
				}
	    });
};

const changeGamePage = function(document, playersCount) {
  if (numberOfPlayers != playersCount && numberOfPlayers > 2) {
    numberOfPlayers = playersCount;
    window.location.href = '/game';
  }
};

const getGameStatus = function(document) {
  fetch('/gameStatus')
    .then(response => response.json())
    .then(gameStatus => {
      displayLog(document, gameStatus.gameLog);
      displayTopDiscard(document, gameStatus.topDiscard, gameStatus.isCurrent);
      displayVictory(document, gameStatus.victoryStatus);
      updateRunningColor(document, gameStatus.runningColor);
      updateSaveStatus(document, gameStatus.saveStatus);
      changeGamePage(document, gameStatus.playersCount);
    });
};

const copy = function() {
  const copyText = document.getElementById('gameKey');
  copyText.select();
  document.execCommand('copy');
};

const copyPlayerId = function() {
  const copyText = document.getElementById('playerId');
  copyText.select();
  document.execCommand('copy');
};

const updateSaveStatus = function(document, saveStatus) {
  if (saveStatus.status) {
    const saveDetailsView = document.getElementById('saveDetails');

    const saveData = `The game was saved. Game Id: <input id="gameKey" value="${
      saveStatus.gameKey
    }" class="gameKey" readonly/> <span class="copy-btn" onclick="copy()">&#x2398</span>, Player Id: <input id="playerId" value="${
      saveStatus.playerId
    }" class="gameKey" readonly/> <span class="copy-btn" onclick="copyPlayerId()">&#x2398</span>`;
    saveDetailsView.innerHTML = saveData;
  }
};

const updateRunningColor = function(document, color) {
  const runningColorDiv = document.getElementById('runningColorDiv');
  runningColorDiv.className = `running-color ${color}`;
};

const hidePopUp = function() {
  const wildCardOverlay = document.getElementById('wildCardOverlay');
  wildCardOverlay.className = 'overlay hidden';
};

//CHAT METHODS ------------------------------------------------------------
const chatListener = function (document){
	fetch('/serveChat')
      .then(response => response.json())
      .then(chat => {
        var chatArray = chat;
		const panel = document.getElementById("ChatTable");

		if(chatArray.length == 0){
			//No messages yet.
			panel.innerHTML = '<tr><td style="text-align: center">** No messages yet **</td></tr>';
		}else{
			//There is at least one message.
			var i;
			var panelHTML = constHTML = '<thead><tr><td width="20%" ></td><td  ></td></tr></thead>';
			for(i = 0; i < chatArray.length; i++){

					//Make every player name with different color
					switch(chatArray[i].color){
						case 0:
							panelHTML += '<tr><td style="color: blue"><b>' + chatArray[i].from + ': </b></td><td >' + chatArray[i].msg + '</td></tr>';
							break;
						case 1:
							panelHTML += '<tr><td style="color: red"><b>' + chatArray[i].from + ': </b></td><td >' + chatArray[i].msg + '</td></tr>';
							break;
						case 2:
							panelHTML += '<tr><td style="color: green"><b>' + chatArray[i].from + ': </b></td><td >' + chatArray[i].msg + '</td></tr>';
							break;
						case 3:
							panelHTML += '<tr><td style="color: orange"><b>' + chatArray[i].from + ': </b></td><td >' + chatArray[i].msg + '</td></tr>';
							break;
						case 4:
							panelHTML += '<tr><td style="color: sienna"><b>' + chatArray[i].from + ': </b></td><td >' + chatArray[i].msg + '</td></tr>';
							break;
						case 5:
							panelHTML += '<tr><td style="color: indigo"><b>' + chatArray[i].from + ': </b></td><td >' + chatArray[i].msg + '</td></tr>';
							break;
						case 6:
							panelHTML += '<tr><td style="color: darkblue"><b>' + chatArray[i].from + ': </b></td><td >' + chatArray[i].msg + '</td></tr>';
							break;
						case 7:
							panelHTML += '<tr><td style="color: darkslategrey "><b>' + chatArray[i].from + ': </b></td><td >' + chatArray[i].msg + '</td></tr>';
							break;
					}
			}
			//Update the chat table
			panel.innerHTML = panelHTML;
		}
      });
};

const handleChatAdd = function (){
	var input = document.getElementById('usermsg');
	var msg = document.getElementById('usermsg').value;
	if(msg == ""){
		//Check if the input is empty
		input.placeholder = "You have to fill the field!";
	}else{
		var messageObject = {text: msg};
		fetch('/addChat',{
			method: 'post',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(messageObject)
		});
	}
	input.value = "";
	//Go to the end of the chat.
	setTimeout(function () {
		var chatBox = document.getElementById('chatbox');
		chatBox.scrollTop = chatBox.scrollHeight+10;
    }, 500);
};
//-------------------------------------------------------------------------

const initialize = function(document) {
  setInterval(() => {
    getGameStatus(document);
    fetchCards(document);

	//ADDED THE CHAT LISTENER -------------------------------------------
	chatListener(document);
	//-------------------------------------------------------------------

    const pile = document.getElementById('pile');
    pile.setAttribute('ondrop', 'drop(event)');

    pile.setAttribute('ondrop', 'drop(event)');
    pile.setAttribute('ondragover', 'allowDrop(event)');
    getPlayerDetails(document);
  }, 1000);
  fetch('/playersCount')
    .then(res => res.json())
    .then(json => {
      numberOfPlayers = json.playersCount;
    });
  removePass(document);
};

const saveGame = function() {
  fetch('/saveGame');
};

window.onload = initialize.bind(null, document);
