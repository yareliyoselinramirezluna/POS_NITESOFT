const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  type: String,
  presentation: String,
  unit: String,
  dosage: String,
  composition: [String],
  price: Number,
  stock: Number,
  manufacturer: String,
  expirationDate: Date,
  prescriptionRequired: { type: Boolean, default: false },
  administrationRoute: String,
  sideEffects: [String],
  indications: [String],
  contraindications: [String],
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
