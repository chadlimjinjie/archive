const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  filename: { type: String, required: true },
  mediaType: { type: Number, required: true }
}, {
  timestamps: true
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;