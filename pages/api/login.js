import mongoose from 'mongoose';

// Connection URL
const uri = 'mongodb+srv://amin_lakhani:amin1777@cluster0.xvyllnq.mongodb.net/db_task';

// User schema and model
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define the comparePassword function
userSchema.methods.comparePassword = async function (password) {
  // Compare the provided password with the stored password
  return password === this.password;
};

const User = mongoose.model('User', userSchema);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Connect to the MongoDB database
      await mongoose.connect(uri, { useNewUrlParser: true });

      // Check if the user exists in the database
      const user = await User.findOne({ email });

      if (!user) {
        // User not found
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check if the password is correct
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        // Incorrect password
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Login successful
      // You can set a session or JWT token here if needed

      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Invalid credentials' });
    } finally {
      // Disconnect from the database
      await mongoose.disconnect();
    }
  }

  // Invalid HTTP method
  return res.status(405).json({ error: 'Method Not Allowed' });
}
