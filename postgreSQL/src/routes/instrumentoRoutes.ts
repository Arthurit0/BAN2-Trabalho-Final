import express from 'express';
import _ from 'lodash';
import instrumentoPersistence from '../persistence/instrumentoPersistence';
import Instrumento from '../models/Instrumento';
import { updateIfDiff } from '../utils/utils';
import moment from 'moment';

const instrumentoRouter = express.Router();

// Selecionar todos os instrumentos
instrumentoRouter.get('/instrumentos', async (req, res) => {
    try {
        const allInstrumentos = await instrumentoPersistence.selectAllInstrumentos();
        res.json(allInstrumentos);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
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
        res.status(500).send(err);
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
        res.status(500).send(err);
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
        res.status(500).send(err);
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
        res.status(500).send(err);
    }
});

instrumentoRouter.get('/instrumento-by-musico', async (req, res) => {
    try {
        const instrumentosByMusico = await instrumentoPersistence.selectAllInstrumentosByMusico();

        // Tratamento de formato de data
        instrumentosByMusico.forEach((instrumentoByMusico) => {
            instrumentoByMusico.dt_uso = moment(instrumentoByMusico.dt_uso).format('DD/MM/YYYY');
        });

        res.json(instrumentosByMusico);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

instrumentoRouter.post('/instrumento-by-musico', async (req, res) => {
    try {
        const instrumentoByMusico = req.body;
        const { nrReg, cdInstrumento, dtUso } = instrumentoByMusico;

        const message = await instrumentoPersistence.assignInstrumentoByMusico(
            nrReg,
            cdInstrumento,
            dtUso,
        );

        res.send(message);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default instrumentoRouter;
