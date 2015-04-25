var sys = require('sys')

var execSync = require('child_process').execSync;


function command(str) {

    return execSync(str).toString();

}

module.exports = command
