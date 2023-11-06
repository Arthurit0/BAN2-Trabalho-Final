import express from 'express';
import _ from 'lodash';
import produtorPersistence from '../persistence/produtorPersistence';
import Produtor from '../models/Produtor';

const produtorRouter = express.Router();

// Função utilitária para atualizar se os valores são diferentes
function updtIfDiff(orig: any, updt: any) {
    return updt && orig !== updt ? updt : orig;
}

// Selecionar todos os produtores
produtorRouter.get('/produtores', async (req, res) => {
    try {
        const allProdutores = await produtorPersistence.selectAllProdutores();
        res.json(allProdutores);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Selecionar um produtor específico
produtorRouter.get('/produtores/:cdProdutor', async (req, res) => {
    try {
        const cdProdutor = parseInt(req.params.cdProdutor);
        const produtor = await produtorPersistence.selectProdutor(cdProdutor);
        res.json(produtor);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Inserir um novo produtor
produtorRouter.post('/produtores', async (req, res) => {
    try {
        const produtorData = req.body;
        const newProdutor = new Produtor();
        newProdutor.cdEndereco = produtorData.cdEndereco;
        newProdutor.nmProdutor = produtorData.nmProdutor;
        newProdutor.nmEmpresa = produtorData.nmEmpresa;

        const cdProdutor = await produtorPersistence.insertProdutor(newProdutor);

        res.status(201).json({ cdProdutor });
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Atualizar um produtor existente
produtorRouter.put('/produtores/:cdProdutor', async (req, res) => {
    try {
        const cdProdutor = parseInt(req.params.cdProdutor);
        const updtData = req.body;
        const produtorOrig = await produtorPersistence.selectProdutor(cdProdutor);
        const produtorUpdt = _.cloneDeep(produtorOrig);

        produtorUpdt.cdEndereco = updtIfDiff(produtorUpdt.cdEndereco, updtData.cdEndereco);
        produtorUpdt.nmProdutor = updtIfDiff(produtorUpdt.nmProdutor, updtData.nmProdutor);
        produtorUpdt.nmEmpresa = updtIfDiff(produtorUpdt.nmEmpresa, updtData.nmEmpresa);

        console.log('teste');

        const message = await produtorPersistence.updateProdutor(produtorUpdt);

        res.send(message);
    } catch (err) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Deletar um produtor
produtorRouter.delete('/produtores/:cdProdutor', async (req, res) => {
    try {
        const cdProdutor = parseInt(req.params.cdProdutor);
        const message = await produtorPersistence.deleteProdutor(cdProdutor);
        res.send(message);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

export default produtorRouter;
