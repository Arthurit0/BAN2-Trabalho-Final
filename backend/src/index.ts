import express from 'express';
import cors from 'cors';
import autorRouter from './routes/autorRoutes';
import discoRouter from './routes/discoRoutes';
import enderecoRouter from './routes/enderecoRoutes';
import estudioRouter from './routes/estudioRoutes';
import instrumentoRouter from './routes/instrumentoRoutes';
import musicaRouter from './routes/musicaRoutes';

let port = 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', autorRouter);
app.use('/', discoRouter);
app.use('/', enderecoRouter);
app.use('/', estudioRouter);
app.use('/', instrumentoRouter);
app.use('/', musicaRouter);

app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});
