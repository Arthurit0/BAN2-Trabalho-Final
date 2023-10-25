import express from 'express'

let port = 3000;

const app = express();

await app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});

// console.log(await enderecoModel.getAllEnderecos())
// console.log(await enderecoModel.getEndereco(4).then((res) => {
//     if (res.rows.length > 0) {
//         return res.rows[0]
//     }
// }))

