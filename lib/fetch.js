var command = require('./command');
var getConfig = require('./getConfig');
var path= require('path');
var fs = require('fs');

var UPDATED = false;

function init() {
    checkFdr('./mBase') ? command("cd mBase && git pull") : command("git clone https://github.com/devWayne/mBase");
    UPDATED = true;
}

function getStream() {
    if (!UPDATED) init();
    var cList = getConfig(),
	StreamObj={};
    cList.forEach(function(v,idx){
	StreamObj[v]=fs.createReadStream(__dirname +'/../mBase/src/modules/'+v+'.less')    	
    });

    return StreamObj;
}


function checkFdr(fdr) {
    try {
        fs.readdirSync(fdr);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    init: init,
    getStream: getStream
}

