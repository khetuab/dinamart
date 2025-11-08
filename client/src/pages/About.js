import React from 'react';
import { FiShoppingBag, FiUsers, FiAward, FiHeart } from 'react-icons/fi';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About DinaMart</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted online shopping destination, bringing quality products to your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            DinaMart was founded with a simple mission: to make quality products accessible to everyone.
            We believe that shopping should be convenient, secure, and enjoyable.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Since our inception, we've been committed to providing exceptional customer service,
            competitive prices, and a wide selection of products across various categories.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To revolutionize online shopping in Ethiopia by offering a seamless, secure, and
            customer-focused e-commerce experience.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We strive to build lasting relationships with our customers through transparency,
            reliability, and continuous improvement.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <FiShoppingBag className="mx-auto text-4xl text-blue-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">10,000+</h3>
          <p className="text-gray-600">Products</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <FiUsers className="mx-auto text-4xl text-blue-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">50,000+</h3>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <FiAward className="mx-auto text-4xl text-blue-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">5+</h3>
          <p className="text-gray-600">Years Experience</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <FiHeart className="mx-auto text-4xl text-blue-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">100%</h3>
          <p className="text-gray-600">Satisfaction</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Why Choose DinaMart?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-600">
              We carefully select all our products to ensure they meet high quality standards.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">
              Your transactions are safe and secure with our bank transfer system.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              We work hard to get your orders to you as quickly as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


