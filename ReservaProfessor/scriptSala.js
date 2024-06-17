class CadastrarSala {
    constructor(id, nomeSala, descricaoSala, quantidadeAlunos, predio) {
        this.id = id;
        this.nomeSala = nomeSala;
        this.descricaoSala = descricaoSala;
        this.quantidadeAlunos = quantidadeAlunos;
        this.predio = predio;
    }
    getID() {
        return this.id;
    }
    getNomeSala() {
        return this.nomeSala;
    }
    getDescricaoSala() {
        return this.descricaoSala;
    }
    getQuantidadeAlunos() {
        return this.quantidadeAlunos;
    }
    getPredio() {
        return this.predio;
    }
    setNomeSala(novoNomeSala) {
        this.nomeSala = novoNomeSala;
    }
    setDescricaoSala(novoDescricaoSala) {
        this.descricaoSala = novoDescricaoSala;
    }
    setQuantidadeAlunos(novoQuantidadeAlunos) {
        this.quantidadeAlunos = novoQuantidadeAlunos;
    }
    setPredio(novoPredio) {
        this.predio = novoPredio;
    }
    setID(novoID) {
        this.id = novoID;
    }
    toJson() {
        return JSON.stringify(this);
    }
    static fromJson(dadosJson) {
        return new CadastrarSala(dadosJson.id, dadosJson.nomeSala, dadosJson.descricaoSala, dadosJson.quantidadeAlunos, dadosJson.predio);
    }
}

const nomeSala = document.getElementById('nome-sala');
const descricaoSala = document.getElementById('descricao-sala');
const quantidadeAlunos = document.getElementById('qtd-alunos');
const predio = document.getElementById('predio');

class ReservarSala {
    constructor(id, opcaoSala, dataReserva, horaInicio, horaFinal) {
        this.id = id;
        this.opcaoSala = opcaoSala;
        this.dataReserva = dataReserva;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
    }
    getID() {
        return this.id;
    }
    getOpcaoSala() {
        return this.opcaoSala;
    }
    getDataReserva() {
        return this.dataReserva;
    }
    gethoraInicio() {
        return this.horaInicio;
    }
    gethoraFinal() {
        return this.horaFinal;
    }
    setOpcaoSala(novaOpcaoSala) {
        this.opcaoSala = novaOpcaoSala;
    }
    setDataReserva(novaDataReserva) {
        this.dataReserva = novaDataReserva;
    }
    sethoraInicio(novaHoraInicio) {
        this.horaInicio = novaHoraInicio;
    }
    sethoraFinal(novaHoraFinal) {
        this.horaFinal = novaHoraFinal;
    }
    setID(novoID) {
        this.id = novoID;
    }
    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(dadosJson) {
        return new ReservarSala(dadosJson.id, dadosJson.opcaoSala, dadosJson.dataReserva, dadosJson.horaInicio, dadosJson.horaFinal);
    }
}

const opcaoSala = document.getElementById('sala');
const dataReserva = document.getElementById('data-reserva');
const horaInicio = document.getElementById('hora-inicio');
const horaFinal = document.getElementById('hora-final');

const formularioCadastroSala = document.getElementById('form-cadastro-sala');
const formularioReservaSala = document.getElementById('form-reserva-sala');
const listaReserva = document.getElementById('lista-reservas');

class gerenciadorSala {
    CadastrarSala = [];
    ReservarSala = [];

    adicionarSala(sala) {
        this.CadastrarSala.push(sala);
        this.salvarSala();
    }

    adicionarReserva(reserva) {
        this.ReservarSala.push(reserva);
        this.salvarReserva();
    }

    getSalaporID(id) {
        return this.CadastrarSala.find(sala => sala.id === id);
    }

    getReservaporID(id) {
        return this.ReservarSala.find(reserva => reserva.id=== id);
    }

    removerSala(id) {
        const index = this.CadastrarSala.findIndex(sala => sala.id === id);
        if (index !== -1) {
            this.CadastrarSala.splice(index, 1);
            this.salvarSala;
        }
    }

    removerReserva(id) {
        const index = this.ReservarSala.findIndex(reserva => reserva.id === id);
        if (index !== -1) {
            this.ReservarSala.splice(index, 1);
            this.salvarReserva;
        }
    }

