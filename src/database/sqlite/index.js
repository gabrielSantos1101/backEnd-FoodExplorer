/* eslint-disable prettier/prettier */
import * as sqlite from 'sqlite'
import sqlite3 from 'sqlite3'
import path from 'path'
import Path from '../../utils/Path.js'

export async function dbConnect() {
  const database = await sqlite.open({
    filename: path.resolve(Path.dirname(import.meta.url), '..', 'database.db'),
    driver: sqlite3.Database,
  })

  return database
}
