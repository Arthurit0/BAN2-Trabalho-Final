import express from 'express';
import Endereco from './models/Endereco';

let port = 3000;

const app = express();

app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});

let endereco = new Endereco(1, 'teste', 2, 'teste', 'teste', 'teste', 'teste', 'teste');

console.log(endereco.nrCasa);

// console.log(await enderecoModel.getAllEnderecos())
// console.log(await enderecoModel.getEndereco(4).then((res) => {
//     if (res.rows.length > 0) {
//         return res.rows[0]
//     }
// }))