    carregarSala() {
        const salasJson = (localStorage.getItem('salas') || '[]');
        if (salasJson) {
            const salas = JSON.parse(salasJson)
            salas.forEach(salaInfo => {
                const novaSala = CadastrarSala.fromJson(salaInfo);
                this.adicionarSala(novaSala);
            });
        }
    }

    salvarSala() {
        localStorage.setItem('salas', JSON.stringify(this.CadastrarSala));
    }

    carregarReserva() {
        const reservaJson = (localStorage.getItem('reservas') || '[]');
        if (reservaJson) {
            const reservas = JSON.parse(reservaJson);
            reservas.forEach(reservaInfo => {
                const novaReserva = ReservarSala.fromJson(reservaInfo);
                this.adicionarReserva(novaReserva);
            })
        }
    }

    salvarReserva() {
        localStorage.setItem('reservas', JSON.stringify(this.ReservarSala));
    }
}

const gerenciador = new gerenciadorSala;

function atualizarAsOpcaoSAla() {
    const selecaoSala = document.getElementById('sala');
    selecaoSala.innerHTML = '';
    gerenciador.CadastrarSala.forEach(sala => {
        const opcao = document.createElement('option');
        opcao.value = sala.nomeSala;
        opcao.textContent = sala.nomeSala
        selecaoSala.appendChild(opcao);
    });
}

function exibirReservas() {
    const listaReservas = document.getElementById('lista-reservas');
    listaReservas.innerHTML = '';
    gerenciador.ReservarSala.forEach(reserva => {
        const li = document.createElement('li');
        li.className = 'reserva';
        li.innerHTML = `
            <span><strong>Sala:</strong> ${reserva.opcaoSala}</span>
            <span><strong>Data:</strong> ${reserva.dataReserva}</span>
            <span><strong>Horário:</strong> ${reserva.horaInicio} - ${reserva.horaFinal}</span>
            <button class="btn-editar-reserva" data-reserva-id="${reserva.id}">Editar</button>
            <button class="btn-remover-reserva" data-reserva-id="${reserva.id}">Remover</button>
        `;
        listaReservas.appendChild(li);
    });
}

document.getElementById('form-cadastro-sala').addEventListener('submit', (e) => {
    e.preventDefault();
    const nomeSalaValue = document.getElementById('nome-sala').value;
    const descricaoSalaValue = document.getElementById('descricao-sala').value;
    const quantidadeAlunosValue = document.getElementById('qtd-alunos').value;
    const predioValue = document.getElementById('predio').value;

    const id = Date.now();
    const novoCadastroSala = new CadastrarSala(id, nomeSalaValue, descricaoSalaValue, quantidadeAlunosValue, predioValue);
    gerenciador.adicionarSala(novoCadastroSala);
    atualizarAsOpcaoSAla();
    document.getElementById('form-cadastro-sala').reset();
});

document.getElementById('form-reserva-sala').addEventListener('submit', (e) => {
    const opcaoSalaValue = document.getElementById('sala').value;
    const dataReservaValue = document.getElementById('data-reserva').value;
    const horaInicioValue = document.getElementById('hora-inicio').value;
    const horaFinalValue = document.getElementById('hora-final').value;

    const id = Date.now();
    const novaReservaSala = new ReservarSala(id,opcaoSalaValue, dataReservaValue, horaInicioValue, horaFinalValue);
    gerenciador.adicionarReserva(novaReservaSala);
    document.getElementById('form-reserva-sala').reset();
});
document.getElementById('lista-reservas').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-editar-reserva')) {
        const reservaId = parseInt(e.target.dataset.reservaId);
        const reserva = gerenciador.getReservaporID(reservaId);

        document.getElementById('sala').value = ReservarSala.opcaoSala;
        document.getElementById('data-reserva').value = reserva.dataReserva;
        document.getElementById('hora-inicio').value = reserva.horaInicio;
        document.getElementById('hora-final').value = reserva.horaFinal;

        gerenciador.removerReserva(reservaId);
    }

    if (e.target.classList.contains('btn-remover-reserva')) {
        const reservaId = parseInt(e.target.dataset.reservaId);
        gerenciador.removerReserva(reservaId);
        exibirReservas();
    }
});
gerenciador.carregarSala();
gerenciador.carregarReserva();
atualizarAsOpcaoSAla();
exibirReservas();