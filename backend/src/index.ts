import express from 'express';
import autorRouter from '../routes/autorRoutes';

let port = 8080;

const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});

app.use('/', autorRouter);
