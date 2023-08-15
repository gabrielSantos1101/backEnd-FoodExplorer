exports.up = (knex) =>
  knex.schema.createTable('Users', (table) => {
    table.increments('id').primary()
    table.varchar('name')
    table.varchar('email')
    table.varchar('password')
    table.varchar('avatar')
    table.datetime('created_at')
    table.datetime('updated_at')
  })

exports.down = (knex) => knex.schema.dropTable('Users')
