const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'DinaMart' },
  contactEmail: { type: String },
  contactPhone: { type: String },
  address: { type: String },
  currency: {
    symbol: { type: String, default: 'ETB' },
    code: { type: String, default: 'ETB' }
  },
  bankTransferInstructions: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settings', settingsSchema);

