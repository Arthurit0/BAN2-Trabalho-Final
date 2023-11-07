document.addEventListener('DOMContentLoaded', function () {
    // Função para alternar a visibilidade das seções
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sections = document.querySelectorAll('section');
            sections.forEach(section => section.style.display = 'none');
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).style.display = 'block';
        });
    });

    // Função para mostrar abas específicas dentro da seção Autor
    function showTab(tabName) {
        const tabs = document.querySelectorAll('#autor .tabcontent');
        tabs.forEach(tab => tab.style.display = 'none');
        document.getElementById(tabName).style.display = 'block';
    }

    // Adiciona event listeners para os botões de abas
    document.getElementById('botao-todos').addEventListener('click', () => showTab('todos'));
    document.getElementById('botao-musico').addEventListener('click', () => showTab('musico'));
    document.getElementById('botao-banda').addEventListener('click', () => showTab('banda'));

    // Função para alternar formulários
    const toggleFormButtons = document.querySelectorAll('.toggleForm');
    toggleFormButtons.forEach(button => {
        button.addEventListener('click', function () {
            const formId = this.dataset.form;
            const form = document.getElementById(formId);
            form.classList.toggle('hidden');
            this.textContent = form.classList.contains('hidden') ? 'Mostrar Formulário' : 'Ocultar Formulário';
        });
    });

    // Inicialmente, mostrar apenas a tabela na seção Autor
    showTab('todos');

    function fetchMusicos() {
        axios.get('http://localhost:8080/musicos')
            .then(response => {
                // Aqui você deve retornar a resposta para que o próximo .then possa recebê-la
                return response.data;
            })
            .then(musicos => {
                const tabela = document.getElementById('tabela-musicos');

                if (Array.isArray(musicos)) {
                    musicos.forEach(musico => {
                        console.log(musico)
                        const linha = tabela.insertRow();
                        linha.insertCell(0).textContent = musico._nrReg;
                        linha.insertCell(1).textContent = musico._nmMusico;
                        linha.insertCell(2).textContent = musico._nmArtistico;
                        linha.insertCell(3).textContent = musico._cdEndereco;
                        console.log(linha)
                    });
                }
            })
            .catch(error => console.error('Erro ao buscar musicos:', error));
    }

    // Chama a função ao carregar a página
    fetchMusicos();
});
