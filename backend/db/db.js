import { Pool } from 'pg';

class ConexaoBD {
    constructor() {
        this.pool = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'ban2_trab_final'
        })
    }
}