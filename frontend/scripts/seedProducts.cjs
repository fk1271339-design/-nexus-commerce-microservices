const axios = require('axios');

const API_URL = 'http://localhost:8085/api/products';

const categories = [
    'Electronics', 'Fashion', 'Home & Kitchen', 'Books', 
    'Beauty & Personal Care', 'Sports & Outdoors', 'Toys & Games', 
    'Automotive', 'Health & Household', 'Grocery'
];

const subcategories = {
    'Electronics': ['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'Smartwatches'],
    'Fashion': ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Watches', 'Jewelry'],
    'Home & Kitchen': ['Cookware', 'Furniture', 'Decor', 'Bedding', 'Appliances'],
    'Books': ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography', 'Self-Help'],
    'Beauty & Personal Care': ['Skincare', 'Haircare', 'Makeup', 'Fragrance', 'Tools'],
    'Sports & Outdoors': ['Fitness', 'Camping', 'Cycling', 'Water Sports', 'Team Sports'],
    'Toys & Games': ['Board Games', 'Action Figures', 'Dolls', 'Puzzles', 'Educational'],
    'Automotive': ['Car Care', 'Tools', 'Accessories', 'Replacement Parts', 'Tires'],
    'Health & Household': ['Supplements', 'Cleaning Supplies', 'Personal Care', 'Medical Supplies', 'Vitamins'],
    'Grocery': ['Snacks', 'Beverages', 'Pantry Staples', 'Dairy', 'Produce']
};

const productImages = {
    'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80',
    'Fashion': 'https://images.unsplash.com/photo-1445205170230-053b830c6039?w=500&q=80',
    'Home & Kitchen': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80',
    'Books': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80',
    'Beauty & Personal Care': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
    'Sports & Outdoors': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80',
    'Toys & Games': 'https://images.unsplash.com/photo-1539628399213-d6aa89c93074?w=500&q=80',
    'Automotive': 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&q=80',
    'Health & Household': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80',
    'Grocery': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'
};

async function seed() {
    console.log('Starting to seed 500 products...');

    for (let i = 1; i <= 500; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const sub = subcategories[category][Math.floor(Math.random() * subcategories[category].length)];
        const price = (Math.random() * (2000 - 10) + 10).toFixed(2);
        const stock = Math.floor(Math.random() * 100) + 10;
        
        const product = {
            name: `${sub} - Model ${i}`,
            description: `This is a high-quality ${sub} from our ${category} collection. Features include premium materials and modern design. Model number ${i}.`,
            price: parseFloat(price),
            stock: stock,
            imageUrl: productImages[category],
            category: category
        };

        try {
            await axios.post(API_URL, product);
            if (i % 50 === 0) {
                console.log(`Seeded ${i} products...`);
            }
        } catch (error) {
            console.error(`Error seeding product ${i}:`, error.message);
        }
    }

    console.log('Seeding completed!');
}

seed();
