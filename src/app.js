const express = require('express');
const handleConnectdB = require('./config/database');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ApiError } = require('./utils/apiError.js');
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

/** import routes */
const userRouter = require('./routes/user.routes.js');

/** Routes declaration
 * User routes
 */
app.use('/api/v1/users', userRouter);

app.get('/profile', async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error('token not available');
    }
    const decodedMessage = await jwt.verify(token, process.env.SECRET_KEY);
    console.log('decodedMessage: ', decodedMessage);
    const { _id } = decodedMessage;
    console.log('_id: ', _id);

    const user = await User.findById(_id);
    console.log('user: ', user);

    if (!user) {
      throw new Error('token not available');
    }

    res.send(user);
  } catch (err) {
    res.status(404).send(`Something went worng ${err}`);
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
