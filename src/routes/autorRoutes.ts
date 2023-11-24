import express from 'express';
import _ from 'lodash';
import autorPersistence from '../persistence/autorPersistence';
import { Banda, Musico } from '../models/Autor';
import { updateIfDiff } from '../utils/utils';

const autorRouter = express.Router();

// Rotas de Músicos:

// Selecionar todos os músicos
autorRouter.get('/musicos', async (req, res) => {
    try {
        const allMusicos = await autorPersistence.selectAllMusicos();
        res.json(allMusicos);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Selecionar um músico
autorRouter.get('/musicos', async (req, res) => {
    try {
        const nrReg = req.body.nrReg;
        const musico = await autorPersistence.selectMusico(nrReg);
        res.json(musico);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Inserir um músico
autorRouter.post('/musicos', async (req, res) => {
    try {
        const musicoData = req.body;
        const newMusico = new Musico(await autorPersistence.newCdAutor());

        const { cdEndereco, nmMusico, nmArtistico } = musicoData;

        newMusico.cdEndereco = cdEndereco;
        newMusico.nmMusico = nmMusico;
        newMusico.nmArtistico = nmArtistico;

        const nrReg = await autorPersistence.insertMusico(newMusico);

        res.status(201).json({ nrReg });
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

autorRouter.put('/musicos', async (req, res) => {
    try {
        const { nrReg, cdAutor, cdEndereco, nmMusico, nmArtistico } = req.body;

        const musicoOrig = await autorPersistence.selectMusico(nrReg);
        const musicoUpdt = _.cloneDeep(musicoOrig);

        musicoUpdt.cdAutor = updateIfDiff(musicoUpdt.cdAutor, cdAutor);
        musicoUpdt.cdEndereco = updateIfDiff(musicoUpdt.cdEndereco, cdEndereco);
        musicoUpdt.nmMusico = updateIfDiff(musicoUpdt.nmMusico, nmMusico);
        musicoUpdt.nmArtistico = updateIfDiff(musicoUpdt.nmArtistico, nmArtistico);

        const message = await autorPersistence.updateMusico(musicoUpdt);

        res.send(message);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

autorRouter.delete('/musicos/:nrReg', async (req, res) => {
    try {
        const nrReg = parseInt(req.params.nrReg);
        const message = await autorPersistence.deleteMusico(nrReg);
        res.send(message);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

autorRouter.get('/bandas', async (req, res) => {
    try {
        const allBandas = await autorPersistence.selectAllBandas();
        res.json(allBandas);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

autorRouter.get('/bandas/:cdBanda', async (req, res) => {
    try {
        const cdBanda = parseInt(req.params.cdBanda);
        const banda = await autorPersistence.selectBanda(cdBanda);
        res.json(banda);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

autorRouter.get('/autores', async (req, res) => {
    try {
        const allAutores = await autorPersistence.selectAllAutores();
        res.json(allAutores);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

autorRouter.get('/musicos-in-banda', async (req, res) => {
    try {
        const musicosInBanda = await autorPersistence.selectAllMusicosInBandas();
        res.json(musicosInBanda);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
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
        console.log(err);
        res.status(500).send(err);
    }
});

autorRouter.put('/bandas/:cdBanda', async (req, res) => {
    try {
        const cdBanda = parseInt(req.params.cdBanda);
        const updtData = req.body;
        const bandaOrig = await autorPersistence.selectBanda(cdBanda);
        const bandaUpdt = _.cloneDeep(bandaOrig);

        bandaUpdt.nmBanda = updateIfDiff(bandaUpdt.nmBanda, updtData.nmBanda);
        bandaUpdt.dtFormacao = updateIfDiff(bandaUpdt.dtFormacao, updtData.dtFormacao);

        const message = await autorPersistence.updateBanda(bandaUpdt);

        res.send(message);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

autorRouter.delete('/bandas/:cdBanda', async (req, res) => {
    try {
        const cdBanda = parseInt(req.params.cdBanda);
        const message = await autorPersistence.deleteBanda(cdBanda);
        res.send(message);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

autorRouter.post('/musico-in-banda', async (req, res) => {
    try {
        const musicoInBandaData = req.body;
        const { nrReg, cdBanda } = musicoInBandaData;

        const message = await autorPersistence.assignMusicoInBanda(nrReg, cdBanda);

        res.send(message);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

autorRouter.get('/musicos/:nrReg', async (req, res) => {
    try {
        const nrReg = parseInt(req.params.nrReg);
        const musico = await autorPersistence.selectMusico(nrReg);
        res.json(musico);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default autorRouter;
