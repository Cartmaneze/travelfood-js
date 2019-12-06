'use strict';

const path = require('path');
const fs   = require('fs');

function __skipIndex(file) {
    return file !== 'index.js';
}

function __sortInitializers(a, b) {
    let aa = parseInt(a, 10);
    let bb = parseInt(b, 10);
    return aa - bb;
}

module.exports = function init(app) {
    let files = fs.readdirSync(__dirname);
    let initializers = files
        .filter(__skipIndex)
        .sort(__sortInitializers)
        .map(file => require(path.resolve(__dirname, file)));

    return initializers.reduce((chain, initializer) => chain.then(() => initializer(app)), Promise.resolve());
};
