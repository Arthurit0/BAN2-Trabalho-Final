import express from 'express';
import _ from 'lodash';
import musicaPersistence from '../persistence/musicaPersistence';
import Musica from '../models/Musica';

const musicaRouter = express.Router();

// Função utilitária para atualizar se os valores são diferentes
function updtIfDiff(orig: any, updt: any) {
    return updt && orig !== updt ? updt : orig;
}

// Selecionar todas as músicas
musicaRouter.get('/musicas', async (req, res) => {
    try {
        const allMusicas = await musicaPersistence.selectAllMusicas();
        res.json(allMusicas);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Selecionar uma música específica
musicaRouter.get('/musicas/:cdMusica', async (req, res) => {
    try {
        const cdMusica = parseInt(req.params.cdMusica);
        const musica = await musicaPersistence.selectMusica(cdMusica);
        res.json(musica);
    } catch (err: any) {
        res.status(500).send(err.message);
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
        res.status(500).send(err.message);
    }
});

// Atualizar uma música existente
musicaRouter.put('/musicas/:cdMusica', async (req, res) => {
    try {
        const cdMusica = parseInt(req.params.cdMusica);
        const updtData = req.body;
        const musicaOrig = await musicaPersistence.selectMusica(cdMusica);
        const musicaUpdt = _.cloneDeep(musicaOrig);

        musicaUpdt.dsTitulo = updtIfDiff(musicaUpdt.dsTitulo, updtData.dsTitulo);
        musicaUpdt.dsGenero = updtIfDiff(musicaUpdt.dsGenero, updtData.dsGenero);
        musicaUpdt.tpDuracao = updtIfDiff(musicaUpdt.tpDuracao, updtData.tpDuracao);
        musicaUpdt.fmtArquivo = updtIfDiff(musicaUpdt.fmtArquivo, updtData.fmtArquivo);

        const message = await musicaPersistence.updateMusica(musicaUpdt);

        res.send(message);
    } catch (err) {
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
        res.status(500).send(err.message);
    }
});

export default musicaRouter;
