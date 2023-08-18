export async function up(knex) {
  return await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references('id').inTable('users')
    table.varchar('dishes_order').notNullable()
    table.text('status').notNullable()
    table.datetime('created_at').defaultTo(knex.fn.now())
    table.datetime('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return await knex.schema.dropTable('Orders')
}
