var fetch = require('./fetch');
var fs = require('fs');

var DIR_REGX = /\w+(?=\/\b)/g

function output(dir) {
    fs.realpath('./', function(err, resolvedPath) {
        if (err) throw err;
        console.log(resolvedPath);
        fs.mkdir(resolvedPath + '/less', function() {

            var objStream = fetch.getStream();

            dirCheck(objStream, resolvedPath);

            Object.keys(objStream).forEach(function(v, idx) {
                objStream[v].pipe(fs.createWriteStream(resolvedPath + '/' + dir + '/' + v + '.less'));
            });
        })
    });
}


function dirCheck(objStream, resolvedPath) {
    var _arr = []
    Object.keys(objStream).forEach(function(v, idx) {
        var dir = v.match(DIR_REGX);
        if (_arr.indexOf(dir[0]) == '-1') {
            _arr.push(dir[0]);
            try {
                fs.mkdirSync(resolvedPath + '/less/' + dir);

            } catch (e) {
                console.log(e);
            }
        }
    });
    return _arr
}

module.exports = output;
//output('less');
