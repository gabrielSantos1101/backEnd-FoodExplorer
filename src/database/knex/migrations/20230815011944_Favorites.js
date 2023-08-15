export async function up(knex) {
  return await knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary()
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .integer('dish_id')
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE')
    table.datetime('created_at').defaultTo(knex.fn.now())
    table.datetime('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return await knex.schema.dropTable('favorites')
}
