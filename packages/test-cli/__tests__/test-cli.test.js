'use strict';

const testCli = require('..');
const assert = require('assert').strict;

assert.strictEqual(testCli(), 'Hello from testCli');
console.info('testCli tests passed');
