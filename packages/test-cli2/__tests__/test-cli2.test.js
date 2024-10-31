'use strict';

const testCli2 = require('..');
const assert = require('assert').strict;

assert.strictEqual(testCli2(), 'Hello from testCli2');
console.info('testCli2 tests passed');
