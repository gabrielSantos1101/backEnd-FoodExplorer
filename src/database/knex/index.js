import Config from '../../../knexfile.js'
import knex from 'knex'

const dbConnect = knex(Config.development)
export default dbConnect
