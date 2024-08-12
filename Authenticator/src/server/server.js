const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcryptjs'); // For hashing and comparing passwords

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/Test')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
  UserName: { type: String, unique: true, required: true },
  Email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});






UserSchema.plugin(uniqueValidator, { message: '{PATH} with value `{VALUE}` already exists.' });
const User = mongoose.model('Users', UserSchema);













// SIGNUP route
app.post('/api/users', (req, res) => {
  const { UserName, Email, password } = req.body;

  const newUser = new User({ UserName, Email, password });


  newUser.save().then(user => res.json(user))
  .catch(err => {
    console.error('Error:', err);
    
    if (err.name === 'ValidationError') {
      const errors = err.errors;
      const messages = Object.values(errors).map(e => e.message);
      res.status(400).json({ message: messages.join(', ') });
    } 
    else {
      res.status(500).json({ message: 'Im the error in serverside' });
    }
  });


});




// LOGIN route
app.post('/api/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {

    const user = await User.findOne({
      $or: [{ UserName: identifier }, { Email: identifier }]
    });

    if (!user) {
      return res.status(400).json({ message: `There is no user with ${identifier}` });
    }

    // Compare the provided password with the stored hashed password
    //const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    console.log(isMatch);

    if (isMatch) {
      // Passwords match, successful login
      return res.status(200).json({ message: 'Success' });
    } else {
      // Passwords do not match
      return res.status(400).json({ message: 'Invalid password' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});









app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

















































  /*
  const usernameToCheck = "Shemaremy";
  User.findOne({ UserName: usernameToCheck })
  .then(existingUser => {
    if (existingUser) {
      // Username already exists
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // If username does not exist, proceed to save the new user
    return newUser.save();
  })
  .then(user => {
    // Ensure this block only executes if no earlier response has been sent
    console.log("User saved successfully.");
    res.json(user);
  })
  .catch(err => {
    // Handle any errors, ensuring this block only executes if no earlier response has been sent
    if (err.responseHeadersSent) {
      // Ensure this block doesn't run if headers have already been sent
      return;
    }
    res.status(500).json({ message: 'An unexpected error occurred. Please try again.' });
  });

  */