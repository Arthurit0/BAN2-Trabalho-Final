// JavaScript para mostrar/ocultar seções com base na escolha do usuário
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
});