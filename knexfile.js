/* eslint-disable prettier/prettier */
import Path from './src/utils/Path.js'
import path from 'path'

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(
        Path.dirname(import.meta.url),
        'src',
        'database',
        'database.db',
      ),
    },
    migrations: {
      directory: path.resolve(
        Path.dirname(import.meta.url),
        'src',
        'database',
        'knex',
        'migrations',
      ),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
    useNullAsDefault: true,
  },
}
