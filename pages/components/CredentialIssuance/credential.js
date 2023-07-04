const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Credential = mongoose.models.Credential || mongoose.model('Credential', CredentialSchema);

module.exports = Credential;
