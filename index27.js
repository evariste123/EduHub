// 1. Initialize the Cart (Check if items exist in storage, otherwise start empty)
let cart = JSON.parse(localStorage.getItem('userCart')) || [];

// Function to record and save the item
const recordItem = (itemName) => {
    const timestamp = new Date().toLocaleString();
    cart.push({ item: itemName, addedAt: timestamp });
    
    // Save to browser memory (LocalStorage)
    localStorage.setItem('userCart', JSON.stringify(cart));
    
    console.log('Current Cart Record:', cart);
};

// 2. Hero CTA Toggle
const heroCta = document.getElementById('hero-cta');
const heroCtaText = document.getElementById('hero-cta-text');

if (heroCta && heroCtaText) {
    heroCta.addEventListener('mouseover', () => heroCtaText.textContent = 'Shop Now');
    heroCta.addEventListener('mouseout', () => heroCtaText.textContent = 'Explore Our Deals');
}

// 3. Sticky Header Logic
const pageHeader = document.querySelector('.page-header');
window.addEventListener('scroll', () => {
    if(pageHeader) pageHeader.classList.toggle('scrolled', window.scrollY > 50);
});

// 4. Hover Effects
const addHoverEffect = (selector, className) => {
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => el.classList.add(className));
        el.addEventListener('mouseleave', () => el.classList.remove(className));
    });
};

addHoverEffect('.product-article', 'hovered');
addHoverEffect('.product-image', 'zoomed');
addHoverEffect('.product-title', 'highlighted');
addHoverEffect('.product-description', 'emphasized');
addHoverEffect('.product-price', 'enlarged');
addHoverEffect('.add-to-cart-btn', 'active');

// 5. Handle All Buttons & RECORDING
const cartButtons = document.querySelectorAll('.add-to-cart-btn, [class^="btn"]');

cartButtons.forEach(button => {
    button.textContent = 'Add to Cart';

    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Find the product name (it looks for a nearby title or uses the ID)
        const productTitle = button.closest('.product-article')?.querySelector('.product-title')?.textContent || button.id;
        
        if (button.id === 'btn9') {
            recordItem('Subscription Deal');
            alert('Subscription added to cart!');
        } else {
            recordItem(productTitle);
            alert(`${productTitle} added to cart!`);
        }
    });
});

// 6. View Record (Optional: run this in your browser console to see what's saved)
console.log('Session Started. Previous Records:', cart);
