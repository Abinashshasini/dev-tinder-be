const express = require('express');
const handleConnectdB = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send('User signup successful');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Error signing up user');
  }
});

app.get('/user', async (req, res) => {
  const emailId = req.body.emailId;
  console.log('emailId: ', emailId);

  try {
    const user = await User.findOne({ emailId: emailId });
    console.log('user: ', user);
    res.send(user);
  } catch (error) {
    res.status(500).send('Error finding the user');
  }
});

app.get('/feed', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send('Error finding the user');
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
