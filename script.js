// DOM Elements
const userPhoto = document.getElementById('user-photo');
const username = document.getElementById('username');
const balance = document.getElementById('balance');
const allTab = document.getElementById('all-tab');
const expensesTab = document.getElementById('expenses-tab');
const incomeTab = document.getElementById('income-tab');
const tabContent = document.getElementById('tab-content');
const addButton = document.getElementById('add-button');
const navItems = document.querySelectorAll('.nav-item');
const searchInput = document.querySelector('.search-icon');
const modal = document.getElementById('add-transaction-modal');
const closeModal = document.getElementById('close-modal');
const addTransactionForm = document.getElementById('add-transaction-form');
const editModal = document.getElementById('edit-transaction-modal');
const closeEditModal = document.getElementById('close-edit-modal');
const editTransactionForm = document.getElementById('edit-transaction-form');
let currentTransactionIndex = null; // To track the transaction being edited

// Sample data for transactions
const transactions = {
    all: [
        { date: '2025-04-20', description: 'Groceries', amount: '-$50.00' },
        { date: '2025-04-21', description: 'Salary', amount: '+$2000.00' },
        { date: '2025-04-22', description: 'Electricity Bill', amount: '-$100.00' }
    ],
    expenses: [
        { date: '2025-04-20', description: 'Groceries', amount: '-$50.00' },
        { date: '2025-04-22', description: 'Electricity Bill', amount: '-$100.00' }
    ],
    income: [
        { date: '2025-04-21', description: 'Salary', amount: '+$2000.00' }
    ]
};

// Utility Functions
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactions() {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
        Object.assign(transactions, JSON.parse(savedTransactions));
    }
}

// Function to update the balance dynamically
function updateBalance(newBalance) {
    balance.textContent = newBalance.toFixed(2);
}

// Function to update the username dynamically
function updateUsername(newName) {
    username.textContent = newName;
}

// Function to handle tab switching
function showTab(tab) {
    // Update the active tab button
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    document.getElementById(`${tab}-tab`).classList.add('active');

    // Update the content based on the selected tab
    const tabTransactions = transactions[tab];
    if (tabTransactions) {
        tabContent.innerHTML = tabTransactions
            .map(
                (transaction, index) =>
                    `<div class="transaction-item" data-index="${index}">
                        <span class="transaction-date">${transaction.date}</span>
                        <span class="transaction-description">${transaction.description}</span>
                        <span class="transaction-amount">${transaction.amount}</span>
                    </div>`
            )
            .join('');
        addTransactionClickEvents(); // Add click events to the transactions
    } else {
        tabContent.innerHTML = '<p>No transactions available.</p>';
    }
}

// Function to open the edit modal with transaction details
function openEditModal(index) {
    const transaction = transactions.all[index];
    currentTransactionIndex = index;

    // Pre-fill the form with transaction details
    document.getElementById('edit-description').value = transaction.description;
    document.getElementById('edit-amount').value = parseFloat(transaction.amount.replace(/[^\d.-]/g, ''));
    document.getElementById('edit-type').value = transaction.amount.startsWith('+') ? 'income' : 'expense';

    // Show the modal
    editModal.classList.remove('hidden');
}

// Add click event to each transaction item
function addTransactionClickEvents() {
    document.querySelectorAll('.transaction-item').forEach((item, index) => {
        item.addEventListener('click', () => openEditModal(index));
    });
}

// Event Listeners
allTab.addEventListener('click', () => showTab('all'));
expensesTab.addEventListener('click', () => showTab('expenses'));
incomeTab.addEventListener('click', () => showTab('income'));

addButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

closeEditModal.addEventListener('click', () => {
    editModal.classList.add('hidden');
});

addTransactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    // Create a new transaction object
    const newTransaction = {
        date: new Date().toISOString().split('T')[0],
        description,
        amount: type === 'income' ? `+${amount}` : `-${amount}`
    };

    // Add the new transaction to the appropriate arrays
    transactions.all.unshift(newTransaction);
    if (type === 'income') {
        transactions.income.unshift(newTransaction);
    } else {
        transactions.expenses.unshift(newTransaction);
    }

    saveTransactions(); // Save to localStorage
    showTab('all'); // Refresh the "All" tab
    modal.classList.add('hidden'); // Close the modal
    addTransactionForm.reset(); // Reset the form
});

editTransactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get updated values
    const description = document.getElementById('edit-description').value;
    const amount = parseFloat(document.getElementById('edit-amount').value);
    const type = document.getElementById('edit-type').value;

    // Update the transaction
    transactions.all[currentTransactionIndex] = {
        date: transactions.all[currentTransactionIndex].date,
        description,
        amount: type === 'income' ? `+${amount}` : `-${amount}`
    };

    saveTransactions(); // Save to localStorage
    showTab('all'); // Refresh the UI
    editModal.classList.add('hidden'); // Close the modal
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredTransactions = transactions.all.filter(transaction =>
        transaction.description.toLowerCase().includes(query)
    );

    tabContent.innerHTML = filteredTransactions
        .map(
            transaction =>
                `<div class="transaction-item">
                    <span class="transaction-date">${transaction.date}</span>
                    <span class="transaction-description">${transaction.description}</span>
                    <span class="transaction-amount">${transaction.amount}</span>
                </div>`
        )
        .join('');
});

// Load transactions and initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    showTab('all');
});