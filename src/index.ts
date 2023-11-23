import express from 'express';
import cors from 'cors';
import autorRouter from './routes/autorRoutes';
import discoRouter from './routes/discoRoutes';
import enderecoRouter from './routes/enderecoRoutes';
import estudioRouter from './routes/estudioRoutes';
import instrumentoRouter from './routes/instrumentoRoutes';
import musicaRouter from './routes/musicaRoutes';

// Instanciando server para backend
const backend = express();
let port = 8080;

backend.use(cors());
backend.use(express.json());

backend.use('/', autorRouter);
backend.use('/', discoRouter);
backend.use('/', enderecoRouter);
backend.use('/', estudioRouter);
backend.use('/', instrumentoRouter);
backend.use('/', musicaRouter);

console.clear();

backend.listen(port, () => {
    console.log(`Servidor Backend rodando na porta ${port}`);
});

// Instanciando server para frontend
const frontend = express();
let portFront = 3000;

frontend.use(express.static('public'));

frontend.get('/', (req, res) => {
    res.sendFile('./public/front.html', { root: '.' });
});

frontend.listen(portFront, () => {
    console.log(`\nServidor Frontend rodando na porta ${portFront}`);
});
