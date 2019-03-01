const { ActivityLog } = require('../../src/models/activityLog.js');
const chai = require('chai');

describe('AddLog', function() {
  it('Should return the latest activity log if a log is added', function() {
    const log = new ActivityLog();
    log.addLog('Player2', ' thrown ', 'Blue 3');
    const actualOutput = log.getLatestLog();
    const expectedOutput = 'Player2 thrown Blue 3';

    chai.assert.equal(actualOutput, expectedOutput);
  });
});
