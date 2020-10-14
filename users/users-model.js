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
  return db('users').where({ id }).first();
}

function find() {
  return db('users');
}

async function findBy(filter) {
  const user = await db('users').where(filter).orderBy('id');
  return user;
}

async function findById(id) {
  const user = await db('users').where({ id }).first();
  return user;
}

async function remove(id) {
  const userToDelete = await findById(id);
  await db('users').where({ id }).del();
  return userToDelete;
}
