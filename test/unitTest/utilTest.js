const { writeData } = require('./../../src/utils/util.js');
const chai = require('chai');

describe('writeData', function() {
  let files, fs, game;
  beforeEach(() => {
    files = {};
    fs = {
      readFile: (file, callback) => {
        callback('', '{}');
      },
      writeFile: (path, data) => {
        files = data;
      }
    };
    game = { '1234': 'Hey I am game' };
  });
  it('should call the function readFile and writeFile', () => {
    writeData(fs, '1234', game);
    const actual = files;
    const expected = '{"1234":{"1234":"Hey I am game"}}';
    chai.assert.equal(actual, expected);
  });

  it('should call the function readFile and writeFile', () => {
    fs = {
      readFile: (file, callback) => {
        callback('error occured', '{}');
      },
      writeFile: (path, data) => {
        files = data;
      }
    };
    writeData(fs, '1234', game);
    const actual = files;
    const expected = {};
    chai.assert.deepEqual(actual, expected);
  });
});
