const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');
const Bank = require('../models/Bank');
const Category = require('../models/Category');
const Settings = require('../models/Settings');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dinamart');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Bank.deleteMany({});
    await Category.deleteMany({});
    await Settings.deleteMany({});

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@dinamart.com',
      password: 'admin123',
      role: 'admin',
      phone: '+251911234567'
    });
    await admin.save();
    console.log('Admin user created');

    // Create test customer
    const customer = new User({
      name: 'John Doe',
      email: 'customer@dinamart.com',
      password: 'customer123',
      role: 'customer',
      phone: '+251912345678',
      addresses: [{
        label: 'Home',
        region: 'Addis Ababa',
        city: 'Addis Ababa',
        subCity: 'Bole',
        street: 'Main Street',
        houseNumber: '123',
        postalCode: '1000',
        isDefault: true
      }]
    });
    await customer.save();
    console.log('Test customer created');

    // Create categories
    const categories = [
      { name: 'Electronics', description: 'Electronic devices and gadgets', slug: 'electronics' },
      { name: 'Clothing', description: 'Fashion and apparel', slug: 'clothing' },
      { name: 'Home & Kitchen', description: 'Home essentials and kitchenware', slug: 'home-kitchen' },
      { name: 'Books', description: 'Books and literature', slug: 'books' },
      { name: 'Sports', description: 'Sports and fitness equipment', slug: 'sports' }
    ];

    for (const cat of categories) {
      const category = new Category(cat);
      await category.save();
    }
    console.log('Categories created');

    // Create products
    const products = [
      {
        name: 'Smartphone X Pro',
        description: 'Latest smartphone with advanced features, 128GB storage, 8GB RAM, 6.7" display',
        category: 'Electronics',
        price: 25000,
        discount: 2000,
        stock: 50,
        sku: 'ELEC-001',
        images: ['https://via.placeholder.com/400x400?text=Smartphone+X+Pro'],
        brand: 'TechBrand',
        ratings: { average: 4.5, count: 120 }
      },
      {
        name: 'Wireless Headphones',
        description: 'Premium wireless headphones with noise cancellation',
        category: 'Electronics',
        price: 3500,
        discount: 500,
        stock: 100,
        sku: 'ELEC-002',
        images: ['https://via.placeholder.com/400x400?text=Wireless+Headphones'],
        brand: 'AudioPro',
        ratings: { average: 4.7, count: 89 }
      },
      {
        name: 'Laptop Ultra 15',
        description: 'High-performance laptop, Intel i7, 16GB RAM, 512GB SSD',
        category: 'Electronics',
        price: 45000,
        discount: 5000,
        stock: 25,
        sku: 'ELEC-003',
        images: ['https://via.placeholder.com/400x400?text=Laptop+Ultra+15'],
        brand: 'TechBrand',
        ratings: { average: 4.6, count: 45 }
      },
      {
        name: 'Men\'s Casual Shirt',
        description: 'Comfortable cotton shirt, perfect for everyday wear',
        category: 'Clothing',
        price: 1200,
        stock: 200,
        sku: 'CLOTH-001',
        images: ['https://via.placeholder.com/400x400?text=Mens+Shirt'],
        brand: 'FashionLine',
        ratings: { average: 4.3, count: 156 }
      },
      {
        name: 'Women\'s Summer Dress',
        description: 'Elegant summer dress, lightweight and breathable',
        category: 'Clothing',
        price: 1800,
        discount: 200,
        stock: 150,
        sku: 'CLOTH-002',
        images: ['https://via.placeholder.com/400x400?text=Womens+Dress'],
        brand: 'FashionLine',
        ratings: { average: 4.4, count: 98 }
      },
      {
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with programmable timer',
        category: 'Home & Kitchen',
        price: 4500,
        discount: 500,
        stock: 75,
        sku: 'HOME-001',
        images: ['https://via.placeholder.com/400x400?text=Coffee+Maker'],
        brand: 'HomeEssentials',
        ratings: { average: 4.5, count: 67 }
      },
      {
        name: 'Cookware Set',
        description: '10-piece non-stick cookware set',
        category: 'Home & Kitchen',
        price: 5500,
        stock: 60,
        sku: 'HOME-002',
        images: ['https://via.placeholder.com/400x400?text=Cookware+Set'],
        brand: 'HomeEssentials',
        ratings: { average: 4.6, count: 34 }
      },
      {
        name: 'Programming Book: JavaScript Mastery',
        description: 'Complete guide to modern JavaScript development',
        category: 'Books',
        price: 850,
        stock: 300,
        sku: 'BOOK-001',
        images: ['https://via.placeholder.com/400x400?text=JS+Book'],
        brand: 'TechBooks',
        ratings: { average: 4.8, count: 234 }
      },
      {
        name: 'Yoga Mat',
        description: 'Premium non-slip yoga mat, eco-friendly material',
        category: 'Sports',
        price: 1200,
        discount: 100,
        stock: 120,
        sku: 'SPORT-001',
        images: ['https://via.placeholder.com/400x400?text=Yoga+Mat'],
        brand: 'FitLife',
        ratings: { average: 4.4, count: 78 }
      },
      {
        name: 'Dumbbell Set',
        description: 'Adjustable dumbbell set, 2.5kg to 20kg',
        category: 'Sports',
        price: 3500,
        stock: 40,
        sku: 'SPORT-002',
        images: ['https://via.placeholder.com/400x400?text=Dumbbell+Set'],
        brand: 'FitLife',
        ratings: { average: 4.7, count: 56 }
      }
    ];

    for (const prod of products) {
      const product = new Product(prod);
      await product.save();
    }
    console.log('Products created');

    // Create banks
    const banks = [
      {
        bankName: 'Dashen Bank',
        accountHolder: 'DinaMart E-commerce',
        accountNumber: '1234567890123',
        branch: 'Bole Branch',
        isActive: true
      },
      {
        bankName: 'Awash Bank',
        accountHolder: 'DinaMart E-commerce',
        accountNumber: '9876543210987',
        branch: 'Addis Ababa Main Branch',
        isActive: true
      },
      {
        bankName: 'Commercial Bank of Ethiopia (CBE)',
        accountHolder: 'DinaMart E-commerce',
        accountNumber: '5555555555555',
        branch: 'Head Office',
        isActive: true
      },
      {
        bankName: 'Abyssinia Bank',
        accountHolder: 'DinaMart E-commerce',
        accountNumber: '1111111111111',
        branch: 'Bole Branch',
        isActive: true
      }
    ];

    for (const bank of banks) {
      const bankDoc = new Bank(bank);
      await bankDoc.save();
    }
    console.log('Banks created');

    // Create settings
    const settings = new Settings({
      siteName: 'DinaMart',
      contactEmail: 'info@dinamart.com',
      contactPhone: '+251911234567',
      address: 'Addis Ababa, Ethiopia',
      currency: { symbol: 'ETB', code: 'ETB' },
      bankTransferInstructions: 'Please make payment to one of the bank accounts below. After payment, your order will be verified and processed. Include your order number in the payment reference.'
    });
    await settings.save();
    console.log('Settings created');

    console.log('Seed data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

