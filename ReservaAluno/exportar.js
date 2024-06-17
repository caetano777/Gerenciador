export class CadastrarSala {
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