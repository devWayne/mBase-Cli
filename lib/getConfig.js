var fs = require('fs');

function getConfig(name) {
    var resolvedPath = fs.realpathSync('./');
    //console.log(resolvedPath);
    var pkgConfig = require(resolvedPath + '/package.json');
    return pkgConfig[name] || [];
}

module.exports = getConfig;
