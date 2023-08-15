export async function up(knex) {
  return await knex.schema.createTable('ingredients', (table) => {
    table.increments('id').primary()
    table
      .integer('dish_id')
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE')
    table.string('name')
    table.string('image')
    table.datetime('created_at').defaultTo(knex.fn.now())
    table.datetime('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return await knex.schema.dropTable('ingredients')
}
