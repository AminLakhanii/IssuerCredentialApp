const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  aadhaarCard: {
    type: Buffer,
    required: true,
  },
});

const FormModel = mongoose.models.Form || mongoose.model('Form', FormSchema);

module.exports = FormModel;
