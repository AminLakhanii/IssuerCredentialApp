import { MongoClient } from 'mongodb';
const { v4: uuidv4 } = require('uuid');

const generateDID = () => {
  // Generate a unique DID using uuidv4
  return `did:${uuidv4()}`;
};

export default async function registerHandler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { email, fullname, password } = req.body;

  // MongoDB connection string
  const uri = 'mongodb+srv://amin_lakhani:amin1777@cluster0.xvyllnq.mongodb.net/db_task';

  // Create a new MongoClient
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the database
    const db = client.db('db_task');


    // Check if the email already exists in the database
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      console.log('Email-ID is already registered');
      res.status(400).json({ message: 'Email already registered' });
      return;
    }

    // Create a unique DID for the user
    const did = generateDID();

    // Store the user data in the database
    await db.collection('users').insertOne({
      email,
      fullname,
      password,
      did,
    });

    console.log('User registered successfully');

    // Call the identityCreation function
    await identityCreation(email, did, db);

    // Send the success response
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    // Close the database connection
    await client.close();
  }
}

// Function to create identity
async function identityCreation(email, did, db) {
  try {
    // Insert the identity information into the 'identities' collection
    await db.collection('identities').insertOne({
      email,
      did,
    });

    console.log(`Identity created for ${email} with DID: ${did}`);
  } catch (error) {
    console.error(error);
    // Handle the error case here
  }
}
