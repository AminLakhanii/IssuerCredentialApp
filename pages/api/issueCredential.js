const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const { ethers } = require('ethers');
const FormModel = require('../../server/models/FormModel');
const { web3, contract } = require('./polygonIntegration');
const { MONGODB_URI } = require('../../server/config/mongodb');

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Set up multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Create multer instance
const upload = multer({ storage });

router.post('/', upload.single('aadhaarCard'), async (req, res) => {
  const { fullname, email, phoneNumber, address } = req.body;
  const aadhaarCard = req.file;

  try {
    // Create a new form instance
    const form = new FormModel({
      fullname,
      email,
      phoneNumber,
      address,
      aadhaarCard: aadhaarCard.filename,
    });

    // Save the form data
    await form.save();

    // Retrieve the saved form data
    const savedForm = await FormModel.findById(form._id);

    // Format the form data into credential structure
    const credentialData = {
      "@context": "http://localhost:3000/contexts/formCredentialContext.jsonld",
      "id": `http://localhost:3000/credentials/${form._id}`,
      "type": "FormCredential",
      "issuer": "YourIssuerAddress",
      "issuanceDate": new Date().toISOString(),
      "credentialSubject": {
        "id": `http://localhost:3000/subjects/${form._id}`,
        "fullname": savedForm.fullname,
        "email": savedForm.email,
        "phoneNumber": savedForm.phoneNumber,
        "address": savedForm.address,
        "aadhaarCard": savedForm.aadhaarCard,
      }
    };

    // Convert the credential data to JSON string
    const credentialDataJson = JSON.stringify(credentialData);

    // Issue the credential on the Polygon network
    // Call the appropriate function on your contract to issue the credential
    await contract.issueCredential(credentialDataJson);

    console.log('Credential issued successfully!');
    res.send('Credential issued successfully!');
  } catch (error) {
    console.error('Error issuing credential:', error);
    res.status(500).send('Error occurred while issuing credential!');
  }
});

module.exports = router;
