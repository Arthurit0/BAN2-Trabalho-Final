import express from 'express';
import Endereco from './models/Endereco';
import autorPersistence from './persistence/autorPersistence';

let port = 3000;

const app = express();

app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});

let musicoQrys = new autorPersistence();

let musicos = await musicoQrys.querySelectAllMusicos();

console.log(musicos);

// console.log(await enderecoModel.getAllEnderecos())
// console.log(await enderecoModel.getEndereco(4).then((res) => {
//     if (res.rows.length > 0) {
//         return res.rows[0]
//     }
// }))
