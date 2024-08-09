const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/Test')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
  UserName: String,
  Email: String,       
  password: String, 
});




const User = mongoose.model('Users', UserSchema);


app.post('/api/Users', (req, res) => {
  const { UserName, Email, password } = req.body;

  const newUser = new User({ UserName, Email, password });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
