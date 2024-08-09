const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema and model
const UserSchema = new mongoose.Schema({
  UserName: String,
  passwordOne: String,
});

const User = mongoose.model('Users', UserSchema);

// Define routes
app.post('/api/Users', (req, res) => {
  const { UserName,  passwordOne} = req.body;

  const newUser = new User({ UserName,  passwordOne });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
