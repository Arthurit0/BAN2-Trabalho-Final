import express, { Request, Response } from 'express';
import _ from 'lodash';
import estudioPersistence from '../persistence/estudioPersistence';
import Estudio from '../models/Estudio';
import { updateIfDiff } from '../utils/utils';

const estudioRouter = express.Router();

// Selecionar todos os estúdios
estudioRouter.get('/estudios', async (req: Request, res: Response) => {
    try {
        const allEstudios = await estudioPersistence.selectAllEstudios();
        res.json(allEstudios);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Selecionar um estúdio específico
estudioRouter.get('/estudios/:cdEstudio', async (req: Request, res: Response) => {
    try {
        const cdEstudio = parseInt(req.params.cdEstudio);
        const estudio = await estudioPersistence.selectEstudio(cdEstudio);
        res.json(estudio);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Inserir um novo estúdio
estudioRouter.post('/estudios', async (req: Request, res: Response) => {
    try {
        const estudioData = req.body;
        const newEstudio = new Estudio();
        newEstudio.cdEndereco = estudioData.cdEndereco;
        newEstudio.nmEstudio = estudioData.nmEstudio;

        const cdEstudio = await estudioPersistence.insertEstudio(newEstudio);

        res.status(201).json({ cdEstudio });
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Atualizar um estúdio existente
estudioRouter.put('/estudios/:cdEstudio', async (req: Request, res: Response) => {
    try {
        const cdEstudio = parseInt(req.params.cdEstudio);
        const updtData = req.body;
        const estudioOrig = await estudioPersistence.selectEstudio(cdEstudio);
        const estudioUpdt = _.cloneDeep(estudioOrig);

        estudioUpdt.cdEndereco = updateIfDiff(estudioUpdt.cdEndereco, updtData.cdEndereco);
        estudioUpdt.nmEstudio = updateIfDiff(estudioUpdt.nmEstudio, updtData.nmEstudio);

        const message = await estudioPersistence.updateEstudio(estudioUpdt);

        res.send(message);
    } catch (err) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Deletar um estúdio
estudioRouter.delete('/estudios/:cdEstudio', async (req: Request, res: Response) => {
    try {
        const cdEstudio = parseInt(req.params.cdEstudio);
        const message = await estudioPersistence.deleteEstudio(cdEstudio);
        res.send(message);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

export default estudioRouter;
