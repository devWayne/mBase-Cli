var sys = require('sys')

var exec = require('child_process').exec;


function command(str) {

    exec(str, function(error, stdout, stderr) {
        sys.print('stdout: ' + stdout);
        if (stderr) sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }

    });
}

module.exports = command
