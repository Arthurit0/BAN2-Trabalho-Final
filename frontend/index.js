import express from 'express';

const port = 3000;
const app = express();

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('/public/front.html', { root: '.' });
});

app.listen(port, () => {
    console.clear();
    console.log(`Servidor Frontend na porta ${port}`);
});
