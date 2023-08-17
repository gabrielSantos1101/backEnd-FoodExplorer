export async function up(knex) {
  return await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('email')
    table.string('password')
    table.boolean('isAdmin')
    table.string('address')
    table.string('avatar')
    table.datetime('created_at').defaultTo(knex.fn.now())
    table.datetime('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return await knex.schema.dropTable('Users')
}
