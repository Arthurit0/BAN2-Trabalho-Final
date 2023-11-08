document.addEventListener('DOMContentLoaded', function () {
    // Visibilidade Seções
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sections = document.querySelectorAll('section');
            sections.forEach(section => section.style.display = 'none');
            const targetId = this.getAttribute('href').substring(1);

            const section = document.getElementById(targetId);
            section.style.display = 'block';

            // Verifica qual aba foi clicada e chama a função de fetch correspondente
            if (targetId === 'autores') {
                fetchAutores();
            } else if (targetId === 'musico') {
                fetchMusicos();
            } else if (targetId === 'banda') {
                fetchBandas();
            } else if (targetId === 'musicos-in-banda') {
                fetchMusicosInBanda();
            } else if (targetId === 'disco') {
                fetchDiscos();
                fetchAutoresParaSelecao();
                fetchEstudiosParaSelecao();
            } else if (targetId === 'endereco') {
                fetchEnderecos();
            } else if (targetId === 'instrumento') {
                fetchInstrumentos();
                fetchEstudiosParaSelecao();
            } else if (targetId === 'musica') {
                fetchMusicas();
            } else if (targetId === 'estudio') {
                fetchEnderecosParaSelecao();
                fetchEstudios();
            }
        });
    });

    // Toogle Forms
    const toggleFormButtons = document.querySelectorAll('.toggleForm');
    toggleFormButtons.forEach(button => {
        button.addEventListener('click', function () {
            const formId = this.dataset.form;
            const form = document.getElementById(formId);
            form.classList.toggle('hidden');
            this.textContent = form.classList.contains('hidden') ? 'Mostrar Formulário' : 'Ocultar Formulário';
        });
    });

    // Abas
    function showTab(sectionName, tabName) {
        const tabs = document.querySelectorAll(`${sectionName} .tabcontent`);
        tabs.forEach(tab => tab.style.display = 'none');

        const activeTab = document.querySelector(`${sectionName} #${tabName}`);
        if (activeTab) {
            activeTab.style.display = 'block';
        }
    }

    // Abas carregadas ao clicar nas seções
    showTab('#autor', 'autores');
    fetchAutores();
    showTab('#disco', 'discos');


    // Funções ao abrir aba:
    document.getElementById('botao-autores').addEventListener('click', () => { showTab('#autor', 'autores'); fetchAutores() });
    document.getElementById('botao-musico').addEventListener('click', () => { showTab('#autor', 'musico'); fetchMusicos(); fetchEnderecosParaSelecao() });
    document.getElementById('botao-banda').addEventListener('click', () => { showTab('#autor', 'banda'); fetchBandas() });
    document.getElementById('botao-musicos-in-banda').addEventListener('click', () => {
        showTab('#autor', 'musicos-in-banda');
        fetchMusicosInBanda();
        fetchMusicosParaSelecao();
        fetchBandasParaSelecao();
    });


    // Musicos
    const musicoForm = document.getElementById('musicoForm');

    musicoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(musicoForm);

        const dadosMusico = {
            cdEndereco: formData.get('SelectEnderecoMusico'),
            nmMusico: formData.get('inputNmMusico'),
            nmArtistico: formData.get('inputNmArtistico')
        };

        enviarMusico(dadosMusico);
    });

    // Bandas
    const bandaForm = document.getElementById('bandaForm');

    bandaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(bandaForm);

        const dadosBanda = {
            nmBanda: formData.get('inputNomeBanda'),
            dtFormacao: formData.get('inputDataFormacao'),
        };

        enviarBanda(dadosBanda);
    });

    // Discos
    const discoForm = document.getElementById('discoForm');

    discoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(discoForm);

        const dadosDisco = {
            cdAutor: formData.get('selectAutorDisco'),
            cdLocalGravacao: formData.get('selectEstudioDisco'),
            dtGrav: formData.get('inputDataGravacao'),
            dsTitulo: formData.get('inputDiscoTitulo')
        };

        enviarDisco(dadosDisco);
    });

    // Enderecos
    const enderecoForm = document.getElementById('enderecoForm');

    enderecoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(enderecoForm);

        const dadosEndereco = {
            nmRua: formData.get('inputNomeRua'),
            nrCasa: formData.get('inputNumeroCasa'),
            nmBairro: formData.get('inputNomeBairro'),
            nmCidade: formData.get('inputNomeCidade'),
            nmEstado: formData.get('inputNomeEstado'),
            nmPais: formData.get('inputNomePais'),
            dsTelefone: formData.get('inputTelefoneEstudio')
        };

        enviarEndereco(dadosEndereco);
    });

    // Instrumentos
    const instrumentoForm = document.getElementById('instrumentoForm');

    instrumentoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(instrumentoForm);

        const dadosInstrumento = {
            cdEstudio: formData.get('selectEstudioInstrumento'),
            nmInstr: formData.get('inputNomeInstrumento'),
            tipInstr: formData.get('inputTipoInstrumento'),
            nmMarca: formData.get('inputMarcaInstrumento')
        };

        enviarInstrumento(dadosInstrumento);
    });

    // Musicas
    const musicaForm = document.getElementById('musicaForm');

    musicaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(musicaForm);

        const dadosMusica = {
            dsTitulo: formData.get('inputTituloMusica'),
            dsGenero: formData.get('inputGeneroMusica'),
            tpDuracao: formData.get('inputDuracaoMusica'),
            fmtArquivo: formData.get('inputFormatoArquivo')
        };

        enviarMusica(dadosMusica);
    });

    // Estudios
    const estudioForm = document.getElementById('estudioForm');

    estudioForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(estudioForm);

        const dadosEstudio = {
            cdEndereco: formData.get('SelectEnderecoMusico'),
            nmEstudio: formData.get('inputNomeEstudio')
        };

        enviarEstudio(dadosEstudio);
    });

    // MusicosInBanda
    const musicosInBandaForm = document.getElementById('musicosInBandaForm');

    musicosInBandaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(musicosInBandaForm);

        const dadosMusicoInBanda = {
            nrReg: formData.get('selectMusicoInBanda'),
            cdBanda: formData.get('selectBandaForMusico'),
        };

        enviarMusicoInBanda(dadosMusicoInBanda);
    });
});

