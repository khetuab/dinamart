import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { FiCopy, FiShare2, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [copiedBank, setCopiedBank] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    label: 'Home',
    region: '',
    city: '',
    subCity: '',
    street: '',
    houseNumber: '',
    postalCode: '',
  });
  const [shippingFee] = useState(0);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }

    const fetchBanks = async () => {
      try {
        const res = await api.get('/banks');
        setBanks(res.data);
        if (res.data.length > 0) {
          setSelectedBank(res.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };
    fetchBanks();
  }, [cart, navigate]);

  const handleCopyAccount = async (accountNumber) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedBank(accountNumber);
      toast.success('Account number copied to clipboard!');
      setTimeout(() => setCopiedBank(null), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handleShare = async (bank) => {
    const text = `${bank.bankName}\nAccount Holder: ${bank.accountHolder}\nAccount Number: ${bank.accountNumber}\nBranch: ${bank.branch || 'N/A'}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bank Account Details',
          text: text,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error('Failed to share');
        }
      }
    } else {
      // Fallback: copy to clipboard
      await handleCopyAccount(bank.accountNumber);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedBank) {
      toast.error('Please select a bank account');
      return;
    }

    if (!shippingAddress.region || !shippingAddress.city || !shippingAddress.street) {
      toast.error('Please fill in all required address fields');
      return;
    }

    setLoading(true);
    try {
      // const bank = banks.find((b) => b._id === selectedBank);
      // const orderData = {
      //   products: cart.map((item) => ({
      //     productId: item.productId,
      //     quantity: item.quantity,
      //   })),
      //   shippingAddress,
      //   shippingFee,
      //   bankUsed: {
      //     name: bank.bankName,
      //     accountNumber: bank.accountNumber,
      //   },
      //   note,
      // };

      //  const _res = await api.post('/orders', orderData);
      toast.success('Order placed successfully! Please complete the payment.');
      clearCart();
      navigate('/products');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  const selectedBankData = banks.find((b) => b._id === selectedBank);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">Label *</label>
                <input
                  type="text"
                  value={shippingAddress.label}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, label: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Region *</label>
                <input
                  type="text"
                  value={shippingAddress.region}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, region: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">City *</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, city: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Sub City</label>
                <input
                  type="text"
                  value={shippingAddress.subCity}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, subCity: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Street *</label>
                <input
                  type="text"
                  value={shippingAddress.street}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, street: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">House Number *</label>
                <input
                  type="text"
                  value={shippingAddress.houseNumber}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, houseNumber: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Postal Code</label>
                <input
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <p className="text-gray-600 mb-4">
              Please select a bank account and make a transfer. Your order will be verified after payment.
            </p>

            <div className="space-y-3">
              {banks.map((bank) => (
                <div
                  key={bank._id}
                  className={`border-2 rounded-lg p-4 cursor-pointer ${
                    selectedBank === bank._id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedBank(bank._id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{bank.bankName}</h3>
                      <p className="text-sm text-gray-600">
                        Account Holder: {bank.accountHolder}
                      </p>
                      <p className="text-sm text-gray-600">
                        Account Number: {bank.accountNumber}
                      </p>
                      {bank.branch && (
                        <p className="text-sm text-gray-600">Branch: {bank.branch}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyAccount(bank.accountNumber);
                        }}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        title="Copy account number"
                      >
                        {copiedBank === bank.accountNumber ? (
                          <FiCheck />
                        ) : (
                          <FiCopy />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(bank);
                        }}
                        className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        title="Share"
                      >
                        <FiShare2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Note */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Note (Optional)</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any special instructions or notes..."
            />
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>ETB {item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>ETB {getCartTotal()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>ETB {shippingFee}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">ETB {getCartTotal() + shippingFee}</span>
                </div>
              </div>
            </div>

            {selectedBankData && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Selected Bank:</p>
                <p className="text-sm">{selectedBankData.bankName}</p>
                <p className="text-sm font-mono">{selectedBankData.accountNumber}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

