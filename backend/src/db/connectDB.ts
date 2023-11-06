import { Pool, PoolClient, QueryResult } from 'pg';

export default class connectDB {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'ban2_trab_final',
            idleTimeoutMillis: 300000,
        });
    }

    async query(textoSQL: string, parametros?: any[]): Promise<QueryResult> {
        return await this.pool.query(textoSQL, parametros);
    }

    async begin(): Promise<PoolClient> {
        const client = await this.pool.connect();
        await client.query('BEGIN');
        return client;
    }

    async commit(client: PoolClient): Promise<void> {
        await client.query('COMMIT');
        client.release();
    }

    async rollback(client: PoolClient): Promise<void> {
        await client.query('ROLLBACK');
        client.release();
    }
}
