import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { FiCheck} from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, paymentStatus, orderStatus) => {
    try {
      await api.put(`/orders/${orderId}`, { paymentStatus, orderStatus });
      toast.success('Order updated successfully');
      fetchOrders();
    } catch (error) {
      toast.error('Error updating order');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Manage Orders</h1>

      {/* Tablet and Mobile Card Layout */}
      <div className="lg:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Order #{order._id.slice(-8)}</h3>
                <p className="text-sm text-gray-600 mt-1">{order.userId?.name || 'N/A'}</p>
                <p className="text-xs text-gray-500">{order.userId?.email || 'N/A'}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">ETB {order.grandTotal}</p>
                <p className="text-xs text-gray-500">{order.products.length} item(s)</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.paymentStatus)}`}>
                Payment: {order.paymentStatus}
              </span>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                Status: {order.orderStatus}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {order.paymentStatus === 'pending' && (
                <button
                  onClick={() => updateOrderStatus(order._id, 'paid', order.orderStatus)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center text-sm"
                >
                  <FiCheck className="mr-1" />
                  Mark Paid
                </button>
              )}
              <select
                value={order.orderStatus}
                onChange={(e) => updateOrderStatus(order._id, order.paymentStatus, e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order._id.slice(-8)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{order.userId?.name || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{order.userId?.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.products.length} item(s)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ETB {order.grandTotal}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col space-y-2">
                      {order.paymentStatus === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order._id, 'paid', order.orderStatus)}
                          className="text-green-600 hover:text-green-900 flex items-center"
                        >
                          <FiCheck className="mr-1" />
                          Mark Paid
                        </button>
                      )}
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order._id, order.paymentStatus, e.target.value)}
                        className="text-xs border rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;


