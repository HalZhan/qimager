const path = require('path');
const fs = require('fs');
const helpers = require('./helpers');
const packageInfo = require('../package.json');

const INDEX_HTML = 'index.html';

function duplicatePlugin() { }

duplicatePlugin.prototype.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
        let version = packageInfo.version || '0.0.0';
        // Loop through all compiled assets
        for (let filename in compilation.assets) {
            let file = compilation.assets[filename];
            // if(filename !== INDEX_HTML) {
            //     let pathObj = path.parse(filename);
            //     let name = `${pathObj.name}_${version}${pathObj.ext}`;
            //     compilation.assets[name] = {
            //         source: () => {
            //             return file.source();
            //         },
            //         size: () => {
            //             return file.size();
            //         }
            //     };
            // }
            // else {
                fs.writeFileSync(helpers.root(INDEX_HTML), file.source());
            // }
        }
        callback();
    });
};

module.exports = duplicatePlugin;