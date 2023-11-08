import express from 'express';
import _ from 'lodash';
import autorPersistence from '../persistence/autorPersistence';
import { Banda, Musico } from '../models/Autor';

const autorRouter = express.Router();

function updtIfDiff(orig: any, updt: any) {
    return updt && orig !== updt ? updt : orig;
}

autorRouter.get('/musicos', async (req, res) => {
    try {
        const allMusicos = await autorPersistence.selectAllMusicos();
        res.json(allMusicos);
    } catch (err: any) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.get('/musicos/:nrReg', async (req, res) => {
    try {
        const nrReg = parseInt(req.params.nrReg);
        const musico = await autorPersistence.selectMusico(nrReg);
        res.json(musico);
    } catch (err: any) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.get('/bandas', async (req, res) => {
    try {
        const allBandas = await autorPersistence.selectAllBandas();
        res.json(allBandas);
    } catch (err: any) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.get('/bandas/:cdBanda', async (req, res) => {
    try {
        const cdBanda = parseInt(req.params.cdBanda);
        const banda = await autorPersistence.selectBanda(cdBanda);
        res.json(banda);
    } catch (err: any) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.post('/musicos', async (req, res) => {
    try {
        const musicoData = req.body;
        const newMusico = new Musico(await autorPersistence.newCdAutor());
        newMusico.cdEndereco = musicoData.cdEndereco;
        newMusico.nmMusico = musicoData.nmMusico;
        newMusico.nmArtistico = musicoData.nmArtistico;

        const nrReg = await autorPersistence.insertMusico(newMusico);

        res.status(201).json({ nrReg });
    } catch (err: any) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.get('/autores', async (req, res) => {
    try {
        const allAutores = await autorPersistence.selectAllAutores();
        res.json(allAutores);
    } catch (err) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.get('/musicos-in-banda', async (req, res) => {
    try {
        const musicosInBanda = await autorPersistence.selectAllMusicosInBanda();
        res.json(musicosInBanda);
    } catch (err) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.put('/musicos/:nrReg', async (req, res) => {
    try {
        const nrReg = parseInt(req.params.nrReg);
        const updtData = req.body;
        const musicoOrig = await autorPersistence.selectMusico(nrReg);
        const musicoUpdt = _.cloneDeep(musicoOrig);

        musicoUpdt.cdAutor = updtIfDiff(musicoUpdt.cdAutor, updtData.cdAutor);
        musicoUpdt.cdEndereco = updtIfDiff(musicoUpdt.cdEndereco, updtData.cdEndereco);
        musicoUpdt.nmMusico = updtIfDiff(musicoUpdt.nmMusico, updtData.nmMusico);
        musicoUpdt.nmArtistico = updtIfDiff(musicoUpdt.nmArtistico, updtData.nmArtistico);

        const message = await autorPersistence.updateMusico(musicoUpdt);

        res.send(message);
    } catch (err) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.delete('/musicos/:nrReg', async (req, res) => {
    try {
        const nrReg = parseInt(req.params.nrReg);
        const message = await autorPersistence.deleteMusico(nrReg);
        res.send(message);
    } catch (err: any) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.post('/bandas', async (req, res) => {
    try {
        const bandaData = req.body;
        const newBanda = new Banda(await autorPersistence.newCdAutor());
        newBanda.nmBanda = bandaData.nmBanda;
        newBanda.dtFormacao = bandaData.dtFormacao;

        const cdBanda = await autorPersistence.insertBanda(newBanda);

        res.status(201).json({ cdBanda });
    } catch (err: any) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.put('/bandas/:cdBanda', async (req, res) => {
    try {
        const cdBanda = parseInt(req.params.cdBanda);
        const updtData = req.body;
        const bandaOrig = await autorPersistence.selectBanda(cdBanda);
        const bandaUpdt = _.cloneDeep(bandaOrig);

        bandaUpdt.nmBanda = updtIfDiff(bandaUpdt.nmBanda, updtData.nmBanda);
        bandaUpdt.dtFormacao = updtIfDiff(bandaUpdt.dtFormacao, updtData.dtFormacao);

        const message = await autorPersistence.updateBanda(bandaUpdt);

        res.send(message);
    } catch (err) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.delete('/bandas/:cdBanda', async (req, res) => {
    try {
        const cdBanda = parseInt(req.params.cdBanda);
        const message = await autorPersistence.deleteBanda(cdBanda);
        res.send(message);
    } catch (err: any) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.post('/musico-in-banda', async (req, res) => {
    try {
        const musicoInBandaData = req.body;
        const { nrReg, cdBanda } = musicoInBandaData;

        const message = await autorPersistence.assignMusicoInBanda(nrReg, cdBanda);

        res.send(message);
    } catch (err: any) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

autorRouter.get('/musicos/:nrReg', async (req, res) => {
    try {
        const nrReg = parseInt(req.params.nrReg);
        const musico = await autorPersistence.selectMusico(nrReg);
        res.json(musico);
    } catch (err: any) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

export default autorRouter;
