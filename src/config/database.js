const mongoose = require('mongoose');

/** Function to connect to antisosh dB */
const handleConnectdB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Antisosh:Antisosh@007@antisosh.tpfov.mongodb.net/AntiSosh'
    );
  } catch (error) {}
};

module.exports = handleConnectdB;
