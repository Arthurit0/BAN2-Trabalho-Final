import express, { Request, Response } from 'express';
import _ from 'lodash';
import estudioPersistence from '../persistence/estudioPersistence';
import Estudio from '../models/Estudio';

const estudioRouter = express.Router();

estudioRouter.get('/estudios', async (req: Request, res: Response) => {
    try {
        const allEstudios = await estudioPersistence.selectAllEstudios();

        res.json(allEstudios);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

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
        res.status(500).send(err);
    }
});

estudioRouter.get('/estudios/:cdEstudio', async (req: Request, res: Response) => {});

estudioRouter.put('/estudios/:cdEstudio', async (req: Request, res: Response) => {});

estudioRouter.delete('/estudios/:cdEstudio', async (req: Request, res: Response) => {});

export default estudioRouter;
