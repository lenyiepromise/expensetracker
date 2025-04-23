// Safely get DOM elements
const addButton = document.getElementById('add-button');
const modal = document.getElementById('add-transaction-modal');
const closeModal = document.getElementById('close-modal');
const addTransactionForm = document.getElementById('add-transaction-form');

// Check if the elements exist before adding event listeners
if (addButton && modal && closeModal && addTransactionForm) {
    addButton.addEventListener('click', () => {
        modal.classList.remove('hidden'); // Show the modal
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden'); // Hide the modal
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

        console.log('Transaction Added:', newTransaction);

        // Close the modal and reset the form
        modal.classList.add('hidden');
        addTransactionForm.reset();
    });
} else {
    console.warn('Add Transaction elements are not present on this page.');
}