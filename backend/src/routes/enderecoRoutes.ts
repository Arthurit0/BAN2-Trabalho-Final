import express from 'express';
import _ from 'lodash';
import enderecoPersistence from '../persistence/enderecoPersistence';
import Endereco from '../models/Endereco';

const enderecoRouter = express.Router();

// Função utilitária para atualizar se os valores são diferentes
function updtIfDiff(orig: any, updt: any) {
    return updt && orig !== updt ? updt : orig;
}

// Selecionar todos os endereços
enderecoRouter.get('/enderecos', async (req, res) => {
    try {
        const allEnderecos = await enderecoPersistence.selectAllEnderecos();
        res.json(allEnderecos);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Selecionar um endereço específico
enderecoRouter.get('/enderecos/:cdEndereco', async (req, res) => {
    try {
        const cdEndereco = parseInt(req.params.cdEndereco);
        const endereco = await enderecoPersistence.selectEndereco(cdEndereco);
        res.json(endereco);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Inserir um novo endereço
enderecoRouter.post('/enderecos', async (req, res) => {
    try {
        const enderecoData = req.body;
        const newEndereco = new Endereco();
        newEndereco.nmRua = enderecoData.nmRua;
        newEndereco.nrCasa = enderecoData.nrCasa;
        newEndereco.nmBairro = enderecoData.nmBairro;
        newEndereco.nmCidade = enderecoData.nmCidade;
        newEndereco.nmEstado = enderecoData.nmEstado;
        newEndereco.nmPais = enderecoData.nmPais;
        newEndereco.dsTelefone = enderecoData.dsTelefone;

        const cdEndereco = await enderecoPersistence.insertEndereco(newEndereco);

        res.status(201).json({ cdEndereco });
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Atualizar um endereço existente
enderecoRouter.put('/enderecos/:cdEndereco', async (req, res) => {
    try {
        const cdEndereco = parseInt(req.params.cdEndereco);
        const updtData = req.body;
        const enderecoOrig = await enderecoPersistence.selectEndereco(cdEndereco);
        const enderecoUpdt = _.cloneDeep(enderecoOrig);

        enderecoUpdt.nmRua = updtIfDiff(enderecoUpdt.nmRua, updtData.nmRua);
        enderecoUpdt.nrCasa = updtIfDiff(enderecoUpdt.nrCasa, updtData.nrCasa);
        enderecoUpdt.nmBairro = updtIfDiff(enderecoUpdt.nmBairro, updtData.nmBairro);
        enderecoUpdt.nmCidade = updtIfDiff(enderecoUpdt.nmCidade, updtData.nmCidade);
        enderecoUpdt.nmEstado = updtIfDiff(enderecoUpdt.nmEstado, updtData.nmEstado);
        enderecoUpdt.nmPais = updtIfDiff(enderecoUpdt.nmPais, updtData.nmPais);
        enderecoUpdt.dsTelefone = updtIfDiff(enderecoUpdt.dsTelefone, updtData.dsTelefone);

        const message = await enderecoPersistence.updateEndereco(enderecoUpdt);

        res.send(message);
    } catch (err) {
        res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
});

// Deletar um endereço
enderecoRouter.delete('/enderecos/:cdEndereco', async (req, res) => {
    try {
        const cdEndereco = parseInt(req.params.cdEndereco);
        const message = await enderecoPersistence.deleteEndereco(cdEndereco);
        res.send(message);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

export default enderecoRouter;
