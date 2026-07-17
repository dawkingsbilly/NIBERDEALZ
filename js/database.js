const DB = {
    get(key) {
        try {
            return JSON.parse(localStorage.getItem(`niberdealz_${key}`)) || null;
        } catch { return null; }
    },
    set(key, data) {
        localStorage.setItem(`niberdealz_${key}`, JSON.stringify(data));
    },
    getAll(collection) {
        return this.get(collection) || [];
    },
    saveAll(collection, data) {
        this.set(collection, data);
    },
    add(collection, item) {
        const items = this.getAll(collection);
        item.id = item.id || 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        item.createdAt = item.createdAt || new Date().toISOString();
        items.push(item);
        this.saveAll(collection, items);
        return item;
    },
    find(collection, id) {
        const items = this.getAll(collection);
        return items.find(item => item.id === id);
    },
    findBy(collection, key, value) {
        const items = this.getAll(collection);
        return items.find(item => item[key] === value);
    },
    filter(collection, predicate) {
        const items = this.getAll(collection);
        return items.filter(predicate);
    },
    update(collection, id, updates) {
        const items = this.getAll(collection);
        const index = items.findIndex(item => item.id === id);
        if (index === -1) return null;
        items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
        this.saveAll(collection, items);
        return items[index];
    },
    delete(collection, id) {
        let items = this.getAll(collection);
        items = items.filter(item => item.id !== id);
        this.saveAll(collection, items);
        return true;
    },
    count(collection) {
        return this.getAll(collection).length;
    },
    getByVendor(collection, vendorId) {
        return this.filter(collection, item => item.vendorId === vendorId);
    },
    clear(collection) {
        this.saveAll(collection, []);
    },
    clearAll() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('niberdealz_')) {
                localStorage.removeItem(key);
            }
        });
    }
};

