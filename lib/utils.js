var sys = require('sys');

var execSync = require('child_process').execSync,
    exec = require('child_process').exec;

var fs= require('fs'),
    path = require('path');

var root = path.join(__dirname, '..');

var utils = {

    cmd: function(str) {
        return execSync(str).toString();
    },

    cmdClone: function(repoInfo) {
	console.log('clone:'+__dirname);
        process.stdout.write(utils.cmd("cd " + root + "&& sudo git clone " + repoInfo.url));

    },

    cmdPull: function(repoInfo) {
		console.log('pull:'+__dirname);

        var rootRepo = path.join(__dirname, '..', repoInfo.name);
        process.stdout.write(utils.cmd("cd " + rootRepo + " && sudo git pull"));
    },
    checkFdr: function(repoInfo) {
        var rootRepo = path.join(__dirname, '..', repoInfo.name);
	//console.log('rootRepo'+rootRepo);
        try {
            fs.readdirSync(rootRepo);
            return true;
        } catch (e) {
		//console.log(e);
            return false;
        }
    },
    concatFdr:   function (list){
	var _path="";
	for (var i=0; i<list.length;i++){
		_path=path.join(_path,list[i]);
	}
	return _path;
   }



}

module.exports = utils;
