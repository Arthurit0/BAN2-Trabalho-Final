import express from 'express';
import _ from 'lodash';
import musicaPersistence from '../persistence/musicaPersistence';
import Musica from '../models/Musica';

const musicaRouter = express.Router();

musicaRouter.get('/musicas', async (req, res) => {
    try {
        const allMusicas = await musicaPersistence.selectAllMusicas();
        res.json(allMusicas);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

musicaRouter.get('/musicas/:cdMusica', async (req, res) => {});

musicaRouter.post('/musicas', async (req, res) => {
    try {
        const musicaData = req.body;
        const newMusica = new Musica();
        newMusica.dsTitulo = musicaData.dsTitulo;
        newMusica.dsGenero = musicaData.dsGenero;
        newMusica.tpDuracao = musicaData.tpDuracao;
        newMusica.fmtArquivo = musicaData.fmtArquivo;

        const cdMusica = await musicaPersistence.insertMusica(newMusica);

        res.status(201).json({ cdMusica });
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

musicaRouter.put('/musicas/:cdMusica', async (req, res) => {});

musicaRouter.delete('/musicas/:cdMusica', async (req, res) => {});

musicaRouter.get('/autores-in-musica', async (req, res) => {
    try {
        const autoresInMusica = await musicaPersistence.selectAutoresInMusica();
        res.json(autoresInMusica);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

musicaRouter.post('/autor-in-musica', async (req, res) => {
    try {
        const autorInMusicaData = req.body;
        const { cdAutor, cdMusica } = autorInMusicaData;

        const message = await musicaPersistence.assignAutorInMusica(cdAutor, cdMusica);

        res.send(message);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default musicaRouter;
