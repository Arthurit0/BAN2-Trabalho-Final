import express from 'express';
import _ from 'lodash';
import instrumentoPersistence from '../persistence/instrumentoPersistence';
import Instrumento from '../models/Instrumento';

const instrumentoRouter = express.Router();

// Função utilitária para atualizar se os valores são diferentes
function updtIfDiff(orig: any, updt: any) {
    return updt && orig !== updt ? updt : orig;
}

// Selecionar todos os instrumentos
instrumentoRouter.get('/instrumentos', async (req, res) => {
    try {
        const allInstrumentos = await instrumentoPersistence.selectAllInstrumentos();
        res.json(allInstrumentos);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Selecionar um instrumento específico
instrumentoRouter.get('/instrumentos/:cdInstr', async (req, res) => {
    try {
        const cdInstr = parseInt(req.params.cdInstr);
        const instrumento = await instrumentoPersistence.selectInstrumento(cdInstr);
        res.json(instrumento);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Inserir um novo instrumento
instrumentoRouter.post('/instrumentos', async (req, res) => {
    try {
        const instrumentoData = req.body;
        const newInstrumento = new Instrumento();

        newInstrumento.cdEstudio = instrumentoData.cdEstudio;
        newInstrumento.nmInstr = instrumentoData.nmInstr;
        newInstrumento.tipInstr = instrumentoData.tipInstr;
        newInstrumento.nmMarca = instrumentoData.nmMarca;

        const cdInstr = await instrumentoPersistence.insertInstrumento(newInstrumento);

        res.status(201).json({ cdInstr });
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Atualizar um instrumento existente
instrumentoRouter.put('/instrumentos/:cdInstr', async (req, res) => {
    try {
        const cdInstr = parseInt(req.params.cdInstr);
        const updtData = req.body;
        const instrumentoOrig = await instrumentoPersistence.selectInstrumento(cdInstr);
        const instrumentoUpdt = _.cloneDeep(instrumentoOrig);

        instrumentoUpdt.cdEstudio = updtIfDiff(instrumentoUpdt.cdEstudio, updtData.cdEstudio);
        instrumentoUpdt.nmInstr = updtIfDiff(instrumentoUpdt.nmInstr, updtData.nmInstr);
        instrumentoUpdt.tipInstr = updtIfDiff(instrumentoUpdt.tipInstr, updtData.tipInstr);
        instrumentoUpdt.nmMarca = updtIfDiff(instrumentoUpdt.nmMarca, updtData.nmMarca);

        const message = await instrumentoPersistence.updateInstrumento(instrumentoUpdt);

        res.send(message);
    } catch (err) {
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
        res.status(500).send(err.message);
    }
});

export default instrumentoRouter;