function fetchMusicos() {
    axios.get('http://localhost:8080/musicos')
        .then(response => response.data)
        .then(musicos => {
            const tabela = document.getElementById('tabela-musicos');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Nm. Músico', 'Nm. Artístico', 'Cd. Endereço'];

            headers.forEach(text => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            musicos.forEach(musico => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = musico._nrReg;
                linha.insertCell(1).textContent = musico._nmMusico;
                linha.insertCell(2).textContent = musico._nmArtistico;
                linha.insertCell(3).textContent = musico._cdEndereco;
            });
        })
        .catch(error => console.error('Erro ao buscar musicos:', error));
}

function fetchBandas() {
    axios.get('http://localhost:8080/bandas')
        .then(response => response.data)
        .then(bandas => {
            const tabela = document.getElementById('tabela-bandas');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Nm. Banda', 'Dt. Formação'];

            headers.forEach(text => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            bandas.forEach(banda => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = banda._cdBanda;
                linha.insertCell(1).textContent = banda._nmBanda;
                linha.insertCell(2).textContent = banda._dtFormacao;
            });
        })
        .catch(error => console.error('Erro ao buscar bandas:', error));
}

function fetchAutores() {
    axios.get('http://localhost:8080/autores')
        .then(response => response.data)
        .then(autores => {
            const tabela = document.getElementById('tabela-autores');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código Autor', 'Nm. Artista'];

            headers.forEach(text => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            autores.forEach(autor => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = autor.cd_autor;
                linha.insertCell(1).textContent = autor.nm_autor;
            });
        })
        .catch(error => console.error('Erro ao buscar autores:', error));
}

function fetchMusicosInBanda() {
    axios.get('http://localhost:8080/musicos-in-banda')
        .then(response => response.data)
        .then(musicosInBandas => {
            const tabela = document.getElementById('tabela-musicos-in-banda');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Músico', 'Banda'];

            headers.forEach(text => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            musicosInBandas.forEach(musicoInBanda => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = musicoInBanda.nm_artistico || musicoInBanda.nm_musico;
                linha.insertCell(1).textContent = musicoInBanda.nm_banda;
            });
        })
        .catch(error => console.error('Erro ao buscar musicos em banda:', error));
}

