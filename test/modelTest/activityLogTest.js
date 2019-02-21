const { ActivityLog } = require('../../src/models/activityLog.js');
const chai = require('chai');

describe('AddLog', function() {
  it('Should return the current activity log if nothing is added', function() {
    const log = new ActivityLog(123, 'Player');
    const actualOutput = log.getLatestLog();
    const expectedOutput = 'Player started game with id 123';

    chai.assert.equal(actualOutput, expectedOutput);
  });

  it('Should return the latest activity log if a log is added', function() {
    const log = new ActivityLog(123, 'Player');
    log.addLog('Player2', ' thrown ', 'Blue 3');
    const actualOutput = log.getLatestLog();
    const expectedOutput = 'Player2 thrown Blue 3';

    chai.assert.equal(actualOutput, expectedOutput);
  });
});
