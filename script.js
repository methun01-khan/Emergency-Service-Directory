// --- State Variables ---
let heartCount = 0;
let coinCount = 100;
const callCost = 20;

// --- DOM Element Selection ---
const heartCountSpan = document.getElementById('heart-count');
const coinCountSpan = document.getElementById('coin-count');
const favoriteIcons = document.querySelectorAll('.fav-icon');
const callButtons = document.querySelectorAll('.btn-call');
const copyButtons = document.querySelectorAll('.btn-copy');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');

// --- Functionality for Heart Icons ---
favoriteIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        // Prevent increasing count if already favorited
        if (!icon.classList.contains('active')) {
            icon.classList.add('active');
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            
            heartCount++;
            heartCountSpan.textContent = heartCount;
        }
    });
});

// --- Functionality for Call Buttons ---
callButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (coinCount < callCost) {
            alert("Sorry, you don't have enough coins to make a call.");
            return; // Terminate the process
        }
        
        // 1. Reduce coins
        coinCount -= callCost;
        coinCountSpan.textContent = coinCount;

        // 2. Get card data
        const card = button.closest('.service-card');
        const serviceName = card.dataset.name;
        const serviceNumber = card.dataset.number;

        // 3. Show alert
        alert(`Calling ${serviceName} at ${serviceNumber}`);

        // 4. Add to history
        addCallToHistory(serviceName, serviceNumber);
    });
});

// --- Functionality for Call History Section ---
function addCallToHistory(name, number) {
    const listItem = document.createElement('li');
    listItem.classList.add('history-item');
    listItem.innerHTML = `
        <div class="title">${name}</div>
        <div class="number">${number}</div>
    `;
    historyList.prepend(listItem); // Add to the top of the list
}

clearHistoryBtn.addEventListener('click', () => {
    historyList.innerHTML = '';
});

// --- Bonus: Functionality for Copy Buttons ---
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.service-card');
        const numberToCopy = card.dataset.number;
        
        navigator.clipboard.writeText(numberToCopy).then(() => {
            const originalContent = button.innerHTML;
            button.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
            setTimeout(() => {
                button.innerHTML = originalContent;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});