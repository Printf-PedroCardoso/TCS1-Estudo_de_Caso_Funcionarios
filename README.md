# 🚀 Sistema de Gestão de Funcionários — Startup de Tecnologia
> **Atividade Prática 2 (EC02)** — Desenvolvimento de Software & JavaScript Moderno

Aplicação web interativa para gestão de funcionários de uma startup de tecnologia, desenvolvida com **HTML5, CSS3 moderno e JavaScript (ES6+)**. Demonstra conceitos de **Programação Orientada a Objetos (POO)**, **Manipulação do DOM**, **Funções Anônimas vs Expressões Lambda (Arrow Functions)** e processamento de dados via **Streams JS (map, filter, reduce)**.

---

## 📋 Sumário dos Exercícios Implementados

### 🔹 Exercício 1 – Cadastro e Listagem de Funcionários
- **Interface e Formulário HTML:** Campos para `Nome` (text), `Idade` (number), `Cargo` (text) e `Salário` (number).
- **Classe `Funcionario`:**
  - Atributos privados e encapsulados (`_id`, `_nome`, `_idade`, `_cargo`, `_salario`).
  - Métodos de acesso (**getters** e **setters**) com validações de integridade.
  - Método `toString()` customizado exibindo todos os dados formatados.
- **Armazenamento e Tabela HTML:** Armazena os objetos instanciados em um array e os renderiza dinamicamente em uma `<table>`.

### 🔹 Exercício 2 – Excluir e Alterar Funcionários
- **Exclusão:** Botão *"Excluir"* em cada linha da tabela que remove o registro e atualiza a visualização.
- **Edição:** Botão *"Editar"* que carrega os dados do colaborador no formulário para alteração.
- **Atualização via Métodos:** Atualiza os atributos do funcionário chamando os métodos da própria instância da classe `Funcionario`.
- **Eventos:** Uso de eventos `onclick` com funções anônimas.

### 🔹 Exercício 3 – Funções Anônimas e Expressões Lambda
- **Refatoração com Arrow Functions:** Manipulação de array de funcionários (busca por ID ou termo, remoção e atualização) utilizando expressões lambda (`=>`).
- **Demonstração Didática:** Comparação explícita entre a sintaxe de uma função anônima tradicional e uma arrow function:

```javascript
// 1. Função Anônima Tradicional (busca):
const buscarPorIdTradicional = function(id) {
    return funcionarios.find(function(f) {
        return f.id === id;
    });
};

// 2. Substituição por Expressão Lambda / Arrow Function:
const buscarPorId = (id) => funcionarios.find((f) => f.id === id);
```

### 🔹 Exercício 4 – Relatórios com Métodos de Array (Streams JS)
Geração de quatro relatórios dinâmicos calculados e atualizados em tempo real:
1. **Salário > R$ 5.000:** Utiliza `Array.prototype.filter()`.
2. **Média Salarial:** Utiliza `Array.prototype.reduce()` para somar as remunerações e calcular a média.
3. **Cargos Únicos:** Utiliza `Array.prototype.map()` em conjunto com `new Set()` para eliminar repetições.
4. **Nomes em Maiúsculo:** Utiliza `Array.prototype.map()` e `.toUpperCase()`.

---

## 📂 Estrutura do Projeto

```plaintext
atividade 2/
├── .dockerignore
├── .gitignore
├── Dockerfile                   # Configuração de container Nginx Alpine
├── docker-compose.yml           # Orquestração do container Docker para desenvolvimento
├── index.html                   # Interface do sistema e formulários
├── package.json                 # Configuração do projeto e runner de testes
├── README.md                    # Documentação completa
├── css/
│   └── styles.css               # Estilos modernos, responsivos e acessíveis
├── js/
│   ├── Funcionario.js           # Classe Funcionario com getters/setters e toString()
│   ├── app.js                   # Lógica da aplicação, eventos e manipulação de DOM
│   └── relatorios.js            # Módulo de relatórios com Streams (map, filter, reduce, Set)
├── tests/
│   └── funcionario.test.js      # Testes automatizados unitários (Node test runner)
└── EC02 - Funcionarios.pdf       # Especificação do estudo de caso
```

---

## 🐳 Executando com Docker

Conforme solicitado nas observações da atividade, o projeto está totalmente configurado para execução em container Docker:

### Opção 1: Usando Docker Compose (Recomendado)

Na raiz do projeto, execute:

```bash
docker compose up -d --build
```

Acesse no navegador:
👉 **[http://localhost:8080](http://localhost:8080)**

Para parar o container:
```bash
docker compose down
```

### Opção 2: Usando Docker CLI diretamente

1. Construir a imagem:
```bash
docker build -t gestao-funcionarios .
```

2. Executar o container:
```bash
docker run -d -p 8080:80 --name gestao_funcionarios_app gestao-funcionarios
```

---

## 🧪 Testes Automatizados

O projeto inclui uma suíte de testes unitários que valida a classe `Funcionario`, seus métodos de validação, os métodos de manipulação com lambdas e todas as funções de relatório do Exercício 4.

Para rodar os testes:

```bash
npm test
```

Resultado esperado:
```
✔ Exercício 1: Classe Funcionario (4 testes passando)
✔ Exercício 3: Manipulação de array com Arrow Functions (3 testes passando)
✔ Exercício 4: Relatórios com Métodos de Array (Streams) (4 testes passando)
ℹ tests 11 passed (100%)
```

---

## 🐙 Como versionar e compartilhar no GitHub

Conforme o requisito de versionamento:

1. O repositório Git local já foi inicializado com a branch principal `main`.
2. Para vincular ao seu repositório remoto no GitHub:

```bash
# Crie um novo repositório vazio no seu GitHub e depois execute:
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git

# Envie os commits para o GitHub:
git push -u origin main
```

---

## 💡 Destaques de Implementação
- **Validações robustas:** Campos vazios, valores numéricos negativos ou idades inválidas são interceptados com mensagens explicativas.
- **Design Responsivo:** Adaptável a desktops, tablets e smartphones.
- **Feedback Visual (Toast Notifications):** Alertas suaves para confirmação de cadastro, edição, exclusão e erros.
- **Busca em tempo real:** Barra de pesquisa instantânea para filtrar por nome, ID ou cargo.
- **Recarregar Exemplos:** Botão prático para repovoar o sistema com dados de teste.
