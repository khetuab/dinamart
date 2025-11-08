const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/orders
 * @desc    Get orders (user’s own or all for admin)
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .populate('products.productId', 'name images')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/orders/my
 * @desc    Get logged-in user’s orders (no need for ID param)
 * @access  Private (Customer)
 */
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('userId', 'name email')
      .populate('products.productId', 'name price image')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ message: 'Server error fetching user orders' });
  }
});

/**
 * @route   GET /api/orders/:id
 * @desc    Get single order (admin or owner only)
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('products.productId', 'name images description');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Only allow owner or admin
    if (
      order.userId._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/orders
 * @desc    Create new order
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const { products, shippingAddress, shippingFee, bankUsed, note } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'Products are required' });
    }

    // Calculate totals and validate stock
    let totalAmount = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.name}` });
      }

      const price =
        product.discount > 0 ? product.price - product.discount : product.price;
      const subtotal = price * item.quantity;
      totalAmount += subtotal;

      orderProducts.push({
        productId: product._id,
        name: product.name,
        price,
        quantity: item.quantity,
        subtotal,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const grandTotal = totalAmount + (shippingFee || 0);

    const order = new Order({
      userId: req.user._id,
      products: orderProducts,
      totalAmount,
      shippingFee: shippingFee || 0,
      grandTotal,
      bankUsed,
      shippingAddress,
      note,
      paymentStatus: 'pending',
      orderStatus: 'pending',
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/orders/:id
 * @desc    Update order status/payment (admin only)
 * @access  Private/Admin
 */
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { paymentStatus, orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus, orderStatus, updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
