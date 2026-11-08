import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Funcionario } from '../js/Funcionario.js';
import {
    filtrarSalarioMaiorQue5000,
    calcularMediaSalarial,
    obterCargosUnicos,
    obterNomesEmMaiusculo
} from '../js/relatorios.js';

describe('Exercício 1: Classe Funcionario', () => {
    it('deve instanciar um funcionário com os atributos corretos', () => {
        const func = new Funcionario('Ana Silva', 28, 'Engenheira de Software', 8500, 1);
        assert.strictEqual(func.id, 1);
        assert.strictEqual(func.nome, 'Ana Silva');
        assert.strictEqual(func.idade, 28);
        assert.strictEqual(func.cargo, 'Engenheira de Software');
        assert.strictEqual(func.salario, 8500);
    });

    it('deve ter métodos de acesso (getters e setters) funcionais com validação', () => {
        const func = new Funcionario('Carlos Santos', 35, 'Designer UI/UX', 4500, 2);
        
        // Atualizando atributos via setters (Exercício 2)
        func.nome = 'Carlos Eduardo Santos';
        func.idade = 36;
        func.cargo = 'Lead Designer';
        func.salario = 6000;

        assert.strictEqual(func.nome, 'Carlos Eduardo Santos');
        assert.strictEqual(func.idade, 36);
        assert.strictEqual(func.cargo, 'Lead Designer');
        assert.strictEqual(func.salario, 6000);
    });

    it('deve lançar erro ao passar valores inválidos nos setters', () => {
        const func = new Funcionario('Marina Souza', 22, 'Estagiária', 2000, 3);
        
        assert.throws(() => { func.nome = '   '; }, /obrigatório/);
        assert.throws(() => { func.idade = -5; }, /positivo/);
        assert.throws(() => { func.cargo = ''; }, /obrigatório/);
        assert.throws(() => { func.salario = -100; }, /maior ou igual a zero/);
    });

    it('deve possuir um método toString() formatado', () => {
        const func = new Funcionario('Roberto Silva', 30, 'DevOps', 7200, 4);
        const str = func.toString();
        assert.ok(str.includes('ID: 4'));
        assert.ok(str.includes('Roberto Silva'));
        assert.ok(str.includes('DevOps'));
        assert.ok(str.includes('30 anos'));
        assert.ok(str.includes('7.200,00'));
    });
});

describe('Exercício 3: Manipulação de array com Arrow Functions', () => {
    const lista = [
        new Funcionario('Alice', 25, 'Desenvolvedora', 4000, 101),
        new Funcionario('Bruno', 32, 'Tech Lead', 12000, 102),
        new Funcionario('Carla', 29, 'Product Manager', 9000, 103)
    ];

    it('deve buscar funcionário por ID usando arrow function', () => {
        const buscarPorId = (id) => lista.find((f) => f.id === id);
        const encontrado = buscarPorId(102);
        assert.strictEqual(encontrado?.nome, 'Bruno');
    });

    it('deve buscar funcionários por nome usando arrow function', () => {
        const buscarPorNome = (termo) => lista.filter((f) => f.nome.toLowerCase().includes(termo.toLowerCase()));
        const encontrados = buscarPorNome('car');
        assert.strictEqual(encontrados.length, 1);
        assert.strictEqual(encontrados[0].nome, 'Carla');
    });

    it('deve remover funcionário usando filter com arrow function', () => {
        const removerPorId = (id) => lista.filter((f) => f.id !== id);
        const novaLista = removerPorId(101);
        assert.strictEqual(novaLista.length, 2);
        assert.strictEqual(novaLista.find((f) => f.id === 101), undefined);
    });
});

describe('Exercício 4: Relatórios com Métodos de Array (Streams)', () => {
    const funcionarios = [
        new Funcionario('Ana Silva', 29, 'Dev Front-end', 4500, 1),
        new Funcionario('Bruno Costa', 35, 'Dev Back-end', 7500, 2),
        new Funcionario('Carla Dias', 27, 'Dev Front-end', 5200, 3),
        new Funcionario('Daniel Lima', 40, 'Tech Lead', 12000, 4),
        new Funcionario('Elisa Martins', 23, 'Designer', 3800, 5)
    ];

    it('Relatório 1: deve filtrar funcionários com salário maior que R$ 5.000', () => {
        const resultado = filtrarSalarioMaiorQue5000(funcionarios);
        assert.strictEqual(resultado.length, 3);
        const nomes = resultado.map((f) => f.nome);
        assert.deepStrictEqual(nomes, ['Bruno Costa', 'Carla Dias', 'Daniel Lima']);
    });

    it('Relatório 2: deve calcular a média salarial corretamente com reduce', () => {
        // (4500 + 7500 + 5200 + 12000 + 3800) / 5 = 33000 / 5 = 6600
        const media = calcularMediaSalarial(funcionarios);
        assert.strictEqual(media, 6600);
        assert.strictEqual(calcularMediaSalarial([]), 0);
    });

    it('Relatório 3: deve listar apenas os cargos únicos sem repetição usando Set', () => {
        const cargosUnicos = obterCargosUnicos(funcionarios);
        assert.strictEqual(cargosUnicos.length, 4);
        assert.deepStrictEqual(cargosUnicos, [
            'Dev Front-end',
            'Dev Back-end',
            'Tech Lead',
            'Designer'
        ]);
    });

    it('Relatório 4: deve criar lista de nomes em maiúsculo usando map', () => {
        const nomesMaiusculos = obterNomesEmMaiusculo(funcionarios);
        assert.deepStrictEqual(nomesMaiusculos, [
            'ANA SILVA',
            'BRUNO COSTA',
            'CARLA DIAS',
            'DANIEL LIMA',
            'ELISA MARTINS'
        ]);
    });
});
