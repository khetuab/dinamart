import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { FiPackage} from 'react-icons/fi';

const CustomerOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
       const res = await api.get('/orders/my');
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching customer orders:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">You have no orders yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="font-semibold text-lg">Order #{order._id.slice(-6)}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.orderStatus === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.orderStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.orderStatus === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : order.orderStatus === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <FiPackage className="inline mr-2" /> 
                  <span>{order.products.length} item(s)</span>
                </div>
                <div className="text-gray-600">
                  Payment: <span className={`font-semibold ${
                    order.paymentStatus === 'paid' ? 'text-green-600' : 
                    order.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="sm:col-span-2 pt-2 border-t">
                  <p className="text-base">
                    Total: <span className="font-bold text-blue-600">ETB {order.grandTotal}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
