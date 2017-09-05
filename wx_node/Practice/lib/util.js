var Promise = require('bluebird');
var fs = require('fs');


exports.readFileAsync = function(path, encoding) {

    return new Promise(function(resolve, reject) {

        fs.readFile(path, encoding, function(err, data) {

            if(err) {

                reject(err);
            } else {

                resolve(data);
            }
        })
    })
}


exports.writeFileAsync = function(path, content) {

    return new Promise(function(resolve, reject) {

        fs.writeFile(path, content, function(err){

            if(err) {

                reject(err);
            } else {

                resolve();
            }
        })
    })
}