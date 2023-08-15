import Config from '../../../knexfile.js'
import knex from 'knex'

export default knex(Config.development)
