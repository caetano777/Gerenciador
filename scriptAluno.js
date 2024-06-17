class cadastroAluno {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.senha = senha;
        this.email = email;
    }
    //get
    getNome() {
        return this.nome;
    }
    getSenha() {
        return this.senha;
    }
    getEmail() {
        return this.email;
    }
    //set
    setNome(novoNome) {
        this.nome = novoNome;
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
        return new cadastroAluno(dados.nome, dados.email, dados.senha);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const loginBotaoAluno = document.getElementById('loginBotaoAluno');
    const formularioAluno = document.getElementById('formAluno');
    loginBotaoAluno.addEventListener('click', (e) => {
        checkInputs();
    })

    const nomeAluno = document.getElementById('username');
    const emailAluno = document.getElementById('email');
    const senhaAluno = document.getElementById('password');

    function checkInputs() {

        const nomeValue = nomeAluno.value;
        const emailValue = emailAluno.value;
        const senhaValue = senhaAluno.value;

        if (nomeValue === '') {
            setErrorFor(nomeAluno, "O nome completo é obrigatório")
        }
        else {
            setSucessoFor(nomeAluno)
        }
        //email
        if (emailValue === '') {
            setErrorFor(emailAluno, "O email completo é obrigatório")
        }
        else if (!checkEmail(emailValue)) {
            setErrorFor(emailAluno, "Por favor, insira um email válido.");
        }
        else {
            setSucessoFor(emailAluno)
        }
        //senha
        if (senhaValue === "") {
            setErrorFor(password, "A senha é obrigatória.");
        } else if (senhaValue.length < 6) {
            setErrorFor(password, "A senha precisa ter no mínimo 8 caracteres.");
        } else {
            setSucessoFor(password);
        }

        const formControle = formularioAluno.querySelectorAll('form');

        const formIsValid = [...formControle].every(formControle => {
            return (formControle.className === 'campo sucess');
        })

        if (formIsValid) {
            let aluno = new cadastroAluno(nomeValue, emailValue, senhaValue);
            const listaCadastroAluno = JSON.parse(localStorage.getItem('listaCadastroAluno') || '[]');
            let alunoJSON = aluno.toJson();
            let novoAluno = cadastroAluno.fromJson(alunoJSON);
            listaCadastroAluno.push(novoAluno);
            localStorage.setItem('listaCadastroAluno', JSON.stringify(listaCadastroAluno));
        }
    }
    function setErrorFor(input, mensagem) {
        const formcontrol = input.parentElement; //vai retorna a div que é pai do input // form-control é a class da div
        const small = formcontrol.querySelector('small');

        small.innerText = mensagem;

        formcontrol.className = 'form-control error';
    }
    function setSucessoFor(input) {
        const formcontrol = input.parentElement; //vai retorna a div que é pai do input

        formcontrol.className = 'form-control sucess';
    }


    function checkEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }
});
