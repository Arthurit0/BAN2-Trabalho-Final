import express from 'express';
import _ from 'lodash';
import enderecoPersistence from '../persistence/enderecoPersistence';
import Endereco from '../models/Endereco';

const enderecoRouter = express.Router();

enderecoRouter.get('/enderecos', async (req, res) => {
    try {
        const allEnderecos = await enderecoPersistence.selectAllEnderecos();
        res.json(allEnderecos);
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err);
    }
});

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

enderecoRouter.get('/enderecos/:cdEndereco', async (req, res) => {});

enderecoRouter.put('/enderecos/:cdEndereco', async (req, res) => {});

enderecoRouter.delete('/enderecos/:cdEndereco', async (req, res) => {});

export default enderecoRouter;
