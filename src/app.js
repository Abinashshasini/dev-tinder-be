const express = require('express');
const handleConnectdB = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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
const authRouter = require('./routes/auth.routes.js');

/** Routes declaration
 * User routes
 */
app.use('/api/v1/users', authRouter);

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
