import express from 'express';
import _ from 'lodash';
import autorPersistence from '../persistence/autorPersistence';
import { Banda, Musico } from '../models/Autor';
import moment from 'moment';

const autorRouter = express.Router();

autorRouter.get('/autores', async (req, res) => {
    try {
        const allAutores = await autorPersistence.selectAllAutores();
        res.json(allAutores);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

autorRouter.get('/musicos', async (req, res) => {
    try {
        const allMusicos = await autorPersistence.selectAllMusicos();
        res.json(allMusicos);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

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

autorRouter.get('/bandas', async (req, res) => {
    try {
        const allBandas = await autorPersistence.selectAllBandas();
        res.json(allBandas);
    } catch (err: any) {
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

autorRouter.get('/musicos/:nrReg', async (req, res) => {});

autorRouter.put('/musicos', async (req, res) => {});

autorRouter.delete('/musicos/:nrReg', async (req, res) => {});

autorRouter.get('/bandas/:cdBanda', async (req, res) => {});

autorRouter.put('/bandas/:cdBanda', async (req, res) => {});

autorRouter.delete('/bandas/:cdBanda', async (req, res) => {});

export default autorRouter;
