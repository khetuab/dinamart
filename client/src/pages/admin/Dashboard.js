import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { FiPackage, FiShoppingCart, FiUsers, FiDollarSign } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          api.get('/products?limit=1'),
          api.get('/orders'),
          api.get('/users'),
        ]);

        const totalRevenue = ordersRes.data
          .filter((order) => order.paymentStatus === 'paid')
          .reduce((sum, order) => sum + order.grandTotal, 0);

        setStats({
          totalProducts: productsRes.data.totalProducts || 0,
          totalOrders: ordersRes.data.length || 0,
          totalUsers: usersRes.data.length || 0,
          totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
            <FiPackage className="text-4xl text-blue-600" />
          </div>
          <Link
            to="/admin/products"
            className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
          >
            Manage Products →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
            <FiShoppingCart className="text-4xl text-green-600" />
          </div>
          <Link
            to="/admin/orders"
            className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
          >
            View Orders →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <FiUsers className="text-4xl text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">ETB {stats.totalRevenue.toLocaleString()}</p>
            </div>
            <FiDollarSign className="text-4xl text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products"
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 text-center"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 text-center"
          >
            View Orders
          </Link>
          <Link
            to="/admin/banks"
            className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 text-center"
          >
            Manage Banks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

