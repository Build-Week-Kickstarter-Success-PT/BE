exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments();
      tbl.string('username', 128).notNullable().unique().index();
      tbl.string('password', 256).notNullable();
    })
    .createTable('campaigns', (tbl) => {
      tbl.increments();
      tbl.integer('goal').unsigned().notNullable();
      tbl.text('description').notNullable();
      tbl.date('campaign-date').notNullable();
      tbl.string('categories', 128).notNullable();
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('campaigns').dropTableIfExists('users');
};
