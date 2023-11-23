import express from 'express';
import _ from 'lodash';
import discoPersistence from '../persistence/discoPersistence';
import Disco from '../models/Disco';
import { updateIfDiff } from '../utils/utils';
import moment from 'moment';

const discoRouter = express.Router();

// Selecionar todos os discos
discoRouter.get('/discos', async (req, res) => {
    try {
        const allDiscos = await discoPersistence.selectAllDiscos();
        res.json(allDiscos);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Selecionar um disco específico
discoRouter.get('/discos/:cdDisco', async (req, res) => {
    try {
        const cdDisco = parseInt(req.params.cdDisco);
        const disco = await discoPersistence.selectDisco(cdDisco);
        res.json(disco);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Inserir um novo disco
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
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Atualizar um disco existente
discoRouter.put('/discos/:cdDisco', async (req, res) => {
    try {
        const cdDisco = parseInt(req.params.cdDisco);
        const updtData = req.body;
        const discoOrig = await discoPersistence.selectDisco(cdDisco);
        const discoUpdt = _.cloneDeep(discoOrig);

        discoUpdt.cdAutor = updateIfDiff(discoUpdt.cdAutor, updtData.cdAutor);
        discoUpdt.cdLocalGravacao = updateIfDiff(
            discoUpdt.cdLocalGravacao,
            updtData.cdLocalGravacao,
        );
        discoUpdt.dtGravacao = updateIfDiff(discoUpdt.dtGravacao, updtData.dtGravacao);
        discoUpdt.dsTitulo = updateIfDiff(discoUpdt.dsTitulo, updtData.dsTitulo);

        const message = await discoPersistence.updateDisco(discoUpdt);

        res.send(message);
    } catch (err) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Deletar um disco
discoRouter.delete('/discos/:cdDisco', async (req, res) => {
    try {
        const cdDisco = parseInt(req.params.cdDisco);
        const message = await discoPersistence.deleteDisco(cdDisco);
        res.send(message);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

export default discoRouter;
