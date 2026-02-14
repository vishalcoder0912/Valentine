// DOM Elements
const proposalText = document.getElementById('proposalText');
const valentineImage = document.getElementById('valentineImage');
const fromText = document.getElementById('fromText');
const yesBtnElement = document.getElementById('yesBtn');
const noBtnElement = document.getElementById('noBtn');
const celebrationContainer = document.getElementById('celebrationContainer');
const celebrationText = document.getElementById('celebrationText');
const noCounter = document.getElementById('noCounter');

// Proposal data
let proposalData = null;
let noClickCount = 0;
const funnyMessages = [
    "🤔 Are you sure?",
    "😢 Really?",
    "💔 Please reconsider...",
    "😭 My heart is breaking...",
    "🥺 One more chance?",
    "😩 Come on!",
    "💘 You're killing me here...",
    "😤 Don't be mean!",
    "🙃 That hurts...",
];

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
    fromText.textContent = `From ${proposalData.yourName} to ${proposalData.partnerName} 💕`;
}

// Update button sizes based on No clicks
function updateButtonSizes() {
    noClickCount++;

    // Calculate scale factors
    const yesBtnScale = 1 + (noClickCount * 0.15); // Yes button grows by 15% each click
    const noBtnScale = Math.max(0.5, 1 - (noClickCount * 0.12)); // No button shrinks, min 50%

    // Apply animations
    yesBtnElement.classList.add('growing');
    noBtnElement.classList.add('shrinking');

    // Remove animation class after animation completes
    setTimeout(() => {
        yesBtnElement.classList.remove('growing');
        noBtnElement.classList.remove('shrinking');

        // Apply permanent scale transform
        yesBtnElement.style.transform = `scale(${yesBtnScale})`;
        noBtnElement.style.transform = `scale(${noBtnScale})`;

        // Add tiny class when scale is very small
        if (noBtnScale < 0.7) {
            noBtnElement.classList.add('tiny');
        }

        // Update counter message
        if (noClickCount <= funnyMessages.length) {
            noCounter.textContent = funnyMessages[noClickCount - 1];
            noCounter.style.animation = 'slideIn 0.3s ease-out';
        } else {
            noCounter.textContent = `😫 Please! I really love you! (${noClickCount} nope attempts)`;
        }

        // After many clicks, make the button almost invisible
        if (noClickCount >= 8) {
            noBtnElement.classList.add('hidden');
            noCounter.textContent = `💔 You're impossible! (${noClickCount} rejections... I'm still here!)`;
        }
    }, 300);
}

// Handle Yes button click
yesBtnElement.addEventListener('click', () => {
    // Hide buttons and counter
    document.querySelector('.buttons-section').style.display = 'none';

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
    // Prevent default behavior
    event.preventDefault();

    // Update button sizes
    updateButtonSizes();

    // Shake animation
    noBtnElement.style.animation = 'none';
    setTimeout(() => {
        noBtnElement.style.animation = 'shake 0.4s ease-in-out';
    }, 10);

    // Move button away on hover (fun interaction)
    noBtnElement.addEventListener('mouseenter', () => {
        const randomX = (Math.random() - 0.5) * 150;
        const randomY = (Math.random() - 0.5) * 100;
        noBtnElement.style.transform = `translate(${randomX}px, ${randomY}px) scale(${Math.max(0.5, 1 - (noClickCount * 0.12))})`;
    });

    noBtnElement.addEventListener('mouseleave', () => {
        noBtnElement.style.transform = `scale(${Math.max(0.5, 1 - (noClickCount * 0.12))})`;
    });
});

// Celebration animation with confetti-like effect
function triggerCelebration() {
    // Create celebration emojis
    const celebrationEmojis = ['💖', '💕', '💗', '💝', '🎉', '✨', '🎊', '💐', '🎈', '🌹'];
    const container = document.querySelector('.container');

    for (let i = 0; i < 50; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.top = '-50px';
        emoji.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
        emoji.style.pointerEvents = 'none';
        emoji.style.animation = `fall ${Math.random() * 2 + 2.5}s linear forwards`;
        emoji.style.zIndex = '1000';

        document.body.appendChild(emoji);

        // Remove emoji after animation
        setTimeout(() => {
            emoji.remove();
        }, (Math.random() * 2 + 2.5) * 1000);
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
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
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
