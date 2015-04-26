#!/usr/bin/env node

var program = require('commander');
var output = require('../lib/output');

program
    .version('0.0.1')
    .parse(process.argv);


output('mBase', false, 'less');
