const express = require('express');
const Bank = require('../models/Bank');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/banks
// @desc    Get all active banks
// @access  Public
router.get('/', async (req, res) => {
  try {
    const banks = await Bank.find({ isActive: true }).sort({ bankName: 1 });
    res.json(banks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/banks
// @desc    Add bank account
// @access  Private/Admin
router.post('/', [auth, admin], async (req, res) => {
  try {
    const bank = new Bank(req.body);
    await bank.save();
    res.status(201).json(bank);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/banks/:id
// @desc    Update bank account
// @access  Private/Admin
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const bank = await Bank.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!bank) {
      return res.status(404).json({ message: 'Bank not found' });
    }
    res.json(bank);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/banks/:id
// @desc    Delete bank account
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const bank = await Bank.findByIdAndDelete(req.params.id);
    if (!bank) {
      return res.status(404).json({ message: 'Bank not found' });
    }
    res.json({ message: 'Bank deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

