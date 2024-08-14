const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt'); // For hashing and comparing passwords
const saltRounds = 10;

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/Test')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
  UserName: { type: String, unique: true, required: true },
  Email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});






UserSchema.plugin(uniqueValidator);
const User = mongoose.model('Users', UserSchema);













// SIGNUP route
app.post('/api/users', async (req, res) => {
  const { UserName, Email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ UserName, Email, password: hashedPassword });

    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    console.error('Error:', err);

    if (err.name === 'ValidationError') {
      const errors = err.errors;
      const messages = Object.values(errors).map(e => e.message);
      res.status(400).json({ message: messages.join(', ') });
    } else {
      res.status(500).json({ message: 'Something went wrong, please try again later.' });
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
      //const isMatch = password === user.password;
      if (isMatch) {
        res.status(200).send({ message: 'Success' });
      } else {
        res.status(400).send({ message: `${isMatch}` });
      }

    }

  } 
  
  
  catch (err) {
    console.error('Error:', err);
    res.status(500).send({ message: 'Server error' });
  }


});









app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


