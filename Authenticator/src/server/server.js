require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uniqueValidator = require('mongoose-unique-validator');

const sgMail = require('@sendgrid/mail'); 

const bcrypt = require('bcrypt'); // For hashing and comparing passwords
const saltRounds = 10;

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());





async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/Test');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Connection error:', err);
  }
}

connectDB();








const UserSchema = new mongoose.Schema({
  UserName: { type: String, unique: true, required: true },
  Email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator);
const User = mongoose.model('Users', UserSchema);






// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);






// SIGNUP route
app.post('/api/users', async (req, res) => {
  const { UserName, Email, password } = req.body;  

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ UserName, Email, password: hashedPassword });
    const user = await newUser.save();
    res.json(user);
  } 
  
  catch (err) {
    console.error('Error:', err);

    if (err.name === 'ValidationError') {
      const errors = err.errors;
      const messages = Object.values(errors).map(e => e.message);
      res.status(400).send({ message: messages.join(', ') });
    } else {
      res.status(500).send({ message: 'Something went wrong, please try again later.' });
    }
  }
});




// LOGIN route
app.post('/api/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {

    const user = await User.findOne({ $or: [{ UserName: identifier }, { Email: identifier }]});
    if (!user) {
      res.status(400).send({ message: `There is no account with username or email: ${identifier}` });
    } 
    else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).send({ message: 'Success' });
      } else {
        res.status(400).send({ message: 'Invalid password!' });
      }

    }

  } 
  
  
  catch (err) {
    console.error('Error:', err);
    res.status(500).send({ message: 'Server error' });
  }


});



// FORGOT ROUTE
app.post('/api/forgot', async (req, res) => {
  const { Email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ Email });
    
    if (user) {
      // Generate a verification link (this is a placeholder; you should implement actual link generation)
      const verificationLink = `http://your-frontend-url/reset-password?token=someUniqueTokenFor${Email}`;

      const msg = {
        to: Email,
        from: 'remyshema20@gmail.com',
        subject: 'Password Reset Request',
        html: `<p>Click the following link to reset your password: <a href="${verificationLink}">${verificationLink}</a></p>`
      };
      await sgMail.send(msg);
      res.status(200).json({ message: 'Verification link sent to your email.' });
    } else {
      res.status(404).json({ message: 'Email was not found in our database.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});






app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


