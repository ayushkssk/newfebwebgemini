// script.js

// 1. Set a random image as the initial logo
const randomImageUrls = [
    'https://source.unsplash.com/random/200x200', 
    'https://picsum.photos/200',
    // Add more image URLs as needed
];

const logoImg = document.getElementById('logo-img');
logoImg.src = randomImageUrls[Math.floor(Math.random() * randomImageUrls.length)];

// 2. Handle image upload
const imageUpload = document.getElementById('image-upload');
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            logoImg.src = e.target.result;
            setLogoBtn.style.display = 'inline-block'; 
        };
        reader.readAsDataURL(file);
    }
});

// 3. Handle image paste
const pasteBtn = document.getElementById('paste-btn');
const setLogoBtn = document.getElementById('set-logo-btn');

pasteBtn.addEventListener('click', async () => {
    try {
        const clipboardItems = await navigator.clipboard.read(); 
        for (const clipboardItem of clipboardItems) {
            for (const type of clipboardItem.types) {
                if (type.startsWith('image/')) {
                    const blob = await clipboardItem.getType(type);
                    logoImg.src = URL.createObjectURL(blob);
                    setLogoBtn.style.display = 'inline-block'; 
                    break; 
                }
            }
        }
    } catch (err) {
        console.error('Failed to paste image:', err);
    }
});

// 4. Handle rating
let currentRating = 0; 
const stars = document.querySelectorAll('.star');
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        currentRating = index + 1;
        updateStarRating();
    });
});

function updateStarRating() {
    stars.forEach((s, i) => {
        s.classList.toggle('active', i < currentRating);
    });
}

// 5. Generate random website suggestions
const suggestionsContainer = document.querySelector('.suggestions');
const websiteNameInput = document.getElementById('website-name');
const imageLinkInput = document.getElementById('image-link');

const refreshSuggestions = () => {
    const suggestions = [
        { name: "Google", link: "https://www.google.com/", image: "https://www.google.com/favicon.ico" },
        { name: "YouTube", link: "https://www.youtube.com/", image: "https://www.youtube.com/favicon.ico" },
        { name: "IT4B.in", link: "https://it4b.in", image: "https://it4b.in/images/logo.JPG" },
        { name: "PDF filler", link: "https://www.pdffiller.com/en/forms/dashboard", image: "https://www.pdffiller.com/profile/98183272/e779eecfd94f49fe69e53329209bd209.jpg?1725660668000" },
        { name: "Chart Link", link: "https://chartink.com/screener/resistance-breakout-with-high-volume", image: "data:image/png;base64,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" },
        // Add more suggestions as needed
    ];

    suggestionsContainer.innerHTML = ''; 

    suggestions.forEach(suggestion => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.classList.add('suggestion');
        suggestionDiv.textContent = suggestion.name;
        suggestionDiv.addEventListener('click', () => {
            websiteNameInput.value = suggestion.name;
            imageLinkInput.value = suggestion.image; 
        });
        suggestionsContainer.appendChild(suggestionDiv);
    });
};

// Initial suggestions on page load
refreshSuggestions();

// Refresh button functionality
const refreshBtn = document.getElementById('refresh-btn');
refreshBtn.addEventListener('click', refreshSuggestions);

// 6. Handle form submission
const submitBtn = document.getElementById('submit-btn');
const websiteList = document.getElementById('website-list');

// Variable to track the card being edited (initially null)
let cardBeingEdited = null;

submitBtn.addEventListener('click', () => {
    const websiteName = websiteNameInput.value;
    const imageLink = imageLinkInput.value;
    const rating = currentRating;

    if (websiteName && imageLink) {
        if (cardBeingEdited) {
            // Update the existing card
            updateWebsiteCard(cardBeingEdited, websiteName, imageLink, rating);
            cardBeingEdited = null; // Reset the edited card tracker
        } else {
            // Create a new card
            const websiteCard = createWebsiteCard(websiteName, imageLink, rating);
            websiteList.appendChild(websiteCard);
        }

        // Clear input fields and reset rating
        websiteNameInput.value = '';
        imageLinkInput.value = '';
        currentRating = 0;
        updateStarRating();
    }
});

// Function to create a website card
function createWebsiteCard(name, image, rating) {
    const card = document.createElement('div');
    card.classList.add('website-card');

    const img = document.createElement('img');
    img.src = image;
    img.alt = name;
    card.appendChild(img);

    const h3 = document.createElement('h3');
    h3.textContent = name;
    card.appendChild(h3);

    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('rating');
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.classList.add('star');
        star.textContent = '\u2605'; 
        star.classList.toggle('active', i < rating);
        ratingDiv.appendChild(star);
    }
    card.appendChild(ratingDiv);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
        // Populate input fields with the website's details
        websiteNameInput.value = name;
        imageLinkInput.value = image;
        currentRating = rating;
        updateStarRating();

        websiteNameInput.focus();

        // Mark this card as being edited
        cardBeingEdited = card; 
    });
    card.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        card.remove();
    });
    card.appendChild(deleteBtn);

    return card;
}

// Function to update an existing website card
function updateWebsiteCard(card, name, image, rating) {
    card.querySelector('img').src = image;
    card.querySelector('img').alt = name;
    card.querySelector('h3').textContent = name;

    const ratingStars = card.querySelectorAll('.star');
    ratingStars.forEach((star, i) => {
        star.classList.toggle('active', i < rating);
    });
}

// 7. Handle Set Logo button
setLogoBtn.addEventListener('click', () => {
    const uploadedImage = document.querySelector('#logo-img');
    logoImg.src = uploadedImage.src;

    setLogoBtn.style.display = 'none';
    imageUpload.value = ''; 
});