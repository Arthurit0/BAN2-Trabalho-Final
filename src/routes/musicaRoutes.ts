import express from 'express';
import _ from 'lodash';
import musicaPersistence from '../persistence/musicaPersistence';
import Musica from '../models/Musica';
import { updateIfDiff } from '../utils/utils';

const musicaRouter = express.Router();

// Selecionar todas as músicas
musicaRouter.get('/musicas', async (req, res) => {
    try {
        const allMusicas = await musicaPersistence.selectAllMusicas();
        res.json(allMusicas);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Selecionar uma música específica
musicaRouter.get('/musicas/:cdMusica', async (req, res) => {
    try {
        const cdMusica = parseInt(req.params.cdMusica);
        const musica = await musicaPersistence.selectMusica(cdMusica);
        res.json(musica);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Inserir uma nova música
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
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Atualizar uma música existente
musicaRouter.put('/musicas/:cdMusica', async (req, res) => {
    try {
        const cdMusica = parseInt(req.params.cdMusica);
        const updtData = req.body;
        const musicaOrig = await musicaPersistence.selectMusica(cdMusica);
        const musicaUpdt = _.cloneDeep(musicaOrig);

        musicaUpdt.dsTitulo = updateIfDiff(musicaUpdt.dsTitulo, updtData.dsTitulo);
        musicaUpdt.dsGenero = updateIfDiff(musicaUpdt.dsGenero, updtData.dsGenero);
        musicaUpdt.tpDuracao = updateIfDiff(musicaUpdt.tpDuracao, updtData.tpDuracao);
        musicaUpdt.fmtArquivo = updateIfDiff(musicaUpdt.fmtArquivo, updtData.fmtArquivo);

        const message = await musicaPersistence.updateMusica(musicaUpdt);

        res.send(message);
    } catch (err) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Deletar uma música
musicaRouter.delete('/musicas/:cdMusica', async (req, res) => {
    try {
        const cdMusica = parseInt(req.params.cdMusica);
        const message = await musicaPersistence.deleteMusica(cdMusica);
        res.send(message);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

musicaRouter.get('/autores-in-musica', async (req, res) => {
    try {
        const autoresInMusica = await musicaPersistence.selectAutoresInMusica();
        res.json(autoresInMusica);
    } catch (err) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// musicaRouter.post('/musico-in-banda', async (req, res) => {
//     try {
//         const autorInMusicaData = req.body;
//         const { cdAutor, cdBanda } = autorInMusicaData;

//         const message = await musicaPersistence.assignMusicoInBanda(cdAutor, cdBanda);

//         res.send(message);
//     } catch (err: any) {
//         console.log(err);
//         res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
//     }
// });

export default musicaRouter;
