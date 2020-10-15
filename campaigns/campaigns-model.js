const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findById,
  findByUserId,
  update,
  remove,
};

async function add(campaign) {
  const [id] = await db('campaigns').insert(campaign, 'id');
  return db('campaigns').where({ id });
}

function find() {
  return db('campaigns').join('users', 'campaigns.user_id', '=', 'users.id');
}

function findById(id) {
  return db('campaigns')
    .join('users', 'campaigns.user_id', '=', 'users.id')
    .where({ 'campaigns.id': id })
    .select(
      'campaigns.id as campaign_id',
      'campaign_name',
      'goal',
      'description',
      'campaign_date',
      'category'
    )
    .first();
}

function findByUserId(userId) {
  return db('campaigns')
    .join('users', 'campaigns.user_id', '=', 'user.id')
    .where({ 'campaigns.id': userId })
    .select(
      'campaigns.id as campaign_id',
      'campaign_name',
      'goal',
      'description',
      'campaign_date',
      'category'
    )
    .first();
}

function update(changes, id) {
  return db('campaigns').where({ id }).update(changes);
}

async function remove(id) {
  return db('campaigns').where({ id }).del();
}
