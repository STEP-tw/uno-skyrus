const { ActivityLog } = require('../../src/models/activityLog.js');
const chai = require('chai');

describe('ActivityLog', function() {
  describe('logJoinGame', () => {
    it('should update the log with join game', () => {
      const activityLog = new ActivityLog([{ action: 'start-game' }]);
      activityLog.logJoinGame('Player1');
      const actual = activityLog.getLatestLog();
      const expected = { action: 'join-game', playerName: 'Player1' };

      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('logLeaveGame', () => {
    it('should update the log with leave game', () => {
      const activityLog = new ActivityLog([{ action: 'start-game' }]);
      activityLog.logLeaveGame('Player1');
      const actual = activityLog.getLatestLog();
      const expected = { action: 'leave-game', playerName: 'Player1' };

      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('logThrowCard', () => {
    it('should update log with throw card data', () => {
      const activityLog = new ActivityLog([{ action: 'start-game' }]);
      activityLog.logThrowCard('Player1', { number: 3, color: 'red' });
      const actual = activityLog.getLatestLog();
      const expected = {
        action: 'throw-card',
        playerName: 'Player1',
        card: { number: 3, color: 'red' }
      };

      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('logDrawCard', () => {
    it('should update log with draw card data', () => {
      const activityLog = new ActivityLog([{ action: 'start-game' }]);
      activityLog.logDrawCards('Player1', 2);
      const actual = activityLog.getLatestLog();
      const expected = {
        action: 'draw-card',
        playerName: 'Player1',
        cardCount: 2
      };

      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('logCallUno', () => {
    it('should update log with call uno data', () => {
      const activityLog = new ActivityLog([{ action: 'start-game' }]);
      activityLog.logCallUno('Player1');
      const actual = activityLog.getLatestLog();
      const expected = {
        action: 'call-uno',
        playerName: 'Player1'
      };

      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('logCaught', () => {
    it('should update log with caught data', () => {
      const activityLog = new ActivityLog([{ action: 'start-game' }]);
      activityLog.logCaught('Player1', 'Player2');
      const actual = activityLog.getLatestLog();
      const expected = {
        action: 'caught',
        catcher: 'Player1',
        victim: 'Player2'
      };

      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('logWrongCatch', () => {
    it('should update log with wrong catch data', () => {
      const activityLog = new ActivityLog([{ action: 'start-game' }]);
      activityLog.logWrongCatch('Player1');
      const actual = activityLog.getLatestLog();
      const expected = {
        action: 'wrong-catch',
        playerName: 'Player1'
      };

      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('logRefillStack', () => {
    it('should update log with refill stack data', () => {
      const activityLog = new ActivityLog([{ action: 'start-game' }]);
      activityLog.logRefillStack();
      const actual = activityLog.getLatestLog();
      const expected = {
        action: 'refill-stack'
      };

      chai.assert.deepEqual(actual, expected);
    });
  });
});
