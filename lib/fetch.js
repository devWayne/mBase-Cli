var utils = require('./utils');
var getConfig = require('./getConfig');
var gitConfig = require('../gitConfig');

var path = require('path');
var fs = require('fs');


function init(repoInfo){
	utils.checkFdr(repoInfo)?utils.cmdPull(repoInfo):utils.cmdClone(repoInfo);

}
function getStream(strName,UPDATE) {

    if (!UPDATE) init(gitConfig[strName]);

    var cList = getConfig(gitConfig[strName].name),
        StreamObj = {};
    console.log('Pkg config:'+cList);
    cList.forEach(function(v, idx) {
        StreamObj[v] = fs.createReadStream(utils.concatFdr([__dirname,'/../',gitConfig[strName].folder,v]));
    });

    var _base=gitConfig[strName].base||'';
    if(_base)StreamObj[_base]=fs.createReadStream(utils.concatFdr([__dirname,'/../',gitConfig[strName].folder,_base]));



    return StreamObj;
}



module.exports = {
    init: init,
    getStream: getStream
}
