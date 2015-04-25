var command = require('./command');
var getConfig = require('./getConfig');
var path = require('path');
var fs = require('fs');

var UPDATED = false;

var root = path.join(__dirname, '..');
var rootmBase = path.join(__dirname, '..','mBase');

function init() {

   	checkFdr(rootmBase) ? command("cd " + rootmBase + " && git pull") : command("cd " + root + " &&git clone https://github.com/devWayne/mBase");
   
    UPDATED = true;
}

function getStream() {
    if (!UPDATED) init();

    var cList = getConfig(),
        StreamObj = {};
    cList.forEach(function(v, idx) {
        StreamObj[v] = fs.createReadStream(__dirname + '/../mBase/src/modules/' + v + '.less')
    });

    return StreamObj;

    /*
    if (!UPDATED){
  
    myRepo.pull('origin', 'master', function(err, succ) {
      if (err) return console.log(err);
      console.log(succ);
     });
    }
    */

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
