// Olá, as setas (↓ e ↑) mostram qual parte do código que estou comentando :p

// Constante que abre e fecha o modal. ↓ 
const Modal = {
    open() {
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active');
    },
    close() {
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active');
    }
};

//  Constante que guarda as funções de contagem
// na tabela e na parte de balanço. ↓
const BalanceValues = {

    //  Propriedade da constante que tem
    // todas as transações. ↓
    all: [{
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021'
        },
        {
            description: 'Website',
            amount: 500000,
            date: '23/01/2021'
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '23/01/2021'
        }
    ],

    //  Função que adiciona uma nova transação ao
    // array de transações. ↓
    add(transaction) {
        BalanceValues.all.push(transaction);

        App.reload();
    },

    //  Função que remove uma transação do array
    // de transações. ↓
    remove(index) {
        BalanceValues.all.splice(index, 1);

        App.reload();
    },

    // Função que calcula as entradas. ↓
    incomes() {
        // soma as entradas
        let income = 0;

        BalanceValues.all.forEach(function (transaction) {
            transaction.amount > 0 ? income += transaction.amount : income += 0;
        });

        return income;
    },

    // Função que calcula as saídas. ↓
    expenses() {
        // soma as saídas
        let expense = 0

        BalanceValues.all.forEach(function (transaction) {
            transaction.amount < 0 ? expense += transaction.amount : expense += 0;
        });

        return expense;
    },

    // Função que calcula o total. ↓ 
    total() {
        // entradas - saídas
        return BalanceValues.incomes() + BalanceValues.expenses();
    }
};

// Aqui ficam todos as funções que trabalham mudando a página
// usando o DOM. ↓
const DOM = {
    // Seleção da tabela usando o DOM ↓
    transactionsContainer: document.querySelector('#data-table tbody'),

    // Aqui o elemento da tabela é criado e é chamado ali no
    // final desse aquivo, linha 78 ↓
    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
        DOM.transactionsContainer.appendChild(tr);
    },

    // Elemento html da tabela é modificado aqui ↓
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense";
        const amount = Util.formatCurrency(transaction.amount);
        const html =
            `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        `
        return html;
    },

    // Atualização das entradas e das saídas ↓
    updateBalanceValues() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Util.formatCurrency(BalanceValues.incomes());

        document
            .getElementById('expenseDisplay')
            .innerHTML = Util.formatCurrency(BalanceValues.expenses());

        document
            .querySelector('#totalDisplay')
            .innerHTML = Util.formatCurrency(BalanceValues.total());
    },
    // Limpeza da  tabela antes de dar um reload, pra poder colocar
    // as informações velhas e novas juntas ↓
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = '';
    }
};

//  Constante que guarda a função de colocar a 
// formatação da moeda. ↓
const Util = {
    // Formatação do valor da transação. ↓
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value;
    },

    //  Função que formata o valor inserido, tirando as
    // vírgulas e os pontos. ↓
    formatAmount(value) {
        return value = Number(value) * 100;
    },

    // Função que formata a data. ↓
    formatDate(date) {
        const splittedDate = date.split("-");
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    }
}

const Form = {

    // Propriedades que vem junto do formulário. ↓
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    //  Função que retorna o valor dos inputs
    // do DOM. ↓
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    // Função que valida os campos do Form. ↓
    validateFields() {
        const {
            description,
            amount,
            date
        } = Form.getValues();

        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") { // verifica se os campos estão vazios.
            throw new Error("Por favor, preencha todos os campos.");
        }

    },

    // Função que formata os dados. ↓
    formatValues() {
        let {
            description,
            amount,
            date
        } = Form.getValues();

        amount = Util.formatAmount(amount);
        date = Util.formatDate(date);

        console.log(description, amount, date);
        return {
            description,
            amount,
            date
        }
    },
    clearFields() {
        Form.description.value = '';
        Form.amount.value = '';
        Form.date.value = '';
    },

    //  Função que cuida das informações do
    // formulário e coloca no array. ↓
    submit(event) {
        event.preventDefault();

        try {
            // Os campos são validados (ver se não estão vazios). ↓
            Form.validateFields();

            // Os dados são formatados pra D/M/A. ↓
            const transaction = Form.formatValues();

            // Os dados são salvos. ↓
            BalanceValues.add(transaction);

            // Os campos são limpos. ↓
            Form.clearFields();

            // Por fim, modal é fechado. ↓
            Modal.close();

        } catch (error) {
            alert(error.message);
        }
    }
};

//  Constante com as 'maiores' funções da página,
// como carregar as funções iniciais. ↓
const App = {

    //  Aqui ele cria cada um dos <tr> na página e 
    // depois atualiza os valores na página. ↓
    init() {
        BalanceValues.all.forEach(transaction => {
            DOM.addTransaction(transaction);
        })
        DOM.updateBalanceValues();
    },

    //  Função de recarregamento da página,
    // caso o array seja atualizado. ↓
    reload() {
        DOM.clearTransactions();
        App.init();
    }
};

// Função é chamada pra iniciar a aplicação. ↓
App.init();