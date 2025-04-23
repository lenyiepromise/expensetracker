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

// Event Listeners
allTab.addEventListener('click', () => showTab('all'));
expensesTab.addEventListener('click', () => showTab('expenses'));
incomeTab.addEventListener('click', () => showTab('income'));
addButton.addEventListener('click', () => alert('Add new transaction!'));

// Function to handle tab switching
function showTab(tab) {
	// Update the active tab button
	const tabs = document.querySelectorAll('.tab-button');
	tabs.forEach(button => button.classList.remove('active'));
	document.getElementById(`${tab}-tab`).classList.add('active');

	// Update the content based on the selected tab
	if (tab === 'all') {
		tabContent.innerHTML = '<p>All transactions will be displayed here.</p>';
	} else if (tab === 'expenses') {
		tabContent.innerHTML = '<p>Expenses transactions will be displayed here.</p>';
	} else if (tab === 'income') {
		tabContent.innerHTML = '<p>Income transactions will be displayed here.</p>';
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
		tabContent.innerHTML = tabTransactions
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
// Function to navigate to the "Report" tab
function navigateToReport() {
    const reportTab = document.getElementById('report-tab');
    if (reportTab) {
        showTab('all'); // Show all transactions in the report tab
        reportTab.click(); // Simulate a click on the "Report" tab
    } else {
        alert('Report tab not implemented yet.');
    }
}