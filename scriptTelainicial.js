const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const formAluno = document.querySelector('.forma-container.cadastrar > form');


registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

loginBotaoProf.addEventListener('click', function(event) {
    event.preventDefault(); 
    window.location.href = './ReservaProfessor/index.html';
});

loginBotaoAluno.addEventListener('click', function(event) {
    event.preventDefault(); 
    window.location.href = './ReservaAluno/index.html'; 
});