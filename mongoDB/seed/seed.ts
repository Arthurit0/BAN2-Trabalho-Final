import { AutorModel, MusicoModel, BandaModel, MusicosInBandaModel } from '../src/models/Autor';
import { EnderecoModel } from '../src/models/Endereco';
import { AutoresInMusicaModel, MusicaModel } from '../src/models/Musica';
import { EstudioModel } from '../src/models/Estudio';
import { InstrumentoModel, InstrumentosByMusicoModel } from '../src/models/Instrumento';
import { DiscoModel, MusicasInDiscoModel } from '../src/models/Disco';

export default async function seedDB() {
    try {
        await AutorModel.deleteMany({});
        await MusicoModel.deleteMany({});
        await BandaModel.deleteMany({});
        await EnderecoModel.deleteMany({});
        await MusicaModel.deleteMany({});
        await EstudioModel.deleteMany({});
        await DiscoModel.deleteMany({});
        await InstrumentoModel.deleteMany({});

        await MusicosInBandaModel.deleteMany({});
        await AutoresInMusicaModel.deleteMany({});
        await MusicasInDiscoModel.deleteMany({});
        await InstrumentosByMusicoModel.deleteMany({});

        const endereco1 = await EnderecoModel.create({
            nmRua: 'Rua A',
            nrCasa: 10,
            nmBairro: 'Bairro X',
            nmCidade: 'Cidade Y',
            nmEstado: 'Estado Z',
            nmPais: 'País W',
            dsTelefone: '12345678',
        });

        const endereco2 = await EnderecoModel.create({
            nmRua: 'Avenida B',
            nrCasa: 20,
            nmBairro: 'Bairro X',
            nmCidade: 'Cidade F',
            nmEstado: 'Estado Z',
            nmPais: 'País W',
            dsTelefone: '23456789',
        });

        const endereco3 = await EnderecoModel.create({
            nmRua: 'Travessa C',
            nrCasa: 30,
            nmBairro: 'Bairro H',
            nmCidade: 'Cidade F',
            nmEstado: 'Estado Z',
            nmPais: 'País W',
            dsTelefone: '34567890',
        });

        const endereco4 = await EnderecoModel.create({
            nmRua: 'Alameda D',
            nrCasa: 40,
            nmBairro: 'Bairro K',
            nmCidade: 'Cidade F',
            nmEstado: 'Estado Z',
            nmPais: 'País W',
            dsTelefone: '45678901',
        });

        const endereco5 = await EnderecoModel.create({
            nmRua: 'Alameda F',
            nrCasa: 23,
            nmBairro: 'Bairro E',
            nmCidade: 'Cidade H',
            nmEstado: 'Estado N',
            nmPais: 'País O',
            dsTelefone: '45678901',
        });

        const endereco6 = await EnderecoModel.create({
            nmRua: 'Rua F',
            nrCasa: 789,
            nmBairro: 'Bairro OO',
            nmCidade: 'Cidade MM',
            nmEstado: 'Estado GG',
            nmPais: 'País ZZZ',
            dsTelefone: '45678901',
        });

        const endereco7 = await EnderecoModel.create({
            nmRua: 'Rua 321',
            nrCasa: 999,
            nmBairro: 'Bairro T',
            nmCidade: 'Cidade E',
            nmEstado: 'Estado S',
            nmPais: 'País T',
            dsTelefone: '45678901',
        });

        const autor1 = await AutorModel.create({});
        const autor2 = await AutorModel.create({});
        const autor3 = await AutorModel.create({});
        const autor4 = await AutorModel.create({});

        const musico1 = await MusicoModel.create({
            cdEndereco: endereco1._id,
            cdAutor: autor1._id,
            nmMusico: 'Músico A',
            nmArtistico: 'Artista A',
        });

        const musico2 = await MusicoModel.create({
            cdEndereco: endereco2._id,
            cdAutor: autor2._id,
            nmMusico: 'Músico B',
            nmArtistico: 'Artista B',
        });

        const musico3 = await MusicoModel.create({
            cdEndereco: endereco3._id,
            cdAutor: autor3._id,
            nmMusico: 'Músico C',
            nmArtistico: 'Artista C',
        });

        const musico4 = await MusicoModel.create({
            cdEndereco: endereco3._id,
            cdAutor: autor4._id,
            nmMusico: 'Músico D',
            nmArtistico: 'Artista D',
        });

        const autor5 = await AutorModel.create({});
        const autor6 = await AutorModel.create({});
        const autor7 = await AutorModel.create({});
        const autor8 = await AutorModel.create({});

        const banda1 = await BandaModel.create({
            cdAutor: autor5._id,
            nmBanda: 'Banda E',
            dtFormacao: '2000-01-01',
        });

        const banda2 = await BandaModel.create({
            cdAutor: autor6._id,
            nmBanda: 'Banda F',
            dtFormacao: '2001-02-02',
        });

        const banda3 = await BandaModel.create({
            cdAutor: autor7._id,
            nmBanda: 'Banda G',
            dtFormacao: '2002-03-03',
        });

        const banda4 = await BandaModel.create({
            cdAutor: autor8._id,
            nmBanda: 'Banda H',
            dtFormacao: '2003-04-04',
        });

        await MusicosInBandaModel.create([
            {
                nrReg: musico1._id,
                cdBanda: banda1._id,
            },
            {
                nrReg: musico2._id,
                cdBanda: banda2._id,
            },
            {
                nrReg: musico3._id,
                cdBanda: banda4._id,
            },
            {
                nrReg: musico4._id,
                cdBanda: banda4._id,
            },
        ]);

        const musica1 = await MusicaModel.create({
            dsTitulo: 'Música I',
            dsGenero: 'Rock',
            tpDuracao: 210,
            fmtArquivo: 'mp3',
        });

        const musica2 = await MusicaModel.create({
            dsTitulo: 'Música J',
            dsGenero: 'Pop',
            tpDuracao: 220,
            fmtArquivo: 'mp3',
        });

        const musica3 = await MusicaModel.create({
            dsTitulo: 'Música K',
            dsGenero: 'Jazz',
            tpDuracao: 230,
            fmtArquivo: 'wav',
        });

        const musica4 = await MusicaModel.create({
            dsTitulo: 'Música L',
            dsGenero: 'Clássico',
            tpDuracao: 240,
            fmtArquivo: 'wav',
        });

        await AutoresInMusicaModel.create([
            {
                cdAutor: musico1.cdAutor,
                cdMusica: musica1._id,
            },
            {
                cdAutor: musico2.cdAutor,
                cdMusica: musica2._id,
            },
            {
                cdAutor: musico1.cdAutor,
                cdMusica: musica3._id,
            },
            {
                cdAutor: banda3.cdAutor,
                cdMusica: musica3._id,
            },
            {
                cdAutor: banda4.cdAutor,
                cdMusica: musica4._id,
            },
        ]);

        const estudio1 = await EstudioModel.create({
            cdEndereco: endereco4._id,
            nmEstudio: 'Estúdio U',
        });

        const estudio2 = await EstudioModel.create({
            cdEndereco: endereco5._id,
            nmEstudio: 'Estúdio V',
        });

        const estudio3 = await EstudioModel.create({
            cdEndereco: endereco6._id,
            nmEstudio: 'Estúdio W',
        });

        const estudio4 = await EstudioModel.create({
            cdEndereco: endereco7._id,
            nmEstudio: 'Estúdio X',
        });

        const disco1 = await DiscoModel.create({
            cdAutor: autor1._id,
            cdLocalGravacao: estudio1._id,
            dtGravacao: '2022-01-01',
            dsTitulo: 'Triple A',
        });

        const disco2 = await DiscoModel.create({
            cdAutor: autor2._id,
            cdLocalGravacao: estudio2._id,
            dtGravacao: '2022-02-03',
            dsTitulo: 'Testão',
        });

        const disco3 = await DiscoModel.create({
            cdAutor: autor7._id,
            cdLocalGravacao: estudio4._id,
            dtGravacao: '2022-02-03',
            dsTitulo: 'Testada',
        });

        const disco4 = await DiscoModel.create({
            cdAutor: autor8._id,
            cdLocalGravacao: estudio4._id,
            dtGravacao: '2022-05-05',
            dsTitulo: 'Testada final!',
        });

        await MusicasInDiscoModel.create([
            {
                cdMusica: musica1._id,
                cdDisco: disco1._id,
            },
            {
                cdMusica: musica2._id,
                cdDisco: disco2._id,
            },
            {
                cdMusica: musica3._id,
                cdDisco: disco4._id,
            },
            {
                cdMusica: musica3._id,
                cdDisco: disco3._id,
            },
            {
                cdMusica: musica4._id,
                cdDisco: disco4._id,
            },
        ]);

        const instrumento1 = await InstrumentoModel.create({
            cdEstudio: estudio1._id,
            nmInstrumento: 'Guitarra',
            tipoInstrumento: 'Corda',
            nmMarca: 'Fender',
        });

        const instrumento2 = await InstrumentoModel.create({
            cdEstudio: estudio2._id,
            nmInstrumento: 'Baixo',
            tipoInstrumento: 'Corda',
            nmMarca: 'Gibson',
        });

        const instrumento3 = await InstrumentoModel.create({
            cdEstudio: estudio3._id,
            nmInstrumento: 'Bateria',
            tipoInstrumento: 'Percussão',
            nmMarca: 'Yamaha',
        });

        const instrumento4 = await InstrumentoModel.create({
            cdEstudio: estudio4._id,
            nmInstrumento: 'Teclado',
            tipoInstrumento: 'Percussão',
            nmMarca: 'Roland',
        });

        await InstrumentosByMusicoModel.create([
            {
                nrReg: musico1._id,
                cdInstrumento: instrumento1._id,
                dtUso: '2023-07-07',
            },
            {
                nrReg: musico2._id,
                cdInstrumento: instrumento2._id,
                dtUso: '2023-07-08',
            },
            {
                nrReg: musico4._id,
                cdInstrumento: instrumento1._id,
                dtUso: '2023-07-07',
            },
            {
                nrReg: musico3._id,
                cdInstrumento: instrumento3._id,
                dtUso: '2023-07-07',
            },
            {
                nrReg: musico3._id,
                cdInstrumento: instrumento4._id,
                dtUso: '2023-07-07',
            },
        ]);
    } catch (err) {
        console.error('Erro ao popular o banco de dados:', err);
    }
}
