/**
 * Classe Funcionario
 * Representa um funcionário da Startup de Tecnologia.
 *
 * Conceitos aplicados:
 * - Programação Orientada a Objetos (POO)
 * - Atributos privados / encapsulados
 * - Métodos de Acesso (getters e setters) com validações
 * - Método toString() customizado
 */
export class Funcionario {
    /** @type {number} */
    _id;
    /** @type {string} */
    _nome;
    /** @type {number} */
    _idade;
    /** @type {string} */
    _cargo;
    /** @type {number} */
    _salario;

    /**
     * Construtor da classe Funcionario
     * @param {string} nome - Nome do funcionário
     * @param {number} idade - Idade do funcionário
     * @param {string} cargo - Cargo ocupado
     * @param {number} salario - Salário mensal
     * @param {number} [id] - Identificador único opcional (se não informado, gera via timestamp/contador)
     */
    constructor(nome, idade, cargo, salario, id = Date.now()) {
        this._id = id;
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    // --- Métodos de Acesso (Getters e Setters) ---

    /**
     * Retorna o ID do funcionário (somente leitura)
     * @returns {number}
     */
    get id() {
        return this._id;
    }

    /**
     * Retorna o nome do funcionário
     * @returns {string}
     */
    get nome() {
        return this._nome;
    }

    /**
     * Define o nome do funcionário
     * @param {string} valor
     */
    set nome(valor) {
        if (!valor || typeof valor !== 'string' || valor.trim() === '') {
            throw new Error('O nome é obrigatório e não pode ser vazio.');
        }
        this._nome = valor.trim();
    }

    /**
     * Retorna a idade do funcionário
     * @returns {number}
     */
    get idade() {
        return this._idade;
    }

    /**
     * Define a idade do funcionário com validação
     * @param {number|string} valor
     */
    set idade(valor) {
        const num = Number(valor);
        if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
            throw new Error('A idade deve ser um número inteiro positivo.');
        }
        this._idade = num;
    }

    /**
     * Retorna o cargo do funcionário
     * @returns {string}
     */
    get cargo() {
        return this._cargo;
    }

    /**
     * Define o cargo do funcionário
     * @param {string} valor
     */
    set cargo(valor) {
        if (!valor || typeof valor !== 'string' || valor.trim() === '') {
            throw new Error('O cargo é obrigatório e não pode ser vazio.');
        }
        this._cargo = valor.trim();
    }

    /**
     * Retorna o salário do funcionário
     * @returns {number}
     */
    get salario() {
        return this._salario;
    }

    /**
     * Define o salário do funcionário com validação
     * @param {number|string} valor
     */
    set salario(valor) {
        const num = Number(valor);
        if (isNaN(num) || num < 0) {
            throw new Error('O salário deve ser um número maior ou igual a zero.');
        }
        this._salario = num;
    }

    /**
     * Retorna o salário formatado em moeda brasileira (BRL)
     * @returns {string}
     */
    get salarioFormatado() {
        return this._salario.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    /**
     * Retorna representação textual do funcionário
     * Exigência do Exercício 1
     * @returns {string}
     */
    toString() {
        return `[ID: ${this._id}] ${this._nome} - ${this._cargo} (${this._idade} anos) - ${this.salarioFormatado}`;
    }
}
