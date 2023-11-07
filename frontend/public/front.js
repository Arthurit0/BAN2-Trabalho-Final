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
            if (targetId === 'musico') {
                fetchMusicos();
            } else if (targetId === 'banda') {
                fetchBandas();
            } else if (targetId === 'disco') {
                fetchDiscos();
            } else if (targetId === 'endereco') {
                fetchEnderecos();
            } else if (targetId === 'instrumento') {
                fetchInstrumentos();
            } else if (targetId === 'musica') {
                fetchMusicas();
            } else if (targetId === 'estudio') {
                fetchEstudios();
            }
        });
    });

    // Abas Autor
    function showTab(tabName) {
        const tabs = document.querySelectorAll('#autor .tabcontent');
        tabs.forEach(tab => tab.style.display = 'none');
        document.getElementById(tabName).style.display = 'block';
    }

    // document.getElementById('botao-todos').addEventListener('click', () => { showTab('todos') });
    document.getElementById('botao-musico').addEventListener('click', () => { showTab('musico'); fetchMusicos() });
    document.getElementById('botao-banda').addEventListener('click', () => { showTab('banda'); fetchBandas() });

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

    // Musicos
    const musicoForm = document.getElementById('musicoForm');

    musicoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(musicoForm);

        const dadosMusico = {
            cdEndereco: formData.get('inputEnderecoMusico'),
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
            cdAutor: formData.get('inputCodigoAutor'),
            cdLocalGravacao: formData.get('inputCodigoLocalGravacao'),
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
            cdEstudio: formData.get('inputCodigoEstudioInstrumento'),
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

    // Musicas
    const estudioForm = document.getElementById('estudioForm');

    estudioForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(estudioForm);

        const dadosEstudio = {
            cdEndereco: formData.get('inputCodigoEnderecoEstudio'),
            nmEstudio: formData.get('inputNomeEstudio')
        };

        enviarEstudio(dadosEstudio);
    });


    // Inicialmente, mostrar apenas a tabela na seção Autor
    showTab('musicos')
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

async function enviarMusico(dadosMusico) {
    axios.post('http://localhost:8080/musicos', dadosMusico)
        .then(response => {
            fetchMusicos();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

async function enviarBanda(dadosBanda) {
    axios.post('http://localhost:8080/bandas', dadosBanda)
        .then(response => {
            fetchBandas();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

async function enviarDisco(dadosDisco) {
    axios.post('http://localhost:8080/discos', dadosDisco)
        .then(response => {
            fetchDiscos();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

async function enviarEndereco(dadosEndereco) {
    axios.post('http://localhost:8080/enderecos', dadosEndereco)
        .then(response => {
            fetchEnderecos();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

async function enviarInstrumento(dadosInstrumento) {
    axios.post('http://localhost:8080/instrumentos', dadosInstrumento)
        .then(response => {
            fetchInstrumentos();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

async function enviarMusica(dadosMusica) {
    axios.post('http://localhost:8080/musicas', dadosMusica)
        .then(response => {
            fetchMusicas();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

async function enviarEstudio(dadosEstudio) {
    axios.post('http://localhost:8080/estudios', dadosEstudio)
        .then(response => {
            fetchEstudios();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

