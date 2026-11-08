/**
 * Aplicação Principal - Gestão de Funcionários de uma Startup
 * 
 * Contempla:
 * - Exercício 1: Formulário HTML, Classe Funcionario, Construtor, Get/Set, toString(), <table>
 * - Exercício 2: Excluir e Alterar Funcionários, Manipulação de DOM, Métodos da classe, onclick anônimo
 * - Exercício 3: Funções Anônimas vs Expressões Lambda (Arrow Functions) para manipulação de array
 * - Exercício 4: Relatórios com Streams JS (map, filter, reduce, new Set())
 */

import { Funcionario } from './Funcionario.js';
import {
    filtrarSalarioMaiorQue5000,
    calcularMediaSalarial,
    obterCargosUnicos,
    obterNomesEmMaiusculo
} from './relatorios.js';

// ============================================================================
// ESTADO DA APLICAÇÃO (Array de Funcionários)
// ============================================================================

/** @type {Array<Funcionario>} */
let funcionarios = [];

// ============================================================================
// DADOS DE EXEMPLO (Startup Tech)
// ============================================================================
const carregarDadosIniciais = () => {
    funcionarios = [
        new Funcionario('Ana Carolina Souza', 29, 'Desenvolvedora Full Stack', 8500, 101),
        new Funcionario('Lucas Mendes', 24, 'Desenvolvedor Front-end', 4500, 102),
        new Funcionario('Beatriz Lima', 34, 'Tech Lead', 14200, 103),
        new Funcionario('Gabriel Rocha', 28, 'Designer UI/UX', 5200, 104),
        new Funcionario('Mariana Oliveira', 23, 'Desenvolvedor Front-end', 3900, 105),
        new Funcionario('Rodrigo Alves', 38, 'Product Manager', 9800, 106)
    ];
};

// ============================================================================
// ELEMENTOS DO DOM
// ============================================================================
const formFuncionario = document.getElementById('form-funcionario');
const inputId = document.getElementById('funcionario-id');
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const inputCargo = document.getElementById('cargo');
const inputSalario = document.getElementById('salario');
const btnSubmit = document.getElementById('btn-submit');
const btnSubmitText = document.getElementById('btn-submit-text');
const btnCancelar = document.getElementById('btn-cancelar');
const formHeadingText = document.getElementById('form-heading-text');
const formIcon = document.getElementById('form-icon');

const tabelaCorpo = document.getElementById('tabela-corpo');
const tabelaVazia = document.getElementById('tabela-vazia');
const badgeTotal = document.getElementById('badge-total');
const inputBusca = document.getElementById('input-busca');
const btnResetDados = document.getElementById('btn-reset-dados');

// Elementos de Relatório
const relatorioSalarioQtd = document.getElementById('relatorio-salario-qtd');
const relatorioSalarioLista = document.getElementById('relatorio-salario-lista');
const relatorioMediaValor = document.getElementById('relatorio-media-valor');
const relatorioFolhaTotal = document.getElementById('relatorio-folha-total');
const relatorioCargosQtd = document.getElementById('relatorio-cargos-qtd');
const relatorioCargosLista = document.getElementById('relatorio-cargos-lista');
const relatorioNomesQtd = document.getElementById('relatorio-nomes-qtd');
const relatorioNomesLista = document.getElementById('relatorio-nomes-lista');

// Container de Toast
const toastContainer = document.getElementById('toast-container');

// ============================================================================
// EXERCÍCIO 3 - COMPARAÇÃO DIDÁTICA: FUNÇÃO ANÔNIMA TRADICIONAL vs ARROW FUNCTION
// ============================================================================
/*
 * Exemplo 1: Função Anônima Tradicional para busca:
 * const buscarPorIdTradicional = function(id) {
 *     return funcionarios.find(function(func) {
 *         return func.id === id;
 *     });
 * };
 *
 * Exemplo 2: Substituída por Expressão Lambda / Arrow Function (Exercício 3):
 * Abaixo estão todas as funções de manipulação reescritas com Arrow Functions:
 */

/**
 * Busca um funcionário pelo ID usando Arrow Function (Lambda)
 * @param {number} id
 * @returns {Funcionario|undefined}
 */
const buscarPorId = (id) => funcionarios.find((func) => func.id === id);

/**
 * Busca funcionários por termo (nome, cargo ou ID) usando Arrow Function (Lambda)
 * @param {string} termo
 * @returns {Array<Funcionario>}
 */
const buscarFuncionariosPorTermo = (termo) => {
    const termoLimpo = termo.trim().toLowerCase();
    if (!termoLimpo) return funcionarios;

    return funcionarios.filter((func) => 
        func.nome.toLowerCase().includes(termoLimpo) ||
        func.cargo.toLowerCase().includes(termoLimpo) ||
        String(func.id).includes(termoLimpo)
    );
};

