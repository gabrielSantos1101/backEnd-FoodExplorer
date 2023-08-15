export async function up(knex) {
  return await knex.schema.createTable('dishes', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
    table.string('image')
    table.float('price')
    table.string('category')
    table.datetime('created_at').defaultTo(knex.fn.now())
    table.datetime('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return await knex.schema.dropTable('dishes')
}
