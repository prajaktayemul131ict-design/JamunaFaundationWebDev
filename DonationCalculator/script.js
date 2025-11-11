document.addEventListener('DOMContentLoaded', () => {
    const displayAmount = document.getElementById('display-amount');
    const displayImpact = document.getElementById('display-impact');
    const keys = document.querySelector('.keys');
    
    // Define the cost per unit of impact (e.g., cost to plant one tree)
    const COST_PER_TREE = 5; // $5 per tree
    let currentDonationAmount = 0;

    /**
     * Updates the display elements with the current amount and calculated impact.
     */
    function updateDisplay(amount) {
        // Ensure the amount is a valid number
        const safeAmount = Math.max(0, parseFloat(amount) || 0); 
        currentDonationAmount = safeAmount;
        
        // Calculate impact (trees planted)
        const treesPlanted = Math.floor(safeAmount / COST_PER_TREE);

        displayAmount.textContent = `Amount: $${safeAmount.toFixed(2)}`;
        displayImpact.textContent = `Impact: ${treesPlanted} Trees`;
    }

    /**
     * Clears the current calculation and resets the display.
     */
    function clearCalculator() {
        updateDisplay(0);
        alert('Calculation cleared!');
    }

    /**
     * Handles the button clicks for the entire keys container.
     */
    keys.addEventListener('click', (event) => {
        const target = event.target;

        if (!target.matches('button')) {
            return; // Ignore clicks that are not on buttons
        }

        if (target.classList.contains('amount-btn')) {
            // Handle preset donation amount buttons
            const value = parseFloat(target.dataset.value);
            updateDisplay(value);

        } else if (target.classList.contains('impact-btn')) {
            // Handle impact calculation buttons (calculate required donation)
            const treesNeeded = parseFloat(target.dataset.impact);
            const requiredAmount = treesNeeded * COST_PER_TREE;
            updateDisplay(requiredAmount);

        } else if (target.dataset.action === 'input') {
            // Handle custom input button
            const input = prompt("Enter your desired donation amount ($):");
            const newAmount = parseFloat(input);

            if (!isNaN(newAmount) && newAmount >= 0) {
                updateDisplay(newAmount);
            } else if (input !== null) {
                alert("Invalid input. Please enter a positive number.");
            }
            
        } else if (target.dataset.action === 'clear') {
            // Handle clear button
            clearCalculator();
        }
    });

    // Initialize the display on load
    updateDisplay(0);
});