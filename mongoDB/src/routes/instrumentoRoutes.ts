import express from 'express';
import _ from 'lodash';
import instrumentoPersistence from '../persistence/instrumentoPersistence';
import Instrumento from '../models/Instrumento';

const instrumentoRouter = express.Router();

instrumentoRouter.get('/instrumentos', async (req, res) => {
    try {
        const allInstrumentos = await instrumentoPersistence.selectAllInstrumentos();
        res.json(allInstrumentos);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

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

instrumentoRouter.get('/instrumento-by-musico', async (req, res) => {
    try {
        const instrumentosByMusico = await instrumentoPersistence.selectAllInstrumentosByMusico();

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

instrumentoRouter.get('/instrumentos/:cdInstr', async (req, res) => {});

instrumentoRouter.put('/instrumentos/:cdInstr', async (req, res) => {});

instrumentoRouter.delete('/instrumentos/:cdInstr', async (req, res) => {});

export default instrumentoRouter;
