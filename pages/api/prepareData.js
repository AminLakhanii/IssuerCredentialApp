const express = require('express');
const router = express.Router();
const FormModel = require('../../server/models/FormModel');

router.get('/', async (req, res) => {
  try {
    // Retrieve all form data from the database
    const formData = await FormModel.find();

    // Prepare the data in a specific format
    const preparedData = formData.map((form) => {
      return {
        fullName: form.fullname,
        email: form.email,
        phoneNumber: form.phoneNumber,
        address: form.address,
        aadhaarCard: form.aadhaarCard,
      };
    });

    res.json(preparedData);
  } catch (error) {
    console.error('Error preparing form data:', error);
    res.status(500).send('Error occurred while preparing form data!');
  }
});

module.exports = router;
    