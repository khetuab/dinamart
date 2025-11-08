import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { FiStar, FiShoppingCart, FiFilter } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { addToCart } = useCart();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: 12,
          ...(search && { search }),
          ...(category && { category }),
          sortBy,
          sortOrder,
        });

        const [productsRes, categoriesRes] = await Promise.all([
          api.get(`/products?${params}`),
          api.get('/categories'),
        ]);

        setProducts(productsRes.data.products);
        setTotalPages(productsRes.data.totalPages);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, search, category, sortBy, sortOrder]);

  const handleFilterChange = (key, value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      newParams.set('page', '1');
      return newParams;
    });
    setCurrentPage(1);
    setShowMobileFilters(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success('Product added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center gap-2 font-semibold"
        >
          <FiFilter />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Sidebar Filters - Tablet and Desktop */}
        <aside className="hidden md:block md:w-56 lg:w-64">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md sticky top-20">
            <h3 className="font-bold text-lg mb-4">Filters</h3>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Categories</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleFilterChange('category', '')}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    !category ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => handleFilterChange('category', cat.name)}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      category === cat.name ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h4 className="font-semibold mb-3">Sort By</h4>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', newSortBy);
                  handleFilterChange('sortOrder', newSortOrder);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="md:hidden bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleFilterChange('category', '')}
                  className={`px-3 py-2 rounded text-sm ${
                    !category ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => handleFilterChange('category', cat.name)}
                    className={`px-3 py-2 rounded text-sm ${
                      category === cat.name ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Sort By</h4>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', newSortBy);
                  handleFilterChange('sortOrder', newSortOrder);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <main className="flex-1">
          {search && (
            <div className="mb-4">
              <p className="text-gray-600">
                Search results for: <span className="font-semibold">"{search}"</span>
              </p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found.</p>
            </div>
          ) : (
            <>
              {/* Mobile Grid - 2 columns */}
              <div className="md:hidden">
                <div className="grid grid-cols-2 gap-3">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg shadow-sm border overflow-hidden"
                    >
                      <Link 
                        to={`/products/${product._id}`}
                        onClick={() => setShowMobileFilters(false)}
                      >
                        <div className="aspect-w-1 aspect-h-1 bg-gray-100">
                          <img
                            src={product.images[0] || 'https://via.placeholder.com/300'}
                            alt={product.name}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      </Link>
                      <div className="p-2">
                        <Link 
                          to={`/products/${product._id}`}
                          onClick={() => setShowMobileFilters(false)}
                        >
                          <h3 className="font-medium text-sm mb-1 line-clamp-2 hover:text-blue-600 leading-tight">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="mb-2">
                          {product.discount > 0 ? (
                            <div>
                              <span className="text-blue-600 font-bold text-sm">
                                ETB {product.price - product.discount}
                              </span>
                              <span className="text-gray-500 line-through text-xs ml-1">
                                ETB {product.price}
                              </span>
                            </div>
                          ) : (
                            <span className="text-blue-600 font-bold text-sm">
                              ETB {product.price}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-blue-600 text-white py-1.5 rounded text-xs flex items-center justify-center hover:bg-blue-700"
                        >
                          <FiShoppingCart className="mr-1" size={12} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tablet and Desktop Grid - 3 columns on tablet, 3 on desktop */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                  >
                    <Link to={`/products/${product._id}`}>
                      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                        <img
                          src={product.images[0] || 'https://via.placeholder.com/300'}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link to={`/products/${product._id}`}>
                        <h3 className="font-semibold mb-2 line-clamp-2 hover:text-blue-600">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          {product.discount > 0 ? (
                            <div>
                              <span className="text-blue-600 font-bold text-lg">
                                ETB {product.price - product.discount}
                              </span>
                              <span className="text-gray-500 line-through text-sm ml-2">
                                ETB {product.price}
                              </span>
                            </div>
                          ) : (
                            <span className="text-blue-600 font-bold text-lg">
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
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                      >
                        <FiShoppingCart className="mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 border rounded-lg ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
