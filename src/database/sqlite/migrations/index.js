/* eslint-disable prettier/prettier */
import { dbConnect } from '../../sqlite/index.js'
import { createUsers } from './createUsers.js'

export async function migrationsRun() {
  const schemas = [createUsers].join('')
  await dbConnect()
    .then((db) => db.exec(schemas))
    .catch((err) => console.log(err))
}
