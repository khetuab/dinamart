import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FiShoppingBag, FiTruck, FiShield, FiStar } from 'react-icons/fi';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products?limit=8');
        setFeaturedProducts(res.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-6xl font-bold mb-4">
              Welcome to DinaMart
            </h1>
            <p className="text-lg md:text-2xl mb-8">
              Your One-Stop Shop for Quality Products
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-blue-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm md:text-base"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-3 md:p-0">
              <FiShoppingBag className="mx-auto text-2xl md:text-4xl text-blue-600 mb-2 md:mb-4" />
              <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Wide Selection</h3>
              <p className="text-gray-600 text-xs md:text-sm">Thousands of products</p>
            </div>
            <div className="text-center p-3 md:p-0">
              <FiTruck className="mx-auto text-2xl md:text-4xl text-blue-600 mb-2 md:mb-4" />
              <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Fast Delivery</h3>
              <p className="text-gray-600 text-xs md:text-sm">Quick and reliable</p>
            </div>
            <div className="text-center p-3 md:p-0">
              <FiShield className="mx-auto text-2xl md:text-4xl text-blue-600 mb-2 md:mb-4" />
              <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Secure Payment</h3>
              <p className="text-gray-600 text-xs md:text-sm">Safe transactions</p>
            </div>
            <div className="text-center p-3 md:p-0">
              <FiStar className="mx-auto text-2xl md:text-4xl text-blue-600 mb-2 md:mb-4" />
              <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Quality Products</h3>
              <p className="text-gray-600 text-xs md:text-sm">Premium quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Featured Products</h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Mobile Grid - 2 columns */}
              <div className="md:hidden">
                <div className="grid grid-cols-2 gap-3">
                  {featuredProducts.map((product) => (
                    <Link
                      key={product._id}
                      to={`/products/${product._id}`}
                      className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition"
                    >
                      <div className="aspect-w-1 aspect-h-1 bg-gray-100">
                        <img
                          src={product.images[0] || 'https://via.placeholder.com/300'}
                          alt={product.name}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium text-xs mb-1 line-clamp-2 leading-tight">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.discount > 0 ? (
                              <div>
                                <span className="text-blue-600 font-bold text-xs">
                                  ETB {product.price - product.discount}
                                </span>
                                <span className="text-gray-500 line-through text-xs ml-1 block">
                                  ETB {product.price}
                                </span>
                              </div>
                            ) : (
                              <span className="text-blue-600 font-bold text-xs">
                                ETB {product.price}
                              </span>
                            )}
                          </div>
                          {product.ratings.average > 0 && (
                            <div className="flex items-center">
                              <FiStar className="text-yellow-400 fill-current" size={12} />
                              <span className="ml-1 text-xs">{product.ratings.average.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tablet and Desktop Grid - 2 columns on tablet, 4 on desktop */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {featuredProducts.map((product) => (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                  >
                    <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                      <img
                        src={product.images[0] || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.discount > 0 ? (
                            <div>
                              <span className="text-blue-600 font-bold">
                                ETB {product.price - product.discount}
                              </span>
                              <span className="text-gray-500 line-through text-sm ml-2">
                                ETB {product.price}
                              </span>
                            </div>
                          ) : (
                            <span className="text-blue-600 font-bold">
                              ETB {product.price}
                            </span>
                          )}
                        </div>
                        {product.ratings.average > 0 && (
                          <div className="flex items-center">
                            <FiStar className="text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm">{product.ratings.average.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
          <div className="text-center mt-6 md:mt-8">
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
