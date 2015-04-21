var fs = require('fs');

function getConfig() {
    var resolvedPath = fs.realpathSync('./');
    //console.log(resolvedPath);
    var pkgConfig = require(resolvedPath + '/package.json');
    return pkgConfig.mBase || [];
}

module.exports = getConfig;
