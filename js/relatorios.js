/**
 * Módulo de Relatórios utilizando Métodos de Array / Streams JS
 * Atende aos requisitos do Exercício 4:
 * - filter
 * - reduce
 * - new Set()
 * - map
 */

/**
 * 1. Filtra funcionários com salário maior que R$ 5.000,00
 * Utiliza o método `Array.prototype.filter` com arrow function (lambda).
 * 
 * @param {Array<import('./Funcionario.js').Funcionario>} funcionarios
 * @param {number} [valorMinimo=5000]
 * @returns {Array<import('./Funcionario.js').Funcionario>}
 */
export const filtrarSalarioMaiorQue5000 = (funcionarios, valorMinimo = 5000) => {
    return funcionarios.filter((funcionario) => funcionario.salario > valorMinimo);
};

/**
 * 2. Calcula a média salarial de todos os funcionários cadastrados
 * Utiliza o método `Array.prototype.reduce` com arrow function (lambda).
 * 
 * @param {Array<import('./Funcionario.js').Funcionario>} funcionarios
 * @returns {number} Média salarial (0 caso o array esteja vazio)
 */
export const calcularMediaSalarial = (funcionarios) => {
    if (!funcionarios || funcionarios.length === 0) return 0;

    const somaTotal = funcionarios.reduce((acumulador, funcionario) => {
        return acumulador + funcionario.salario;
    }, 0);

    return somaTotal / funcionarios.length;
};

/**
 * 3. Retorna a lista de cargos únicos sem repetição
 * Utiliza `map` para extrair os cargos e `new Set()` para eliminar duplicidades.
 * 
 * @param {Array<import('./Funcionario.js').Funcionario>} funcionarios
 * @returns {Array<string>} Lista de cargos distintos
 */
export const obterCargosUnicos = (funcionarios) => {
    if (!funcionarios || funcionarios.length === 0) return [];

    // Mapeia os cargos e remove duplicatas com new Set()
    const todosOsCargos = funcionarios.map((funcionario) => funcionario.cargo);
    return Array.from(new Set(todosOsCargos));
};

/**
 * 4. Retorna uma lista com os nomes de todos os funcionários em letras maiúsculas
 * Utiliza o método `Array.prototype.map` com arrow function (lambda).
 * 
 * @param {Array<import('./Funcionario.js').Funcionario>} funcionarios
 * @returns {Array<string>} Lista de nomes em caixa alta
 */
export const obterNomesEmMaiusculo = (funcionarios) => {
    if (!funcionarios || funcionarios.length === 0) return [];

    return funcionarios.map((funcionario) => funcionario.nome.toUpperCase());
};
