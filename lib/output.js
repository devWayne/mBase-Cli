var fetch = require('./fetch');
var fs = require('fs');
var utils = require('./utils');
var gitConfig = require('../gitConfig');


var DIR_REGX = /\w+(?=\/\b)/g

function output(strName, UPDATE, dist) {
    if(!dist)dist=gitConfig[strName].dist
    fs.realpath('./', function(err, resolvedPath) {
        if (err) throw err;
        console.log(resolvedPath);
        fs.mkdir(utils.concatFdr([resolvedPath, 'less']), function() {
            var objStream = fetch.getStream(strName, UPDATE);
            dirCheck(objStream, resolvedPath);
            Object.keys(objStream).forEach(function(v, idx) {
                try {
                    objStream[v].pipe(fs.createWriteStream(utils.concatFdr([resolvedPath, dist, v.toString()])));
                    console.log(dist);
                } catch (e) {
                    //console.log(e);
                }
            });
        })
    });
}


function dirCheck(objStream, resolvedPath) {
    var _arr = []
    Object.keys(objStream).forEach(function(v, idx) {
        var dir = v.match(DIR_REGX);
        console.log(dir);
        if (dir && _arr.indexOf(dir[0]) == '-1') {
            _arr.push(dir[0]);
            try {
                fs.mkdirSync(resolvedPath + '/less/' + dir);

            } catch (e) {
                //console.log(e);
            }
        }
    });
    return _arr
}

module.exports = output;
//output('mBase', false, 'less');
