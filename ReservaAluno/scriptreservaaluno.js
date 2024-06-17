class ReservarSalaAluno {
    constructor(id, opcaoSala, dataReserva, horaInicio, horaFinal, descricao) {
        this.id = id;
        this.opcaoSala = opcaoSala;
        this.dataReserva = dataReserva;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
        this.descricao = descricao;
    }

    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(dadosJson) {
        return new ReservarSalaAluno(
            dadosJson.id,
            dadosJson.opcaoSala,
            dadosJson.dataReserva,
            dadosJson.horaInicio,
            dadosJson.horaFinal,
            dadosJson.descricao
        );
    }
}

const opcaoSala = document.getElementById('sala');
const dataReserva = document.getElementById('data-reserva');
const horaInicio = document.getElementById('hora-inicio');
const horaFinal = document.getElementById('hora-fim');
const descricaoReserva = document.getElementById('descricao-reserva');

const formularioReservaSala = document.getElementById('form-reserva-sala');
const listaReserva = document.getElementById('lista-reservas');

class GerenciadorReserva {
    constructor() {
        this.ReservarSala = [];
    }

    adicionarReserva(reserva) {
        this.ReservarSala.push(reserva);
        this.salvarReserva();
    }

    getReservaporID(id) {
        return this.ReservarSala.find(reserva => reserva.id === id);
    }

    removerReserva(id) {
        const index = this.ReservarSala.findIndex(reserva => reserva.id === id);
        if (index !== -1) {
            this.ReservarSala.splice(index, 1);
            this.salvarReserva();
        }
    }

    carregarReserva() {
        const reservaJson = (localStorage.getItem('reservas') || '[]');
        if (reservaJson) {
            const reservas = JSON.parse(reservaJson);
            reservas.forEach(reservaInfo => {
                const novaReserva = ReservarSalaAluno.fromJson(reservaInfo);
                this.adicionarReserva(novaReserva);
            });
        }
    }

    salvarReserva() {
        localStorage.setItem('reservas', JSON.stringify(this.ReservarSala));
    }
}

const gerenciador = new GerenciadorReserva();

function adicionarSalaAoFormulario(sala) {
    const selectSala = document.getElementById('sala');
    const option = document.createElement('option');
    option.textContent = sala.nome;
    option.value = sala.id;
    selectSala.appendChild(option);

    const listaSalas = document.getElementById('lista-salas');
    const li = document.createElement('li');
    li.className = 'sala';
    li.innerHTML = `
        <span><strong>Nome:</strong> ${sala.nome}</span>
        <span><strong>Descrição:</strong> ${sala.descricao}</span>
        <span><strong>Quantidade de Alunos:</strong> ${sala.qtdAlunos}</span>
        <span><strong>Prédio:</strong> ${sala.predio}</span>
    `;
    listaSalas.appendChild(li);
}

function adicionarReserva(reserva) {
    const listaReservas = document.getElementById('lista-reservas');
    const li = document.createElement('li');
    li.className = 'reserva';
    li.innerHTML = `
        <span><strong>Sala:</strong> ${reserva.opcaoSala}</span>
        <span><strong>Data:</strong> ${reserva.dataReserva}</span>
        <span><strong>Horário:</strong> ${reserva.horaInicio} - ${reserva.horaFinal}</span>
        <span><strong>Descrição:</strong> ${reserva.descricao}</span>
        <button class="btn-remover-reserva" data-reserva-id="${reserva.id}">Remover</button>
    `;
    listaReservas.appendChild(li);

    document.getElementById('form-reserva-sala').reset();
}

document.getElementById('form-reserva-sala').addEventListener('submit', (e) => {
    e.preventDefault();

    const opcaoSalaValue = document.getElementById('sala').value;
    const dataReservaValue = document.getElementById('data-reserva').value;
    const horaInicioValue = document.getElementById('hora-inicio').value;
    const horaFinalValue = document.getElementById('hora-fim').value;
    const descricaoReservaValue = document.getElementById('descricao-reserva').value;

    const id = Date.now();
    const novaReservaSala = new ReservarSalaAluno(id, opcaoSalaValue, dataReservaValue, horaInicioValue, horaFinalValue, descricaoReservaValue);
    gerenciador.adicionarReserva(novaReservaSala);
    adicionarReserva(novaReservaSala);
});

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
            <span><strong>Descrição:</strong> ${reserva.descricao}</span>
            <button class="btn-remover-reserva" data-reserva-id="${reserva.id}">Remover</button>`;
        listaReservas.appendChild(li);
    });
}

document.getElementById('lista-reservas').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remover-reserva')) {
        const reservaId = parseInt(e.target.dataset.reservaId);
        gerenciador.removerReserva(reservaId);
        exibirReservas();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const salas = [
        { id: 1, nome: 'Sala para estudos', descricao: 'Biblioteca', qtdAlunos: 10, predio: '1' },
        { id: 2, nome: 'Sala de descanso', descricao: 'Sala para descansar', qtdAlunos: 20, predio: '2' }
    ];
    salas.forEach(adicionarSalaAoFormulario);

    gerenciador.carregarReserva();
    exibirReservas();
});
