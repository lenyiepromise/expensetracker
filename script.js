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

// Event Listeners
allTab.addEventListener('click', () => showTab('all'));
expensesTab.addEventListener('click', () => showTab('expenses'));
incomeTab.addEventListener('click', () => showTab('income'));
addButton.addEventListener('click', () => alert('Add new transaction!'));
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredTransactions = transactions.all.filter(transaction =>
        transaction.description.toLowerCase().includes(query)
    );

    const tabContent = document.getElementById('tab-content');
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

// Function to handle tab switching
function showTab(tab) {
    // Update the active tab button
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(button => button.classList.remove('active'));
    document.getElementById(`${tab}-tab`).classList.add('active');

    // Update the content based on the selected tab
    const tabContent = document.getElementById('tab-content');
    const tabTransactions = transactions[tab];
    if (tabTransactions) {
        const limitedTransactions = tabTransactions.slice(0, 3); // Limit to 3 transactions
        tabContent.innerHTML = limitedTransactions
            .map(
                transaction =>
                    `<div class="transaction-item">
                        <span class="transaction-date">${transaction.date}</span>
                        <span class="transaction-description">${transaction.description}</span>
                        <span class="transaction-amount">${transaction.amount}</span>
                    </div>`
            )
            .join('');
    } else {
        tabContent.innerHTML = '<p>No transactions available.</p>';
    }
}

// Example: Update username dynamically
function updateUsername(newName) {
	username.textContent = newName;
}

// Example: Update balance dynamically
function updateBalance(newBalance) {
	balance.textContent = newBalance.toFixed(2);
}

// Example: Add functionality to navigation items
navItems.forEach(item => {
	item.addEventListener('click', () => {
		alert(`Navigating to ${item.querySelector('.nav-text').textContent}`);
	});
});

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

// Function to navigate to the "Report" tab
function navigateToReport() {
    // Simulate a click on the "All" tab to show all transactions
    const tabContent = document.getElementById('tab-content');
    const allTransactions = transactions.all;

    // Populate the tab-content with all transactions
    tabContent.innerHTML = allTransactions
        .map(
            transaction =>
                `<div class="transaction-item">
                    <span class="transaction-date">${transaction.date}</span>
                    <span class="transaction-description">${transaction.description}</span>
                    <span class="transaction-amount">${transaction.amount}</span>
                </div>`
        )
        .join('');

    // Highlight the "Report" tab in the bottom navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    const reportTab = Array.from(navItems).find(item =>
        item.querySelector('.nav-text')?.textContent === 'Report'
    );
    if (reportTab) {
        reportTab.classList.add('active');
    }
}

// Example data for the chart
const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [{
        label: 'Income vs Expenses',
        data: [2000, 1500], // Replace with dynamic data
        backgroundColor: ['#4caf50', '#f44336'],
    }]
};

// Render the chart using Chart.js
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie', // Change to 'bar' for a bar chart
        data: chartData,
    });
});

// Make the "All" tab active by default when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    showTab('all');
});

// Modal functionality
const modal = document.getElementById('add-transaction-modal');
const closeModal = document.getElementById('close-modal');
const addTransactionForm = document.getElementById('add-transaction-form');

addButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

addTransactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    // Create a new transaction object
    const newTransaction = {
        date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        description,
        amount: type === 'income' ? `+${amount}` : `-${amount}`
    };

    // Add the new transaction to the beginning of the appropriate array
    if (type === 'income') {
        transactions.income.unshift(newTransaction);
    } else {
        transactions.expenses.unshift(newTransaction);
    }

    // Add the new transaction to the "All" array
    transactions.all.unshift(newTransaction);

    // Save transactions to localStorage (if implemented)
    saveTransactions();

    // Refresh the "All" tab to show the updated list
    showTab('all');

    // Close the modal
    modal.classList.add('hidden');

    // Reset the form
    addTransactionForm.reset();
});

// Save transactions to localStorage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Load transactions from localStorage
function loadTransactions() {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
        Object.assign(transactions, JSON.parse(savedTransactions));
    }
}

// Call loadTransactions on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    showTab('all');
});