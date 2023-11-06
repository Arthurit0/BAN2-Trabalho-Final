import express from 'express';
import _ from 'lodash';
import discoPersistence from '../persistence/discoPersistence';
import Disco from '../models/Disco';

const discoRouter = express.Router();

// Função utilitária para atualizar se os valores são diferentes
function updtIfDiff(orig: any, updt: any) {
    return updt && orig !== updt ? updt : orig;
}

// Selecionar todos os discos
discoRouter.get('/discos', async (req, res) => {
    try {
        const allDiscos = await discoPersistence.selectAllDiscos();
        res.json(allDiscos);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Selecionar um disco específico
discoRouter.get('/discos/:cdDisco', async (req, res) => {
    try {
        const cdDisco = parseInt(req.params.cdDisco);
        const disco = await discoPersistence.selectDisco(cdDisco);
        res.json(disco);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Inserir um novo disco
discoRouter.post('/discos', async (req, res) => {
    try {
        const discoData = req.body;
        const newDisco = new Disco();
        newDisco.cdAutor = discoData.cdAutor;
        newDisco.cdProdutor = discoData.cdProdutor;
        newDisco.cdLocalGravacao = discoData.cdLocalGravacao;
        newDisco.dtGrav = discoData.dtGrav;
        newDisco.dsTitulo = discoData.dsTitulo;

        const cdDisco = await discoPersistence.insertDisco(newDisco);

        res.status(201).json({ cdDisco });
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Atualizar um disco existente
discoRouter.put('/discos/:cdDisco', async (req, res) => {
    try {
        const cdDisco = parseInt(req.params.cdDisco);
        const updtData = req.body;
        const discoOrig = await discoPersistence.selectDisco(cdDisco);
        const discoUpdt = _.cloneDeep(discoOrig);

        discoUpdt.cdAutor = updtIfDiff(discoUpdt.cdAutor, updtData.cdAutor);
        discoUpdt.cdProdutor = updtIfDiff(discoUpdt.cdProdutor, updtData.cdProdutor);
        discoUpdt.cdLocalGravacao = updtIfDiff(discoUpdt.cdLocalGravacao, updtData.cdLocalGravacao);
        discoUpdt.dtGrav = updtIfDiff(discoUpdt.dtGrav, updtData.dtGrav);
        discoUpdt.dsTitulo = updtIfDiff(discoUpdt.dsTitulo, updtData.dsTitulo);

        console.log(discoOrig);

        const message = await discoPersistence.updateDisco(discoUpdt);

        res.send(message);
    } catch (err) {
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
        res.status(500).send(err.message);
    }
});

export default discoRouter;
