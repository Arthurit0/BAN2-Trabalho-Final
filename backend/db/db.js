import { Pool } from 'pg';

async function connect() {
    const pool = new Pool({
        host: 'localhost',
        port: 5432,
        database: 'ban2_trab_final',
        user: 'postgres',
        password: 'postgres'
    });

    const client = await pool.connect();
    console.log('Pool conectada!');

    global.connection = pool;
    return pool.connect();
}

export default connect;
