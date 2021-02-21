// constante que abir e fecha o modal 
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
}

// constante que guarda as transações
const transactions = [{
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    }
]

const NewTransaction = {
    incomes() {
        // soma as entradas
    },
    expenses() {
        // soma as saídas
    },
    total() {
        // entradas - saídas 
    }
}

const TableItem = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        // aqui o elemento da tabela é criado e é chamado ali no 
        // final desse aquivo, linha 78 
        const tr = document.createElement('tr');
        tr.innerHTML = TableItem.innerHTMLTransaction(transaction);
        TableItem.transactionsContainer.appendChild(tr);
    },
    innerHTMLTransaction(transaction) {
        // elemento html da tabela é modificado aqui
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
    }
}

const Util = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value;
    }
}

// aqui ele cria cada um dos TR na página
transactions.forEach(function (transaction) {
    TableItem.addTransaction(transaction);
})