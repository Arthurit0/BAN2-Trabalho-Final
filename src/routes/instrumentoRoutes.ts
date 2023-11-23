import express from 'express';
import _ from 'lodash';
import instrumentoPersistence from '../persistence/instrumentoPersistence';
import Instrumento from '../models/Instrumento';
import { updateIfDiff } from '../utils/utils';

const instrumentoRouter = express.Router();

// Selecionar todos os instrumentos
instrumentoRouter.get('/instrumentos', async (req, res) => {
    try {
        const allInstrumentos = await instrumentoPersistence.selectAllInstrumentos();
        res.json(allInstrumentos);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Selecionar um instrumento específico
instrumentoRouter.get('/instrumentos/:cdInstr', async (req, res) => {
    try {
        const cdInstr = parseInt(req.params.cdInstr);
        const instrumento = await instrumentoPersistence.selectInstrumento(cdInstr);
        res.json(instrumento);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Inserir um novo instrumento
instrumentoRouter.post('/instrumentos', async (req, res) => {
    try {
        const instrumentoData = req.body;
        const newInstrumento = new Instrumento();

        newInstrumento.cdEstudio = instrumentoData.cdEstudio;
        newInstrumento.nmInstrumento = instrumentoData.nmInstr;
        newInstrumento.tipoInstrumento = instrumentoData.tipInstr;
        newInstrumento.nmMarca = instrumentoData.nmMarca;

        const cdInstr = await instrumentoPersistence.insertInstrumento(newInstrumento);

        res.status(201).json({ cdInstr });
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Atualizar um instrumento existente
instrumentoRouter.put('/instrumentos/:cdInstr', async (req, res) => {
    try {
        const cdInstr = parseInt(req.params.cdInstr);
        const updtData = req.body;
        const instrumentoOrig = await instrumentoPersistence.selectInstrumento(cdInstr);
        const instrumentoUpdt = _.cloneDeep(instrumentoOrig);

        instrumentoUpdt.cdEstudio = updateIfDiff(instrumentoUpdt.cdEstudio, updtData.cdEstudio);
        instrumentoUpdt.nmInstrumento = updateIfDiff(
            instrumentoUpdt.nmInstrumento,
            updtData.nmInstr,
        );
        instrumentoUpdt.tipoInstrumento = updateIfDiff(
            instrumentoUpdt.tipoInstrumento,
            updtData.tipInstr,
        );
        instrumentoUpdt.nmMarca = updateIfDiff(instrumentoUpdt.nmMarca, updtData.nmMarca);

        const message = await instrumentoPersistence.updateInstrumento(instrumentoUpdt);

        res.send(message);
    } catch (err) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Deletar um instrumento
instrumentoRouter.delete('/instrumentos/:cdInstr', async (req, res) => {
    try {
        const cdInstr = parseInt(req.params.cdInstr);
        const message = await instrumentoPersistence.deleteInstrumento(cdInstr);
        res.send(message);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

export default instrumentoRouter;