function seedDatabase() {
    if (DB.count('products') > 0) return;

    const vendors = [
        {
            id: 'v1',
            storeName: 'TrendyFashion SA',
            ownerName: 'Thabo Mokoena',
            email: 'thabo@trendyfashion.co.za',
            phone: '0821234567',
            password: 'password123',
            whatsappNumber: '27821234567',
            storeDescription: 'Your go-to store for trendy fashion at affordable prices.',
            physicalAddress: '123 Main Street, Johannesburg, Gauteng',
            verified: true,
            suspended: false,
            rating: 4.8,
            totalSales: 120,
            createdAt: new Date().toISOString()
        },
        {
            id: 'v2',
            storeName: 'BeautyCo SA',
            ownerName: 'Lerato Ndlovu',
            email: 'lerato@beautyco.co.za',
            phone: '0823456789',
            password: 'password123',
            whatsappNumber: '27823456789',
            storeDescription: 'Premium beauty products for everyone.',
            physicalAddress: '45 Beauty Lane, Cape Town, Western Cape',
            verified: true,
            suspended: false,
            rating: 4.9,
            totalSales: 89,
            createdAt: new Date().toISOString()
        },
        {
            id: 'v3',
            storeName: 'TechGadgets',
            ownerName: 'Sipho Dlamini',
            email: 'sipho@techgadgets.co.za',
            phone: '0824567890',
            password: 'password123',
            whatsappNumber: '27824567890',
            storeDescription: 'Affordable electronics and accessories.',
            physicalAddress: '78 Tech Street, Durban, KwaZulu-Natal',
            verified: false,
            suspended: false,
            rating: 0,
            totalSales: 0,
            createdAt: new Date().toISOString()
        }
    ];
    vendors.forEach(v => DB.add('vendors', v));

    const products = [
        {
            id: 'p1', vendorId: 'v1', productName: 'Minimalist Knitted Set - 4PC',
            description: 'Comfortable knitted set for all seasons. Perfect for casual wear.',
            price: 20.00, category: 'Fashion', images: ['https://picsum.photos/seed/1/400/400'],
            colors: ['Black', 'White', 'Pink', 'Blue'], sizes: ['S', 'M', 'L', 'XL'],
            stockQuantity: 50, condition: 'New', brand: 'StarGlow', featured: true,
            views: 250, cartCount: 45, whatsappCheckouts: 30, soldCount: 20, rating: 4.8, reviewCount: 15,
            createdAt: new Date().toISOString()
        },
        {
            id: 'p2', vendorId: 'v2', productName: 'Creative Pink Plush Headband',
            description: 'Soft and comfortable plush headband. Perfect for daily wear.',
            price: 34.00, category: 'Beauty', images: ['https://picsum.photos/seed/2/400/400'],
            colors: ['Pink', 'White', 'Black'], sizes: ['One Size'],
            stockQuantity: 100, condition: 'New', brand: 'BeautyCo', featured: true,
            views: 180, cartCount: 30, whatsappCheckouts: 25, soldCount: 15, rating: 4.9, reviewCount: 12,
            createdAt: new Date().toISOString()
        },
        {
            id: 'p3', vendorId: 'v1', productName: 'Vintage Motorcycle Fashion Jacket',
            description: 'Classic vintage style motorcycle jacket. Premium quality leather.',
            price: 578.00, category: 'Fashion', images: ['https://picsum.photos/seed/3/400/400'],
            colors: ['Brown', 'Black', 'Tan'], sizes: ['M', 'L', 'XL', 'XXL'],
            stockQuantity: 30, condition: 'New', brand: 'VintageWear', featured: true,
            views: 95, cartCount: 12, whatsappCheckouts: 8, soldCount: 5, rating: 4.7, reviewCount: 4,
            createdAt: new Date().toISOString()
        },
        {
            id: 'p4', vendorId: 'v2', productName: 'Hair Wax Stick - Natural Treatment',
            description: 'Natural hair wax stick for styling and treatment. 75g.',
            price: 16.00, category: 'Beauty', images: ['https://picsum.photos/seed/4/400/400'],
            colors: ['Clear'], sizes: ['75g'],
            stockQuantity: 200, condition: 'New', brand: 'NaturalCare', featured: false,
            views: 320, cartCount: 80, whatsappCheckouts: 60, soldCount: 45, rating: 4.7, reviewCount: 28,
            createdAt: new Date().toISOString()
        },
        {
            id: 'p5', vendorId: 'v1', productName: 'Leopard Print V-Neck Dress',
            description: 'Stylish leopard print dress for any occasion.',
            price: 173.00, category: 'Fashion', images: ['https://picsum.photos/seed/6/400/400'],
            colors: ['Leopard', 'Black', 'Brown'], sizes: ['S', 'M', 'L', 'XL'],
            stockQuantity: 60, condition: 'New', brand: 'TrendyWear', featured: true,
            views: 210, cartCount: 35, whatsappCheckouts: 20, soldCount: 12, rating: 4.8, reviewCount: 9,
            createdAt: new Date().toISOString()
        },
        {
            id: 'p6', vendorId: 'v2', productName: 'Battery Powered Baby Stroller',
            description: 'Electric baby stroller with remote control. Safe and reliable.',
            price: 18.00, category: 'Home Essentials', images: ['https://picsum.photos/seed/5/400/400'],
            colors: ['Black', 'Gray', 'Blue'], sizes: ['One Size'],
            stockQuantity: 45, condition: 'New', brand: 'BabyTech', featured: false,
            views: 150, cartCount: 20, whatsappCheckouts: 10, soldCount: 8, rating: 4.6, reviewCount: 5,
            createdAt: new Date().toISOString()
        }
    ];
    products.forEach(p => DB.add('products', p));

    const customers = [
        { id: 'c1', fullName: 'John Smith', email: 'john@email.com', phone: '0821234567', password: 'password123', deliveryAddress: '12 Main Street, Pretoria, Gauteng', createdAt: new Date().toISOString() },
        { id: 'c2', fullName: 'Jane Doe', email: 'jane@email.com', phone: '0827654321', password: 'password123', deliveryAddress: '45 Oak Avenue, Cape Town, Western Cape', createdAt: new Date().toISOString() }
    ];
    customers.forEach(c => DB.add('customers', c));

    DB.set('cart', []);
    DB.set('orders', []);
    DB.set('complaints', []);
    DB.set('reviews', []);
    DB.set('notifications', []);
    DB.set('admins', []);

    console.log('✅ NiberDealz database seeded successfully!');
}

seedDatabase();
window.DB = DB;
