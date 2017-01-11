const fs = require('fs');
const helpers = require('./helpers');
const PATH_NAME = 'dist';

function EmptyPlugin(options) {
    // Setup the plugin instance with options...
}

EmptyPlugin.prototype.apply = function (compiler) {
    let self = this;
    compiler.plugin('emit', function (compilation, callback) {
        fs.unlinkSync(helpers.root(PATH_NAME));
        callback();
    });
};

module.exports = EmptyPlugin;