const express = require('express');
const handleConnectdB = require('./config/database');
const User = require('./models/user');

/** Init express APP */
const app = express();
const PORT = 7777 || 3000;

app.post('/signup', async (req, res) => {
  const userObj = {
    firstName: 'Abinash',
    lastName: 'Shasini',
    password: ' Baklol',
    age: 25,
    gender: 'male',
    bio: "i'm a baklol",
  };

  const user = new User(userObj);
  const response = await user.save();
  if (response) {
    res.send('User signup success fully');
  }
});

/** Connect to dB and start server */
handleConnectdB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started running on prot:- ${PORT}`);
    });
  })
  .catch(() => {
    throw new Error("DataBase can't be connected");
  });