/**
 * Remove um funcionário pelo ID usando Arrow Function (Lambda)
 * @param {number} id
 */
const removerFuncionario = (id) => {
    funcionarios = funcionarios.filter((func) => func.id !== id);
};

/**
 * Atualiza um funcionário existente utilizando os métodos setters da classe Funcionario
 * Exigência do Exercício 2: "Use métodos da classe Funcionario para atualizar os atributos"
 * @param {number} id
 * @param {{nome: string, idade: number, cargo: string, salario: number}} novosDados
 */
const atualizarFuncionario = (id, novosDados) => {
    const funcionario = buscarPorId(id);
    if (!funcionario) {
        throw new Error(`Funcionário com ID ${id} não encontrado.`);
    }

    // Uso explícito dos métodos de acesso (setters) da classe Funcionario
    funcionario.nome = novosDados.nome;
    funcionario.idade = novosDados.idade;
    funcionario.cargo = novosDados.cargo;
    funcionario.salario = novosDados.salario;

    console.log(`[Exercício 1 - toString]: ${funcionario.toString()}`);
    return funcionario;
};

// ============================================================================
// FEEDBACK VISUAL (TOAST NOTIFICATIONS)
// ============================================================================
const showToast = (mensagem, tipo = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    const icon = tipo === 'success' ? '✅' : tipo === 'error' ? '❌' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${mensagem}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
};

// ============================================================================
// RENDERIZAÇÃO DA TABELA HTML (Exercício 1, 2 e 3)
// ============================================================================
const renderizarTabela = (lista = funcionarios) => {
    tabelaCorpo.innerHTML = '';
    badgeTotal.textContent = `${funcionarios.length} cadastrado${funcionarios.length === 1 ? '' : 's'}`;

    if (lista.length === 0) {
        tabelaVazia.style.display = 'block';
        return;
    }

    tabelaVazia.style.display = 'none';

    lista.forEach((func) => {
        const tr = document.createElement('tr');

        // Criação das colunas da tabela
        tr.innerHTML = `
            <td><span class="employee-badge-id">#${func.id}</span></td>
            <td><span class="employee-name">${func.nome}</span></td>
            <td>${func.idade} anos</td>
            <td><span class="cargo-chip">${func.cargo}</span></td>
            <td><span class="employee-salary">${func.salarioFormatado}</span></td>
            <td style="text-align: center;">
                <div class="employee-actions" style="justify-content: center;">
                    <button class="btn btn-sm btn-edit-soft btn-editar" title="Editar funcionário">
                        ✏️ Editar
                    </button>
                    <button class="btn btn-sm btn-danger-soft btn-excluir" title="Excluir funcionário">
                        🗑️ Excluir
                    </button>
                </div>
            </td>
        `;

        // ====================================================================
        // EXERCÍCIO 2 & 3: EVENTOS ONCLICK COM FUNÇÕES ANÔNIMAS
        // ====================================================================
        
        // 1. Botão "Editar" com função anônima
        const btnEditar = tr.querySelector('.btn-editar');
        btnEditar.onclick = function() {
            carregarFormularioParaEdicao(func.id);
        };

        // 2. Botão "Excluir" com função anônima
        const btnExcluir = tr.querySelector('.btn-excluir');
        btnExcluir.onclick = function() {
            if (confirm(`Deseja realmente excluir o funcionário "${func.nome}"?`)) {
                // Manipulação via arrow function (Exercício 3)
                removerFuncionario(func.id);
                renderizarInterface();
                showToast(`Funcionário "${func.nome}" excluído com sucesso.`, 'info');
            }
        };

        tabelaCorpo.appendChild(tr);
    });
};

// ============================================================================
// RENDERIZAÇÃO DOS RELATÓRIOS (Exercício 4)
// ============================================================================
const renderizarRelatorios = () => {
    // 1. Funcionários com salário > R$ 5.000 (filter)
    const comSalarioMaior = filtrarSalarioMaiorQue5000(funcionarios);
    relatorioSalarioQtd.textContent = comSalarioMaior.length;
    relatorioSalarioLista.innerHTML = '';
    if (comSalarioMaior.length === 0) {
        relatorioSalarioLista.innerHTML = '<li style="color: var(--text-muted); justify-content: center;">Nenhum funcionário</li>';
    } else {
        comSalarioMaior.forEach((f) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${f.nome}</span> <strong>${f.salarioFormatado}</strong>`;
            relatorioSalarioLista.appendChild(li);
        });
    }

    // 2. Média Salarial (reduce)
    const media = calcularMediaSalarial(funcionarios);
    relatorioMediaValor.textContent = media.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    
    // Folha de pagamento total com reduce
    const folhaTotal = funcionarios.reduce((acc, f) => acc + f.salario, 0);
    relatorioFolhaTotal.textContent = folhaTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    // 3. Cargos Únicos sem repetição (map + new Set)
    const cargosUnicos = obterCargosUnicos(funcionarios);
    relatorioCargosQtd.textContent = cargosUnicos.length;
    relatorioCargosLista.innerHTML = '';
    if (cargosUnicos.length === 0) {
        relatorioCargosLista.innerHTML = '<span style="color: var(--text-muted); font-size: 0.8rem;">Nenhum cargo</span>';
    } else {
        cargosUnicos.forEach((cargo) => {
            const span = document.createElement('span');
            span.className = 'cargo-chip';
            span.textContent = cargo;
            relatorioCargosLista.appendChild(span);
        });
    }

    // 4. Lista de Nomes em Maiúsculo (map)
    const nomesMaiusculos = obterNomesEmMaiusculo(funcionarios);
    relatorioNomesQtd.textContent = nomesMaiusculos.length;
    relatorioNomesLista.innerHTML = '';
    if (nomesMaiusculos.length === 0) {
        relatorioNomesLista.innerHTML = '<li style="color: var(--text-muted); justify-content: center;">Nenhum nome</li>';
    } else {
        nomesMaiusculos.forEach((nome) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>🔤 ${nome}</span>`;
            relatorioNomesLista.appendChild(li);
        });
    }
};

