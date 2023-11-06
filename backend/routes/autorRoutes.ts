import express from 'express';
import _ from 'lodash';
import autorPersistence from '../src/persistence/autorPersistence';
import { Musico } from '../src/models/Autor';

const autorRouter = express.Router();

autorRouter.get('/musicos', async (req, res) => {
    try {
        const allMusicos = await autorPersistence.selectAllMusicos();
        res.json(allMusicos);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

autorRouter.get('/musicos/:nrReg', async (req, res) => {
    try {
        const nrReg = parseInt(req.params.nrReg);
        const musico = await autorPersistence.selectMusico(nrReg);
        res.json(musico);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

autorRouter.get('/bandas', async (req, res) => {
    try {
        const allBandas = await autorPersistence.selectAllBandas();
        res.json(allBandas);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

autorRouter.get('/bandas/:cdBanda', async (req, res) => {
    try {
        const cdBanda = parseInt(req.params.cdBanda);
        const banda = await autorPersistence.selectBanda(cdBanda);
        res.json(banda);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

autorRouter.post('/musicos', async (req, res) => {
    try {
        const musicoData = req.body;
        const newMusico = new Musico(await autorPersistence.newCdAutor());
        newMusico.cdEndereco = musicoData._cdEndereco;
        newMusico.nmMusico = musicoData._nmMusico;
        newMusico.nmArtistico = musicoData._nmArtistico;

        const nrReg = await autorPersistence.insertMusico(newMusico);

        res.status(201).json({ nrReg });
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

autorRouter.put('/musicos/:nrReg', async (req, res) => {
    try {
        const nrReg = parseInt(req.params.nrReg);
        const musicoData = req.body;
        const musicoOrig = await autorPersistence.selectMusico(nrReg);

        // Cria um objeto apenas com as propriedades que foram alteradas
        const changes = _.pickBy(musicoData, (value, key) => !_.isEqual(value, musicoOrig[key]));

        // Se não houver mudanças, não é necessário atualizar
        if (_.isEmpty(changes)) {
            return res.send('Nenhuma alteração foi detectada.');
        }

        // Cria um objeto de atualização com as alterações e o número de registro original
        const updtMusico = { ...changes, nrReg };

        const message = await autorPersistence.updateMusico(updtMusico);
        res.send(message);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

autorRouter.delete('/musicos/:nrReg', async (req, res) => {
    try {
        const nrReg = parseInt(req.params.nrReg);
        const message = await autorPersistence.deleteMusico(nrReg);
        res.send(message);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

export default autorRouter;
