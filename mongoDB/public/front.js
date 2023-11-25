document.addEventListener('DOMContentLoaded', function () {
    // Visibilidade Seções
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sections = document.querySelectorAll('section');
            sections.forEach((section) => (section.style.display = 'none'));
            const targetId = this.getAttribute('href').substring(1);

            const section = document.getElementById(targetId);
            section.style.display = 'block';

            // Verifica qual aba foi clicada e chama a função de fetch correspondente

            switch (targetId) {
                case 'autores':
                    fetchAutores();
                    break;

                case 'musico':
                    fetchMusicos();
                    break;

                case 'bandas':
                    fetchBandas();
                    break;

                case 'musica':
                    fetchMusicas();
                    break;

                case 'estudio':
                    fetchEstudios();
                    break;

                case 'disco':
                    fetchDiscos();
                    break;

                case 'instrumento':
                    fetchInstrumentos();
                    break;

                case 'endereco':
                    fetchEnderecos();
                    break;

                default:
                    break;
            }
        });
    });

    // Toogle Forms
    const toggleFormButtons = document.querySelectorAll('.toggleForm');
    toggleFormButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const formId = this.dataset.form;
            const form = document.getElementById(formId);
            form.classList.toggle('hidden');
            this.textContent = form.classList.contains('hidden')
                ? 'Mostrar Formulário'
                : 'Ocultar Formulário';
        });
    });

    // Abas
    function showTab(sectionName, tabName) {
        const tabs = document.querySelectorAll(`${sectionName} .tabcontent`);
        tabs.forEach((tab) => (tab.style.display = 'none'));

        const activeTab = document.querySelector(`${sectionName} #${tabName}`);
        if (activeTab) {
            activeTab.style.display = 'block';
        }
    }

    // Abas carregadas ao clicar nas seções
    showTab('#autor', 'autores');
    fetchAutores();
    showTab('#musica', 'musicas');
    fetchMusicas();
    showTab('#disco', 'discos');
    fetchDiscos();
    fetchAutoresParaSelecao();
    fetchEstudiosParaSelecao();
    showTab('#instrumento', 'instrumentos');
    fetchInstrumentos();

    // Funções ao abrir aba:
    document.getElementById('botao-autores').addEventListener('click', () => {
        showTab('#autor', 'autores');
        fetchAutores();
    });

    document.getElementById('botao-musico').addEventListener('click', () => {
        showTab('#autor', 'musico');
        fetchMusicos();
        fetchEnderecosParaSelecao();
    });

    document.getElementById('botao-banda').addEventListener('click', () => {
        showTab('#autor', 'banda');
        fetchBandas();
    });

    document.getElementById('botao-musicos-in-banda').addEventListener('click', () => {
        showTab('#autor', 'musicos-in-banda');
        fetchMusicosInBanda();
        fetchMusicosParaSelecao();
        fetchBandasParaSelecao();
    });

    document.getElementById('botao-musicas').addEventListener('click', () => {
        showTab('#musica', 'musicas');
        fetchMusicas();
    });

    document.getElementById('botao-autores-in-musica').addEventListener('click', () => {
        showTab('#musica', 'autores-in-musica');
        fetchAutoresInMusicas();
        fetchAutoresParaSelecao();
        fetchMusicasParaSelecao();
    });

    document.getElementById('botao-discos').addEventListener('click', () => {
        showTab('#disco', 'discos');
        fetchDiscos();
        fetchAutoresParaSelecao();
        fetchEstudiosParaSelecao();
    });

    document.getElementById('botao-musicas-in-disco').addEventListener('click', () => {
        showTab('#disco', 'musicas-in-disco');
        fetchMusicasInDiscos();
        fetchMusicasParaSelecao();
        fetchDiscosParaSelecao();
    });

    document.getElementById('botao-instrumentos').addEventListener('click', () => {
        showTab('#instrumento', 'instrumentos');
        fetchInstrumentos();
    });

    document.getElementById('botao-instrumento-by-musico').addEventListener('click', () => {
        showTab('#instrumento', 'instrumento-by-musico');
        fetchInstrumentosByMusico();
        fetchMusicosParaSelecao();
        fetchInstrumentosParaSelecao();
    });

    // Puxando formulários para os listeners dos submits:
    const musicoForm = document.getElementById('musicoForm');
    const bandaForm = document.getElementById('bandaForm');
    const discoForm = document.getElementById('discoForm');
    const enderecoForm = document.getElementById('enderecoForm');
    const instrumentoForm = document.getElementById('instrumentoForm');
    const musicaForm = document.getElementById('musicaForm');
    const estudioForm = document.getElementById('estudioForm');

    const musicosInBandaForm = document.getElementById('musicosInBandaForm');
    const autoresInMusicaForm = document.getElementById('autoresInMusicaForm');
    const musicasInDiscoForm = document.getElementById('musicasInDiscoForm');
    const instrumentosByMusicoForm = document.getElementById('instrumentosByMusicoForm');

    // Listeners para submit de cada formulário:

    // Musicos
    musicoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(musicoForm);

        const dadosMusico = {
            cdEndereco: formData.get('enderecoMusico'),
            nmMusico: formData.get('nmMusico'),
            nmArtistico: formData.get('nmArtistico'),
        };

        enviarMusico(dadosMusico);
    });

    // Bandas
    bandaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(bandaForm);

        const dadosBanda = {
            nmBanda: formData.get('nmBanda'),
            dtFormacao: formData.get('dtFormacao'),
        };

        enviarBanda(dadosBanda);
    });

    // MusicosInBanda
    musicosInBandaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(musicosInBandaForm);

        const dadosMusicoInBanda = {
            nrReg: formData.get('musicoInBanda'),
            cdBanda: formData.get('bandaForMusico'),
        };

        enviarMusicoInBanda(dadosMusicoInBanda);
    });

    // Musicas
    musicaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(musicaForm);

        const dadosMusica = {
            dsTitulo: formData.get('dsTitulo'),
            dsGenero: formData.get('dsGenero'),
            tpDuracao: formData.get('tpDuracao'),
            fmtArquivo: formData.get('fmtArquivo'),
        };

        enviarMusica(dadosMusica);
    });

    // AutoresInMusica
    autoresInMusicaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(autoresInMusicaForm);

        const dadosAutorInMusica = {
            cdAutor: formData.get('autorInMusica'),
            cdMusica: formData.get('musicaWithAutor'),
        };

        enviarAutorInMusica(dadosAutorInMusica);
    });

    // Estudios
    estudioForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(estudioForm);

        const dadosEstudio = {
            cdEndereco: formData.get('enderecoEstudio'),
            nmEstudio: formData.get('nmEstudio'),
        };

        enviarEstudio(dadosEstudio);
    });

    // Discos
    discoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(discoForm);

        const dadosDisco = {
            cdAutor: formData.get('autorDisco'),
            cdLocalGravacao: formData.get('estudioDisco'),
            dtGravacao: formData.get('dtGravacao'),
            dsTitulo: formData.get('dsTituloDisco'),
        };

        enviarDisco(dadosDisco);
    });

    // MusicasInDisco
    musicasInDiscoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(musicasInDiscoForm);

        const dadosMusicaInDisco = {
            cdMusica: formData.get('musicaInDisco'),
            cdDisco: formData.get('discoForMusica'),
        };

        enviarMusicaInDisco(dadosMusicaInDisco);
    });

    // Instrumentos
    instrumentoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(instrumentoForm);

        const dadosInstrumento = {
            cdEstudio: formData.get('estudioInstrumento'),
            nmInstr: formData.get('nmInstrumento'),
            tipInstr: formData.get('tipoInstrumento'),
            nmMarca: formData.get('nmMarca'),
        };

        enviarInstrumento(dadosInstrumento);
    });

    // InstrumentosByMusico
    instrumentosByMusicoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(instrumentosByMusicoForm);

        const dadosInstrumentoByMusico = {
            nrReg: formData.get('musicoForInstrumento'),
            cdInstrumento: formData.get('instrumentoByMusico'),
            dtUso: formData.get('dtUsoInstrumentoByMusico'),
        };

        enviarInstrumentoByMusico(dadosInstrumentoByMusico);
    });
    // Enderecos
    enderecoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(enderecoForm);

        const dadosEndereco = {
            nmRua: formData.get('nmRua'),
            nrCasa: formData.get('nrCasa'),
            nmBairro: formData.get('nmBairro'),
            nmCidade: formData.get('nmCidade'),
            nmEstado: formData.get('nmEstado'),
            nmPais: formData.get('nmPais'),
            dsTelefone: formData.get('dsTelefoneEstudio'),
        };

        enviarEndereco(dadosEndereco);
    });
});

