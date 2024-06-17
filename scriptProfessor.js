class cadastroProfessor {
    constructor(nome, identificador, email, senha) {
        this.nome = nome;
        this.identificador = identificador;
        this.senha = senha;
        this.email = email;
    }
    getNome() {
        return this.nome;
    }
    getIdentificador() {
        return this.identificador;
    }
    getSenha() {
        return this.senha;
    }
    getEmail() {
        return this.email;
    }

    setNome(novoNome) {
        this.nome = novoNome;
    }
    setIdentificador(novoIdentificador) {
        this.identificador = novoIdentificador;
    }
    setSenha(novaSenha) {
        this.senha = novaSenha;
    }
    setEmail(novoEmail) {
        this.email = novoEmail;
    }

    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(dadosJson) {
        const dados = JSON.parse(dadosJson);
        return new cadastroProfessor(dados.nome, dados.identificador, dados.email, dados.senha);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loginBotaoProfessor = document.getElementById('loginBotaoProf');
    const formularioProfessor = document.getElementById('formProfessor');
    loginBotaoProfessor.addEventListener('click', function (event) {
        checkInputs();
    });

    const emailProfessor = document.getElementById('emailProfessor');
    const identificadorProfessor = document.getElementById('identificadorProfessor');
    const nomeProfessor = document.getElementById('usernameProfessor');
    const senhaProfessor = document.getElementById('passwordProfessor');

    function checkInputs() {
        const nomeProfessorValue = nomeProfessor.value;
        const identificadorValue = identificadorProfessor.value;
        const emailProfessorValue = emailProfessor.value;
        const senhaProfessorValue = senhaProfessor.value;

        let formIsValid = true;

        if (nomeProfessorValue === '') {
            setErrorFor(nomeProfessor, "O nome completo é obrigatório");
            formIsValid = false;
        } else {
            setSucessoFor(nomeProfessor);
        }

        if (emailProfessorValue === '') {
            setErrorFor(emailProfessor, "O email é obrigatório");
            formIsValid = false;
        } else if (!checkEmail(emailProfessorValue)) {
            setErrorFor(emailProfessor, "Por favor, insira um email válido.");
            formIsValid = false;
        } else {
            setSucessoFor(emailProfessor);
        }

        if (senhaProfessorValue === '') {
            setErrorFor(senhaProfessor, "A senha é obrigatória.");
            formIsValid = false;
        } else if (senhaProfessorValue.length < 6) {
            setErrorFor(senhaProfessor, "A senha precisa ter no mínimo 6 caracteres.");
            formIsValid = false;
        } else {
            setSucessoFor(senhaProfessor);
        }

        if (formIsValid) {
            let professor = new cadastroProfessor(nomeProfessorValue, identificadorValue, emailProfessorValue, senhaProfessorValue);
            const cadastroProfessorLista = JSON.parse(localStorage.getItem('cadastroProfessorLista') || '[]');
            cadastroProfessorLista.push(professor);
            localStorage.setItem('cadastroProfessorLista', JSON.stringify(cadastroProfessorLista));

            console.log("O formulário está válido!");
        }
    }

    function setErrorFor(input, mensagem) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        small.innerText = mensagem;
        formControl.className = 'form-control error';
    }

    function setSucessoFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    function checkEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
});
