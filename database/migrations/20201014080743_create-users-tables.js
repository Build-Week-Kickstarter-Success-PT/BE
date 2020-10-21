exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments();
      tbl.string('name', 256).notNullable().unique();
      tbl.string('email', 256).notNullable().index();
      tbl.string('password', 256).notNullable();
    })
    .createTable('campaigns', (tbl) => {
      tbl.increments();
      tbl.string('campaign_name', 256).notNullable();
      tbl.decimal('goal').unsigned().notNullable();
      tbl.text('description').notNullable();
      tbl.integer('campaign_length').notNullable();
      tbl.string('category', 256).notNullable();
      tbl.string('sub_category', 256).notNullable();
      tbl.string('country', 256).notNullable();
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('campaigns').dropTableIfExists('users');
};
