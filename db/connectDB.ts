import { Pool } from 'pg';

class ConexaoBD {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'ban2_trab_final',
        });
    }

    async connect() {
        return await this.pool.connect();
    }
}

module.exports = ConexaoBD;