// ============================================================================
// ATUALIZAÇÃO GERAL DA INTERFACE
// ============================================================================
const renderizarInterface = () => {
    const termo = inputBusca ? inputBusca.value : '';
    const filtrados = buscarFuncionariosPorTermo(termo);
    renderizarTabela(filtrados);
    renderizarRelatorios();
};

// ============================================================================
// FORMULÁRIO: CARREGAR PARA EDIÇÃO E RESETAR (Exercício 2)
// ============================================================================
const carregarFormularioParaEdicao = (id) => {
    // Busca com Arrow Function (Exercício 3)
    const func = buscarPorId(id);
    if (!func) return;

    inputId.value = func.id;
    inputNome.value = func.nome;
    inputIdade.value = func.idade;
    inputCargo.value = func.cargo;
    inputSalario.value = func.salario;

    // Atualização dos textos da UI para o modo de edição
    formHeadingText.textContent = 'Editar Funcionário';
    formIcon.textContent = '✏️';
    btnSubmitText.textContent = 'Salvar Alterações';
    btnCancelar.style.display = 'inline-flex';

    // Foco suave no formulário
    inputNome.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetarFormulario = () => {
    formFuncionario.reset();
    inputId.value = '';
    formHeadingText.textContent = 'Cadastrar Funcionário';
    formIcon.textContent = '➕';
    btnSubmitText.textContent = 'Cadastrar';
    btnCancelar.style.display = 'none';
};

// ============================================================================
// EVENT LISTENERS (Exercício 1, 2 e 3)
// ============================================================================

// 1. Submissão do Formulário (utilizando função anônima no submit)
formFuncionario.onsubmit = function(event) {
    event.preventDefault();

    const id = inputId.value ? Number(inputId.value) : null;
    const nome = inputNome.value;
    const idade = Number(inputIdade.value);
    const cargo = inputCargo.value;
    const salario = Number(inputSalario.value);

    try {
        if (id) {
            // MODO EDIÇÃO (Exercício 2):
            // Atualiza o funcionário existente chamando os métodos da classe Funcionario
            const atualizado = atualizarFuncionario(id, { nome, idade, cargo, salario });
            showToast(`Funcionário "${atualizado.nome}" atualizado com sucesso!`, 'success');
        } else {
            // MODO CADASTRO (Exercício 1):
            // Instancia novo objeto da classe Funcionario com construtor e getters/setters
            const novoFunc = new Funcionario(nome, idade, cargo, salario);
            funcionarios.push(novoFunc);
            console.log(`[Exercício 1 - toString]: ${novoFunc.toString()}`);
            showToast(`Funcionário "${novoFunc.nome}" cadastrado com sucesso!`, 'success');
        }

        resetarFormulario();
        renderizarInterface();
    } catch (erro) {
        showToast(erro.message || 'Erro ao processar dados.', 'error');
    }
};

// 2. Botão Cancelar Edição com função anônima
btnCancelar.onclick = function() {
    resetarFormulario();
    showToast('Edição cancelada.', 'info');
};

// 3. Busca em tempo real com Arrow Function
inputBusca.oninput = () => {
    const termo = inputBusca.value;
    const filtrados = buscarFuncionariosPorTermo(termo);
    renderizarTabela(filtrados);
};

// 4. Restaurar dados iniciais
btnResetDados.onclick = function() {
    carregarDadosIniciais();
    resetarFormulario();
    renderizarInterface();
    showToast('Dados de exemplo recarregados!', 'info');
};

// 5. Acordeon didático
document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.onclick = function() {
        const item = this.parentElement;
        item.classList.toggle('active');
    };
});

// ============================================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================================================
carregarDadosIniciais();
renderizarInterface();
