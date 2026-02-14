// DOM Elements
const proposalText = document.getElementById('proposalText');
const valentineImage = document.getElementById('valentineImage');
const fromText = document.getElementById('fromText');
const yesBtnElement = document.getElementById('yesBtn');
const noBtnElement = document.getElementById('noBtn');
const celebrationContainer = document.getElementById('celebrationContainer');
const celebrationText = document.getElementById('celebrationText');

// Proposal data
let proposalData = null;

// Initialize hearts animation
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const hearts = ['💖', '💖', '💕', '💗', '💗', '💝'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        heartsContainer.appendChild(heart);
    }
}

// Load proposal data from sessionStorage
function loadProposalData() {
    const data = sessionStorage.getItem('proposalData');

    if (!data) {
        // Redirect to index if no data
        redirectToHome();
        return false;
    }

    try {
        proposalData = JSON.parse(data);

        // Validate data
        if (!proposalData.yourName || !proposalData.partnerName || !proposalData.imageBase64) {
            redirectToHome();
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error parsing proposal data:', error);
        redirectToHome();
        return false;
    }
}

// Display proposal content
function displayProposal() {
    if (!proposalData) return;

    // Set proposal text
    proposalText.textContent = `Will you be my valentine, ${proposalData.partnerName}? 💖`;

    // Set image
    valentineImage.src = proposalData.imageBase64;
    valentineImage.alt = `Photo from ${proposalData.yourName}`;

    // Set from text
    fromText.textContent = `From ${proposalData.yourName} 💕`;
}

// Handle Yes button click
yesBtnElement.addEventListener('click', () => {
    // Hide buttons
    document.querySelector('.buttons-container').style.display = 'none';

    // Show celebration
    celebrationContainer.classList.remove('celebration-hidden');
    celebrationText.textContent = `🎊 ${proposalData.partnerName}, you've made ${proposalData.yourName} the happiest person in the world! 🎊`;

    // Trigger celebration animation
    triggerCelebration();

    // Clear sessionStorage after celebration
    setTimeout(() => {
        sessionStorage.removeItem('proposalData');
    }, 5000);
});

// Handle No button click
noBtnElement.addEventListener('click', () => {
    // Sad animation - shake the No button
    noBtnElement.style.animation = 'none';
    setTimeout(() => {
        noBtnElement.style.animation = 'shake 0.5s ease-in-out';
    }, 0);

    // Move button away on hover (fun interaction)
    noBtnElement.addEventListener('mouseenter', () => {
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 200;
        noBtnElement.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
});

// Celebration animation with confetti-like effect
function triggerCelebration() {
    // Create celebration emojis
    const celebrationEmojis = ['💖', '💕', '💗', '💝', '🎉', '✨', '🎊', '💐'];
    const container = document.querySelector('.container');

    for (let i = 0; i < 30; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.top = '-50px';
        emoji.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        emoji.style.pointerEvents = 'none';
        emoji.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
        emoji.style.zIndex = '1000';

        document.body.appendChild(emoji);

        // Remove emoji after animation
        setTimeout(() => {
            emoji.remove();
        }, (Math.random() * 2 + 2) * 1000);
    }

    // Add celebration CSS animation if not present
    if (!document.querySelector('style[data-celebration]')) {
        const style = document.createElement('style');
        style.setAttribute('data-celebration', 'true');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            @keyframes shake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-5deg); }
                75% { transform: rotate(5deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Redirect to home page
function redirectToHome() {
    alerts('No proposal data found. Please start from the beginning!');
    window.location.href = 'index.html';
}

// Show alert
function alerts(message) {
    // Simple fallback if needed
    console.log(message);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createHearts();

    if (loadProposalData()) {
        displayProposal();
    }
});

// Prevent going back to index without data
window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('proposalData');
});
