'use strict';

const fs   = require('fs');
const path = require('path');

let models = fs.readdirSync(__dirname)
    .filter(file => file.includes('.') && file !== 'index.js')
    .map(file => path.join(__dirname, file));

module.exports = models;

/**
 * Models
 * @public
 * @type {Object}
 * @property {meals} meals
 * @property {days} days
 * @property {journeys} journeys
 * @property {users} users
 * @property {foods} foods
 */
