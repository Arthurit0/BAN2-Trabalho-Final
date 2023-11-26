import express from 'express';
import _ from 'lodash';
import discoPersistence from '../persistence/discoPersistence';
import Disco from '../models/Disco';
import moment from 'moment';

const discoRouter = express.Router();

discoRouter.get('/discos', async (req, res) => {
    try {
        const allDiscos = await discoPersistence.selectAllDiscos();

        res.json(allDiscos);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

discoRouter.post('/discos', async (req, res) => {
    try {
        const discoData = req.body;
        const newDisco = new Disco();
        newDisco.cdAutor = discoData.cdAutor;
        newDisco.cdLocalGravacao = discoData.cdLocalGravacao;
        newDisco.dtGravacao = moment(discoData.dtGravacao).format('DD/MM/YYYY');
        newDisco.dsTitulo = discoData.dsTitulo;

        const cdDisco = await discoPersistence.insertDisco(newDisco);

        res.status(201).json({ cdDisco });
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

discoRouter.get('/musicas-in-disco', async (req, res) => {
    try {
        const musicasInDisco = await discoPersistence.selectAllMusicasInDiscos();
        res.json(musicasInDisco);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

discoRouter.post('/musicas-in-disco', async (req, res) => {
    try {
        const musicaInDiscoData = req.body;
        const { cdMusica, cdDisco } = musicaInDiscoData;

        const message = await discoPersistence.assignMusicaInDisco(cdMusica, cdDisco);

        res.send(message);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

discoRouter.get('/discos/:cdDisco', async (req, res) => {});

discoRouter.put('/discos/:cdDisco', async (req, res) => {});

discoRouter.delete('/discos/:cdDisco', async (req, res) => {});

export default discoRouter;