function fetchDiscos() {
    axios.get('http://localhost:8080/discos')
        .then(response => response.data)
        .then(discos => {
            const tabela = document.getElementById('tabela-discos');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Autor', 'Local Grav.', 'Dt. Gravação', 'Título'];

            headers.forEach(text => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            discos.forEach(disco => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = disco._cdDisco;
                linha.insertCell(1).textContent = disco._cdAutor;
                linha.insertCell(2).textContent = disco._cdLocalGravacao;
                linha.insertCell(3).textContent = disco._dtGrav;
                linha.insertCell(4).textContent = disco._dsTitulo;
            });
        })
        .catch(error => console.error('Erro ao buscar discos:', error));
}

function fetchEnderecos() {
    axios.get('http://localhost:8080/enderecos')
        .then(response => response.data)
        .then(enderecos => {
            const tabela = document.getElementById('tabela-enderecos');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Rua', 'Número', 'Bairro', 'Cidade', 'Estado', 'País', 'Telefone'];

            headers.forEach(text => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            enderecos.forEach(endereco => {
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
        .catch(error => console.error('Erro ao buscar discos:', error));
}

function fetchInstrumentos() {
    axios.get('http://localhost:8080/instrumentos')
        .then(response => response.data)
        .then(instrumentos => {
            const tabela = document.getElementById('tabela-instrumentos');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Cd. Estúdio', 'Instrumento', 'Tipo', 'Marca'];

            headers.forEach(text => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            instrumentos.forEach(instrumento => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = instrumento._cdInstrumento;
                linha.insertCell(1).textContent = instrumento._cdEstudio;
                linha.insertCell(2).textContent = instrumento._nmInstr;
                linha.insertCell(3).textContent = instrumento._tipInstr;
                linha.insertCell(4).textContent = instrumento._nmMarca;
            });
        })
        .catch(error => console.error('Erro ao buscar intrumentos:', error));
}

function fetchMusicas() {
    axios.get('http://localhost:8080/musicas')
        .then(response => response.data)
        .then(musicas => {
            const tabela = document.getElementById('tabela-musicas');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Título', 'Gênero', 'Duração (seg)', 'Formato Arquivo'];

            headers.forEach(text => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            musicas.forEach(musica => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = musica._cdMusica;
                linha.insertCell(1).textContent = musica._dsTitulo;
                linha.insertCell(2).textContent = musica._dsGenero;
                linha.insertCell(3).textContent = musica._tpDuracao;
                linha.insertCell(4).textContent = musica._fmtArquivo;

            });
        })
        .catch(error => console.error('Erro ao buscar intrumentos:', error));
}

function fetchEstudios() {
    axios.get('http://localhost:8080/estudios')
        .then(response => response.data)
        .then(estudios => {
            const tabela = document.getElementById('tabela-estudios');
            tabela.innerHTML = '';

            const header = tabela.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Código', 'Cd. Endereço', 'Nome Estúdio'];

            headers.forEach(text => {
                const cell = headerRow.insertCell();
                cell.textContent = text;
            });

            const tbody = tabela.createTBody();

            estudios.forEach(estudio => {
                const linha = tbody.insertRow();
                linha.insertCell(0).textContent = estudio._cdEstudio;
                linha.insertCell(1).textContent = estudio._cdEndereco;
                linha.insertCell(2).textContent = estudio._nmEstudio;

            });
        })
        .catch(error => console.error('Erro ao buscar intrumentos:', error));
}

function enviarMusico(dadosMusico) {
    axios.post('http://localhost:8080/musicos', dadosMusico)
        .then(response => {
            fetchMusicos();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function enviarBanda(dadosBanda) {
    axios.post('http://localhost:8080/bandas', dadosBanda)
        .then(response => {
            fetchBandas();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function enviarDisco(dadosDisco) {
    axios.post('http://localhost:8080/discos', dadosDisco)
        .then(response => {
            fetchDiscos();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function enviarEndereco(dadosEndereco) {
    axios.post('http://localhost:8080/enderecos', dadosEndereco)
        .then(response => {
            fetchEnderecos();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function enviarInstrumento(dadosInstrumento) {
    axios.post('http://localhost:8080/instrumentos', dadosInstrumento)
        .then(response => {
            fetchInstrumentos();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function enviarMusica(dadosMusica) {
    axios.post('http://localhost:8080/musicas', dadosMusica)
        .then(response => {
            fetchMusicas();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function enviarEstudio(dadosEstudio) {
    axios.post('http://localhost:8080/estudios', dadosEstudio)
        .then(response => {
            fetchEstudios();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function enviarMusicoInBanda(dadosMusicoInBanda) {
    axios.post('http://localhost:8080/musico-in-banda/', dadosMusicoInBanda).then(response => {
        fetchMusicosInBanda();
    }).catch(error => {
        console.error('Erro:', error);
    });
}

function fetchMusicosParaSelecao() {
    axios.get('http://localhost:8080/musicos')
        .then(response => response.data)
        .then(musicos => {
            const allSelects = document.querySelectorAll('.selectMusico');

            allSelects.forEach((selectMusico) => {
                selectMusico.innerHTML = '';

                musicos.forEach(musico => {
                    const option = document.createElement('option');
                    option.value = musico._nrReg;
                    option.textContent = musico._nmMusico;
                    selectMusico.appendChild(option);
                });
            })
        })
        .catch(error => console.error('Erro ao buscar musicos:', error));
}

function fetchBandasParaSelecao() {
    axios.get('http://localhost:8080/bandas')
        .then(response => response.data)
        .then(bandas => {
            const allSelects = document.querySelectorAll('.selectBanda');

            allSelects.forEach((selectBanda) => {
                selectBanda.innerHTML = '';

                bandas.forEach(banda => {
                    const option = document.createElement('option');
                    option.value = banda._cdBanda;
                    option.textContent = banda._nmBanda;
                    selectBanda.appendChild(option);
                });
            })
        })
        .catch(error => console.error('Erro ao buscar bandas:', error));
}

function fetchEnderecosParaSelecao() {
    axios.get('http://localhost:8080/enderecos')
        .then(response => response.data)
        .then(enderecos => {
            const allSelects = document.querySelectorAll('.selectEndereco');

            allSelects.forEach((selectEndereco) => {
                selectEndereco.innerHTML = '';

                enderecos.forEach(endereco => {
                    const option = document.createElement('option');
                    option.value = endereco._cdEndereco;
                    option.textContent = `${endereco._nmRua}, ${endereco._nrCasa} - ${endereco._nmCidade}, ${endereco._nmEstado} - ${endereco._nmPais}`;
                    selectEndereco.appendChild(option);
                });
            })
        })
        .catch(error => console.error('Erro ao buscar enderecos:', error));
}

function fetchAutoresParaSelecao() {
    axios.get('http://localhost:8080/autores')
        .then(response => response.data)
        .then(autores => {
            const allSelects = document.querySelectorAll('.selectAutor');

            allSelects.forEach((selectAutor) => {
                selectAutor.innerHTML = '';

                autores.forEach(autor => {
                    const option = document.createElement('option');
                    option.value = autor.cd_autor;
                    option.textContent = autor.nm_autor;
                    selectAutor.appendChild(option);
                });
            })
        })
        .catch(error => console.error('Erro ao buscar autores:', error));
}

function fetchEstudiosParaSelecao() {
    axios.get('http://localhost:8080/estudios')
        .then(response => response.data)
        .then(estudios => {
            const allSelects = document.querySelectorAll('.selectEstudio');

            allSelects.forEach((selectEstudio) => {
                selectEstudio.innerHTML = '';

                estudios.forEach(estudio => {
                    const option = document.createElement('option');
                    option.value = estudio._cdEstudio;
                    option.textContent = estudio._nmEstudio;
                    selectEstudio.appendChild(option);
                });
            })
        })
        .catch(error => console.error('Erro ao buscar autores:', error));
}