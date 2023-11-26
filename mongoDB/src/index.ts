import express from 'express';
import cors from 'cors';
import autorRouter from './routes/autorRoutes';
import discoRouter from './routes/discoRoutes';
import enderecoRouter from './routes/enderecoRoutes';
import estudioRouter from './routes/estudioRoutes';
import instrumentoRouter from './routes/instrumentoRoutes';
import musicaRouter from './routes/musicaRoutes';
import connectDB from './db/connectMongoDB';
import seedDB from '../seed/seed';
import autorPersistence from './persistence/autorPersistence';
import { Autor, Musico } from './models/Autor';

console.clear();

await connectDB();
await seedDB();

const backend = express();
const frontend = express();

const portBack = 8080;
const portFront = 3000;

// Configurando server para backend
backend.use(cors());
backend.use(express.json());

backend.use('/', autorRouter);
backend.use('/', discoRouter);
backend.use('/', enderecoRouter);
backend.use('/', estudioRouter);
backend.use('/', instrumentoRouter);
backend.use('/', musicaRouter);

backend.listen(portBack, () => {
    console.log(`Servidor Backend rodando na porta ${portBack}`);
});

// Configurando server para frontend
frontend.use(express.static('public'));

frontend.get('/', (req, res) => {
    res.sendFile('./public/front.html', { root: '.' });
});

frontend.listen(portFront, () => {
    console.log(`Servidor Frontend rodando na porta ${portFront}`);
});
