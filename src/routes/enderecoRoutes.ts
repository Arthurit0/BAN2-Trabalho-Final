import express from 'express';
import _ from 'lodash';
import enderecoPersistence from '../persistence/enderecoPersistence';
import Endereco from '../models/Endereco';
import { updateIfDiff } from '../utils/utils';

const enderecoRouter = express.Router();

// Selecionar todos os endereços
enderecoRouter.get('/enderecos', async (req, res) => {
    try {
        const allEnderecos = await enderecoPersistence.selectAllEnderecos();
        res.json(allEnderecos);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Selecionar um endereço específico
enderecoRouter.get('/enderecos/:cdEndereco', async (req, res) => {
    try {
        const cdEndereco = parseInt(req.params.cdEndereco);
        const endereco = await enderecoPersistence.selectEndereco(cdEndereco);
        res.json(endereco);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
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
        console.log(err);
        res.status(500).send(err);
    }
});

// Atualizar um endereço existente
enderecoRouter.put('/enderecos/:cdEndereco', async (req, res) => {
    try {
        const cdEndereco = parseInt(req.params.cdEndereco);
        const updtData = req.body;
        const enderecoOrig = await enderecoPersistence.selectEndereco(cdEndereco);
        const enderecoUpdt = _.cloneDeep(enderecoOrig);

        enderecoUpdt.nmRua = updateIfDiff(enderecoUpdt.nmRua, updtData.nmRua);
        enderecoUpdt.nrCasa = updateIfDiff(enderecoUpdt.nrCasa, updtData.nrCasa);
        enderecoUpdt.nmBairro = updateIfDiff(enderecoUpdt.nmBairro, updtData.nmBairro);
        enderecoUpdt.nmCidade = updateIfDiff(enderecoUpdt.nmCidade, updtData.nmCidade);
        enderecoUpdt.nmEstado = updateIfDiff(enderecoUpdt.nmEstado, updtData.nmEstado);
        enderecoUpdt.nmPais = updateIfDiff(enderecoUpdt.nmPais, updtData.nmPais);
        enderecoUpdt.dsTelefone = updateIfDiff(enderecoUpdt.dsTelefone, updtData.dsTelefone);

        const message = await enderecoPersistence.updateEndereco(enderecoUpdt);

        res.send(message);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Deletar um endereço
enderecoRouter.delete('/enderecos/:cdEndereco', async (req, res) => {
    try {
        const cdEndereco = parseInt(req.params.cdEndereco);
        const message = await enderecoPersistence.deleteEndereco(cdEndereco);
        res.send(message);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default enderecoRouter;
