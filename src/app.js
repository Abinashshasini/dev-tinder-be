const express = require('express');
const handleConnectdB = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const User = require('./models/user');

/** Init express APP */
const app = express();
const PORT = 7777 || 3000;
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '16kb',
  })
);
app.use(express.static('public'));
app.use(cookieParser());

app.post('/signup', async (req, res) => {
  try {
    const user = new User({
      firstName: 'Abinash',
      lastName: 'Shasini',
      password: 'Baklol',
      age: 25,
      gender: 'male',
      bio: "I'm a baklol",
    });
    console.log('user', user);

    await user.save();
    res.status(201).send('User signup successful');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Error signing up user');
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
