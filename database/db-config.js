const knex = require('knex');

const knexfile = require('../knexfile.js');
const environment = process.env.DB_ENV;

module.exports = knex(knexfile[environment]);
