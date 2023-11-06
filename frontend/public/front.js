document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    navLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            sections.forEach((section) => {
                section.style.display = 'none';
            });

            document.getElementById(targetId).style.display = 'block';
        });
    });

   
    
    // Adiciona event listener para mostrar/ocultar formulário de Studio
    const toggleStudioFormButton = document.getElementById('toggleStudioForm');
    const studioForm = document.getElementById('studioForm'); 
    toggleStudioFormButton.addEventListener('click', function () {
        toggleStudioFormButton.classList.add('hidden');
        studioForm.classList.remove('hidden');
    });

    const toggleProdutorForm = document.getElementById('toggleProdutorForm');
    const produtorForm = document.getElementById('produtorForm');
    toggleProdutorForm.addEventListener('click', function () {
        toggleProdutorForm.classList.add('hidden');
        produtorForm.classList.remove('hidden');
    });

    const toggleMusicaForm = document.getElementById('toggleMusicaForm');
    const MusicaForm = document.getElementById('MusicaForm');
    toggleMusicaForm.addEventListener('click', function () {
        toggleMusicaForm.classList.add('hidden');
        MusicaForm.classList.remove('hidden');
    });

    const toggleInstrumentoForm = document.getElementById('toggleInstrumentoForm');
    const InstrumentoForm = document.getElementById('InstrumentoForm');
    toggleInstrumentoForm.addEventListener('click', function () {
        toggleInstrumentoForm.classList.add('hidden');
        InstrumentoForm.classList.remove('hidden');
    });
    
    const toggleEnderecoForm = document.getElementById('toggleEnderecoForm');
    const EnderecoForm = document.getElementById('EnderecoForm');
    toggleEnderecoForm.addEventListener('click', function () {
        toggleEnderecoForm.classList.add('hidden');
        EnderecoForm.classList.remove('hidden');
    });

    
    const toggleDiscoForm = document.getElementById('toggleDiscoForm');
    const DiscoForm = document.getElementById('DiscoForm');
    toggleDiscoForm.addEventListener('click', function () {
        toggleDiscoForm.classList.add('hidden');
        DiscoForm.classList.remove('hidden'); 
    });
});
