import Endereco, { EnderecoModel } from '../models/Endereco';

export default class enderecoPersistence {
    public static async selectAllEnderecos() {
        const enderecosDocs = await EnderecoModel.find({}).catch((err) => {
            throw `Ocorreu um erro no select de endereços: \n\n${err}`;
        });

        const allEnderecos = enderecosDocs.map((endereco) => {
            return Endereco.fromMongoDb(endereco);
        });

        return allEnderecos;
    }

    public static async insertEndereco(endereco: Endereco) {
        const { nmRua, nrCasa, nmBairro, nmCidade, nmEstado, nmPais, dsTelefone } = endereco;

        const newEndereco = await EnderecoModel.create({
            nmRua,
            nrCasa,
            nmBairro,
            nmCidade,
            nmEstado,
            nmPais,
            dsTelefone,
        }).catch((err) => {
            throw `Ocorreu um erro na inserção do novo endereço: \n\n${err}`;
        });

        return newEndereco._id.toString();
    }
}
