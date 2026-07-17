function getCart() {
    return DB.getAll('cart') || [];
}

function saveCart(cart) {
    DB.saveAll('cart', cart);
}

function updateCartBadge() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
    });
}

function addToCart(productId, color, size, quantity = 1) {
    const product = DB.find('products', productId);
    if (!product) {
        showToast('⚠️ Product not found');
        return;
    }

    const cart = getCart();
    const existing = cart.find(item => 
        item.productId === productId && 
        item.color === color && 
        item.size === size
    );

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            name: product.productName,
            price: product.price,
            image: product.images && product.images.length > 0 ? product.images[0] : null,
            color: color || 'Default',
            size: size || 'One Size',
            quantity: quantity,
            vendorId: product.vendorId,
            vendorWhatsApp: getVendorWhatsApp(product.vendorId)
        });
    }

    saveCart(cart);
    updateCartBadge();
    showToast('✅ Added to cart!');
}

function getVendorWhatsApp(vendorId) {
    const vendor = DB.find('vendors', vendorId);
    return vendor?.whatsappNumber || '27687510600';
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function quickAddToCart(productId) {
    const product = DB.find('products', productId);
    if (!product) return;
    const color = product.colors && product.colors.length > 0 ? product.colors[0] : 'Default';
    const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'One Size';
    addToCart(productId, color, size, 1);
}

function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.style.transform = 'translateY(120px)';
        toast.style.opacity = '0';
    }, 3000);
}

function initBannerCarousel() {
    const slides = document.querySelectorAll('.hero-banner .slide');
    const dots = document.querySelectorAll('.banner-dots .dot');
    if (slides.length === 0) return;

    let current = 0;

    function showSlide(index) {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            current = index;
            showSlide(current);
        });
    });

    setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 5000);

    showSlide(0);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    initBannerCarousel();
});

window.addToCart = addToCart;
window.quickAddToCart = quickAddToCart;
window.getCart = getCart;
window.saveCart = saveCart;
window.getCartTotal = getCartTotal;
window.updateCartBadge = updateCartBadge;
window.showToast = showToast;
