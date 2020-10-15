const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
};

async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return db('users').where({ id });
}

function find() {
  return db('users');
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  db('users').where({ id }).first();
}

function remove(id) {
  return db('users').where({ id }).del();
}
