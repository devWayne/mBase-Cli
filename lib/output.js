var fetch = require('./fetch');
var fs = require('fs');

function output() {
    fs.realpath('./', function(err, resolvedPath) {
        if (err) throw err;
        console.log(resolvedPath);
        fs.mkdir(resolvedPath + '/less', function() {
	    fs.mkdirSync(resolvedPath + '/less/components');
	    fs.mkdirSync(resolvedPath + '/less/elements');
	    var objStream=fetch.getStream();
            Object.keys(objStream).forEach(function(v,idx){
	    	objStream[v].pipe(fs.createWriteStream(resolvedPath+ '/less/'+ v+'.less'));    
	    })
		    
        })
    });
}

module.exports=output;

output();
