// DOM Elements
const proposalForm = document.getElementById('proposalForm');
const yourNameInput = document.getElementById('yourName');
const partnerNameInput = document.getElementById('partnerName');
const imageUploadInput = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const errorMessage = document.getElementById('errorMessage');
const imageUploadWrapper = document.querySelector('.image-upload-wrapper');

let imageBase64 = null;

// Initialize hearts animation
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const hearts = ['💖', '💖', '💕', '💗', '💗', '💝'];

    for (let i = 0; i < 15; i++) {
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

// Handle image upload and preview
imageUploadWrapper.addEventListener('click', () => {
    imageUploadInput.click();
});

imageUploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('Please upload a valid image file');
        imageUploadInput.value = '';
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showError('Image size should be less than 5MB');
        imageUploadInput.value = '';
        return;
    }

    clearError();

    // Convert image to Base64
    const reader = new FileReader();

    reader.onload = (event) => {
        imageBase64 = event.target.result;
        displayImagePreview(imageBase64);
    };

    reader.onerror = () => {
        showError('Failed to read the image file');
    };

    reader.readAsDataURL(file);
});

// Display image preview
function displayImagePreview(base64) {
    const previewImg = document.createElement('img');
    previewImg.src = base64;
    previewImg.style.maxWidth = '100%';
    previewImg.style.maxHeight = '200px';
    previewImg.style.borderRadius = '12px';
    previewImg.style.marginTop = '10px';
    previewImg.style.boxShadow = '0 5px 15px rgba(255, 20, 147, 0.2)';

    imagePreview.innerHTML = '';
    imagePreview.appendChild(previewImg);

    // Update upload wrapper text
    const uploadText = document.querySelector('.upload-text');
    uploadText.textContent = '✅ Photo Selected!';
}

// Handle form submission
proposalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const yourName = yourNameInput.value.trim();
    const partnerName = partnerNameInput.value.trim();

    // Validation
    if (!yourName) {
        showError('Please enter your name');
        return;
    }

    if (!partnerName) {
        showError('Please enter your partner\'s name');
        return;
    }

    if (!imageBase64) {
        showError('Please upload a photo');
        return;
    }

    clearError();

    // Store data in sessionStorage
    const proposalData = {
        yourName: yourName,
        partnerName: partnerName,
        imageBase64: imageBase64
    };

    sessionStorage.setItem('proposalData', JSON.stringify(proposalData));

    // Redirect to valentine page
    setTimeout(() => {
        window.location.href = 'valentine.html';
    }, 300);
});

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

// Clear error message
function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
});
