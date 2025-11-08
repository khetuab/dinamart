const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

const shippingAddressSchema = new mongoose.Schema({
  label: { type: String, required: true },
  region: { type: String, required: true },
  city: { type: String, required: true },
  subCity: { type: String, required: true },
  street: { type: String, required: true },
  houseNumber: { type: String, required: true },
  postalCode: { type: String }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [orderProductSchema],
  totalAmount: { type: Number, required: true },
  shippingFee: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['bank_transfer'], default: 'bank_transfer' },
  bankUsed: {
    name: { type: String },
    accountNumber: { type: String }
  },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  orderStatus: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  shippingAddress: shippingAddressSchema,
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

