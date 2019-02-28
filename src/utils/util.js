const GAMES_FILE = './private/gamesData.json';

const generateGameKey = () => {
  return Date.now();
};

const writeData = function(fs, gameKey, game) {
  fs.readFile(GAMES_FILE, (err, gamesData) => {
    if (err) {
      console.log(err);
      return;
    }
    const games = JSON.parse(gamesData);
    games[gameKey] = game;
    fs.writeFile(GAMES_FILE, JSON.stringify(games));
  });
};

module.exports = { generateGameKey, writeData };