function fetchMusicos() {
    axios
        .get('http://localhost:8080/musicos')
        .then((response) => response.data)
        .then((musicos) => {
            const tabela = document.getElementById('tabela-musicos');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Nm. Músico', 'Nm. Artístico', 'Cd. Endereço'];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            musicos.forEach((musico) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = musico._nrReg;
                linha.insertCell(1).textContent = musico._nmMusico;
                linha.insertCell(2).textContent = musico._nmArtistico;
                linha.insertCell(3).textContent = musico._cdEndereco;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchBandas() {
    axios
        .get('http://localhost:8080/bandas')
        .then((response) => response.data)
        .then((bandas) => {
            const tabela = document.getElementById('tabela-bandas');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Nm. Banda', 'Dt. Formação'];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            bandas.forEach((banda) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = banda._cdBanda;
                linha.insertCell(1).textContent = banda._nmBanda;
                linha.insertCell(2).textContent = banda._dtFormacao;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchAutores() {
    axios
        .get('http://localhost:8080/autores')
        .then((response) => response.data)
        .then((autores) => {
            const tabela = document.getElementById('tabela-autores');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código Autor', 'Nm. Artista'];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            autores.forEach((autor) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = autor.cd_autor;
                linha.insertCell(1).textContent = autor.nm_autor;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchMusicosInBanda() {
    axios
        .get('http://localhost:8080/musicos-in-banda')
        .then((response) => response.data)
        .then((musicosInBandas) => {
            const tabela = document.getElementById('tabela-musicos-in-banda');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Músico', 'Banda'];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            musicosInBandas.forEach((musicoInBanda) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent =
                    musicoInBanda.nm_artistico || musicoInBanda.nm_musico;
                linha.insertCell(1).textContent = musicoInBanda.nm_banda;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchMusicas() {
    axios
        .get('http://localhost:8080/musicas')
        .then((response) => response.data)
        .then((musicas) => {
            const tabela = document.getElementById('tabela-musicas');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Título', 'Gênero', 'Duração (seg)', 'Formato Arquivo'];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            musicas.forEach((musica) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = musica._cdMusica;
                linha.insertCell(1).textContent = musica._dsTitulo;
                linha.insertCell(2).textContent = musica._dsGenero;
                linha.insertCell(3).textContent = musica._tpDuracao;
                linha.insertCell(4).textContent = musica._fmtArquivo;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchAutoresInMusicas() {
    axios
        .get('http://localhost:8080/autores-in-musica')
        .then((response) => response.data)
        .then((autoresInMusicas) => {
            const tabela = document.getElementById('tabela-autores-in-musica');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Autor', 'Música'];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            autoresInMusicas.forEach((autorInMusica) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = autorInMusica.nm_autor;
                linha.insertCell(1).textContent = autorInMusica.ds_titulo;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchEstudios() {
    axios
        .get('http://localhost:8080/estudios')
        .then((response) => response.data)
        .then((estudios) => {
            const tabela = document.getElementById('tabela-estudios');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Cd. Endereço', 'Nome Estúdio'];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            estudios.forEach((estudio) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = estudio._cdEstudio;
                linha.insertCell(1).textContent = estudio._cdEndereco;
                linha.insertCell(2).textContent = estudio._nmEstudio;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchDiscos() {
    axios
        .get('http://localhost:8080/discos')
        .then((response) => response.data)
        .then((discos) => {
            const tabela = document.getElementById('tabela-discos');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Autor', 'Local Gravação', 'Dt. Gravação', 'Título'];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            discos.forEach((disco) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = disco._cdDisco;
                linha.insertCell(1).textContent = disco._cdAutor;
                linha.insertCell(2).textContent = disco._cdLocalGravacao;
                linha.insertCell(3).textContent = disco._dtGravacao;
                linha.insertCell(4).textContent = disco._dsTitulo;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchMusicasInDiscos() {
    axios
        .get('http://localhost:8080/musicas-in-disco')
        .then((response) => response.data)
        .then((musicasInDiscos) => {
            const tabela = document.getElementById('tabela-musicas-in-disco');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Música', 'Disco'];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            musicasInDiscos.forEach((musicaInDisco) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = musicaInDisco.ds_titulo_musica;
                linha.insertCell(1).textContent = musicaInDisco.ds_titulo_disco;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchInstrumentos() {
    axios
        .get('http://localhost:8080/instrumentos')
        .then((response) => response.data)
        .then((instrumentos) => {
            const tabela = document.getElementById('tabela-instrumentos');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Cd. Estúdio', 'Instrumento', 'Tipo', 'Marca'];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            instrumentos.forEach((instrumento) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = instrumento._cdInstrumento;
                linha.insertCell(1).textContent = instrumento._cdEstudio;
                linha.insertCell(2).textContent = instrumento._nmInstrumento;
                linha.insertCell(3).textContent = instrumento._tipoInstrumento;
                linha.insertCell(4).textContent = instrumento._nmMarca;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchInstrumentosByMusico() {
    axios
        .get('http://localhost:8080/instrumento-by-musico')
        .then((response) => response.data)
        .then((instrumentosByMusicos) => {
            const tabela = document.getElementById('tabela-instrumento-by-musico');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Músico', 'Cod. Instrumento', 'Instrumento', 'Data de Uso'];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            instrumentosByMusicos.forEach((instrumentoByMusico) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent =
                    instrumentoByMusico.nm_artistico || instrumentoByMusico.nm_musico;
                linha.insertCell(1).textContent = instrumentoByMusico.cd_instrumento;
                linha.insertCell(2).textContent = instrumentoByMusico.nm_instrumento;
                linha.insertCell(3).textContent = instrumentoByMusico.dt_uso;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchEnderecos() {
    axios
        .get('http://localhost:8080/enderecos')
        .then((response) => response.data)
        .then((enderecos) => {
            const tabela = document.getElementById('tabela-enderecos');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = [
                'Código',
                'Rua',
                'Número',
                'Bairro',
                'Cidade',
                'Estado',
                'País',
                'Telefone',
            ];

            headers.forEach((text) => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            enderecos.forEach((endereco) => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = endereco._cdEndereco;
                linha.insertCell(1).textContent = endereco._nmRua;
                linha.insertCell(2).textContent = endereco._nrCasa;
                linha.insertCell(3).textContent = endereco._nmBairro;
                linha.insertCell(4).textContent = endereco._nmCidade;
                linha.insertCell(5).textContent = endereco._nmEstado;
                linha.insertCell(6).textContent = endereco._nmPais;
                linha.insertCell(7).textContent = endereco._dsTelefone;
            });
        })
        .catch((err) => console.error(err.response.data));
}

function enviarMusico(dadosMusico) {
    axios
        .post('http://localhost:8080/musicos', dadosMusico)
        .then(() => {
            fetchMusicos();
        })
        .catch((err) => {
            console.error(err.response.data);
        });
}

function enviarBanda(dadosBanda) {
    axios
        .post('http://localhost:8080/bandas', dadosBanda)
        .then(() => {
            fetchBandas();
        })
        .catch((err) => {
            console.error(err.response.data);
        });
}

function enviarMusicoInBanda(dadosMusicoInBanda) {
    axios
        .post('http://localhost:8080/musico-in-banda/', dadosMusicoInBanda)
        .then(() => {
            fetchMusicosInBanda();
        })
        .catch((err) => {
            console.error(err.response.data);
        });
}

function enviarMusica(dadosMusica) {
    axios
        .post('http://localhost:8080/musicas', dadosMusica)
        .then(() => {
            fetchMusicas();
        })
        .catch((err) => {
            console.error(err.response.data);
        });
}

function enviarAutorInMusica(dadosAutorInMusica) {
    axios
        .post('http://localhost:8080/autor-in-musica/', dadosAutorInMusica)
        .then(() => {
            fetchAutoresInMusicas();
        })
        .catch((err) => {
            console.error(err.response.data);
        });
}

function enviarEstudio(dadosEstudio) {
    axios
        .post('http://localhost:8080/estudios', dadosEstudio)
        .then(() => {
            fetchEstudios();
        })
        .catch((err) => {
            console.error(err.response.data);
        });
}

function enviarDisco(dadosDisco) {
    axios
        .post('http://localhost:8080/discos', dadosDisco)
        .then(() => {
            fetchDiscos();
        })
        .catch((err) => {
            console.error(err.response.data);
        });
}

function enviarMusicaInDisco(dadosMusicaInDisco) {
    axios
        .post('http://localhost:8080/musicas-in-disco/', dadosMusicaInDisco)
        .then(() => {
            fetchMusicasInDiscos();
        })
        .catch((err) => {
            console.error(err.response.data);
        });
}

function enviarInstrumento(dadosInstrumento) {
    axios
        .post('http://localhost:8080/instrumentos', dadosInstrumento)
        .then(() => {
            fetchInstrumentos();
        })
        .catch((err) => {
            console.error(err.response.data);
        });
}

function enviarInstrumentoByMusico(dadosInstrumentoByMusico) {
    axios
        .post('http://localhost:8080/instrumento-by-musico', dadosInstrumentoByMusico)
        .then(() => {
            fetchInstrumentosByMusico();
        })
        .catch((err) => {
            console.error(err.response.data);
        });
}

function enviarEndereco(dadosEndereco) {
    axios
        .post('http://localhost:8080/enderecos', dadosEndereco)
        .then(() => {
            fetchEnderecos();
        })
        .catch((err) => {
            console.error(err.response.data);
        });
}

function fetchAutoresParaSelecao() {
    axios
        .get('http://localhost:8080/autores')
        .then((response) => response.data)
        .then((autores) => {
            const allSelects = document.querySelectorAll('.selectAutor');

            allSelects.forEach((selectAutor) => {
                selectAutor.innerHTML = '';

                autores.forEach((autor) => {
                    const option = document.createElement('option');
                    option.value = autor.cd_autor;
                    option.textContent = autor.nm_autor;
                    selectAutor.appendChild(option);
                });
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchMusicosParaSelecao() {
    axios
        .get('http://localhost:8080/musicos')
        .then((response) => response.data)
        .then((musicos) => {
            const allSelects = document.querySelectorAll('.selectMusico');

            allSelects.forEach((selectMusico) => {
                selectMusico.innerHTML = '';

                musicos.forEach((musico) => {
                    const option = document.createElement('option');
                    option.value = musico._nrReg;
                    option.textContent = musico._nmArtistico || musico._nmMusico;
                    selectMusico.appendChild(option);
                });
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchBandasParaSelecao() {
    axios
        .get('http://localhost:8080/bandas')
        .then((response) => response.data)
        .then((bandas) => {
            const allSelects = document.querySelectorAll('.selectBanda');

            allSelects.forEach((selectBanda) => {
                selectBanda.innerHTML = '';

                bandas.forEach((banda) => {
                    const option = document.createElement('option');
                    option.value = banda._cdBanda;
                    option.textContent = banda._nmBanda;
                    selectBanda.appendChild(option);
                });
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchMusicasParaSelecao() {
    axios
        .get('http://localhost:8080/musicas')
        .then((response) => response.data)
        .then((musicas) => {
            const allSelects = document.querySelectorAll('.selectMusica');

            allSelects.forEach((selectMusica) => {
                selectMusica.innerHTML = '';

                musicas.forEach((musica) => {
                    const option = document.createElement('option');
                    option.value = musica._cdMusica;
                    option.textContent = musica._dsTitulo;
                    selectMusica.appendChild(option);
                });
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchEstudiosParaSelecao() {
    axios
        .get('http://localhost:8080/estudios')
        .then((response) => response.data)
        .then((estudios) => {
            const allSelects = document.querySelectorAll('.selectEstudio');

            allSelects.forEach((selectEstudio) => {
                selectEstudio.innerHTML = '';

                estudios.forEach((estudio) => {
                    const option = document.createElement('option');
                    option.value = estudio._cdEstudio;
                    option.textContent = estudio._nmEstudio;
                    selectEstudio.appendChild(option);
                });
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchEnderecosParaSelecao() {
    axios
        .get('http://localhost:8080/enderecos')
        .then((response) => response.data)
        .then((enderecos) => {
            const allSelects = document.querySelectorAll('.selectEndereco');

            allSelects.forEach((selectEndereco) => {
                selectEndereco.innerHTML = '';

                enderecos.forEach((endereco) => {
                    const option = document.createElement('option');
                    option.value = endereco._cdEndereco;
                    option.textContent = `${endereco._nmRua}, ${endereco._nrCasa} - ${endereco._nmCidade}, ${endereco._nmEstado} - ${endereco._nmPais}`;
                    selectEndereco.appendChild(option);
                });
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchDiscosParaSelecao() {
    axios
        .get('http://localhost:8080/discos')
        .then((response) => response.data)
        .then((discos) => {
            const allSelects = document.querySelectorAll('.selectDisco');

            allSelects.forEach((selectDisco) => {
                selectDisco.innerHTML = '';

                discos.forEach((disco) => {
                    const option = document.createElement('option');
                    option.value = disco._cdDisco;
                    option.textContent = disco._dsTitulo;
                    selectDisco.appendChild(option);
                });
            });
        })
        .catch((err) => console.error(err.response.data));
}

function fetchInstrumentosParaSelecao() {
    axios
        .get('http://localhost:8080/instrumentos')
        .then((response) => response.data)
        .then((instrumentos) => {
            const allSelects = document.querySelectorAll('.selectInstrumento');

            allSelects.forEach((selectInstrumento) => {
                selectInstrumento.innerHTML = '';

                instrumentos.forEach((instrumento) => {
                    const option = document.createElement('option');
                    option.value = instrumento._cdInstrumento;
                    option.textContent = `${instrumento._nmInstrumento} - ${instrumento._nmMarca}`;
                    selectInstrumento.appendChild(option);
                });
            });
        })
        .catch((err) => console.error(err.response.data));
}
