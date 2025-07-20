// Income inputs
const incomeDescription = document.getElementById('income-description');
const incomeAmount = document.getElementById('income-amount');

// Expense inputs
const expenseDescription = document.getElementById('expense-description');
const expenseCategory = document.getElementById('expense-category');
const expenseAmount = document.getElementById('expense-amount');

// Output fields
const transactionList = document.getElementById('transaction-history');
const totalExpense = document.getElementById('total-expenses');
const totalIncome = document.getElementById('total-income');
const balance = document.getElementById('balance');

// ✅ Called when "Add Income" button is clicked
function addIncome() {
    const description = incomeDescription.value.trim();
    const amount = parseFloat(incomeAmount.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    addTransaction(description, amount, 'Income');
    updateSummary();
    clearIncomeInputs();
}

// ✅ Called when "Add Expense" button is clicked
function addExpense() {
    const description = expenseDescription.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());
    const category = expenseCategory.value;

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    addTransaction(description, amount, category);
    updateSummary();
    clearExpenseInputs();
}

// Add a row to the table
function addTransaction(description, amount, category) {
    const transactionRow = document.createElement('tr');

    transactionRow.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${category === 'Income' ? 'Income' : 'Expense'}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    transactionList.appendChild(transactionRow);

    transactionRow.querySelector('.delete-btn').addEventListener('click', function () {
        transactionRow.remove();
        updateSummary();
    });
}

// Recalculate totals
function updateSummary() {
    let totalExpenses = 0;
    let totalIncomes = 0;

    const transactions = transactionList.querySelectorAll('tr');

    transactions.forEach(function (transaction) {
        const amount = parseFloat(transaction.children[2].textContent);
        const type = transaction.children[3].textContent;

        if (type === 'Income') {
            totalIncomes += amount;
        } else {
            totalExpenses += amount;
        }
    });

    totalExpense.textContent = totalExpenses.toFixed(2);
    totalIncome.textContent = totalIncomes.toFixed(2);
    balance.textContent = (totalIncomes - totalExpenses).toFixed(2);
}

// Clear input fields
function clearIncomeInputs() {
    incomeDescription.value = '';
    incomeAmount.value = '';
}

function clearExpenseInputs() {
    expenseDescription.value = '';
    expenseAmount.value = '';
    expenseCategory.value = 'Housing';
}

// Optional: Clear all transactions
function clearAll() {
    transactionList.innerHTML = '';
    updateSummary();
}
