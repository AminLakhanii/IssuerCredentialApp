const express = require('express');
const router = express.Router();
const FormModel = require('../../server/models/FormModel');

router.get('/', async (req, res) => {
  try {
    // Retrieve all form data from the database
    const formData = await FormModel.find();

    res.json(formData);
  } catch (error) {
    console.error('Error retrieving form data:', error);
    res.status(500).send('Error occurred while retrieving form data!');
  }
});

module.exports = router;
