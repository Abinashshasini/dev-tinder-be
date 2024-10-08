const bcrypt = require('bcrypt');
const { asyncHandler } = require('../utils/asyncHandler');
const ConnectionRequest = require('../models/connectionRequest.js');
const { ApiError } = require('../utils/apiError.js');
const { ApiResponse } = require('../utils/apiResponse.js');

/** Cookie option's for setting user cookies */
const cookiesOptions = {
  httpOnly: true,
  secure: true,
};

/**
 * STEPS
 * 1. Get user details and send to frontend.
 */
const handleLikeOrPass = asyncHandler(async (req, res) => {
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;
  const allowedStatus = ['ignored', 'intrested'];
  if (!allowedStatus.includes(status)) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, `Invalid status type ${status}`));
  }

  const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
  });

  const response = await connectionRequest.save();

  return res
    .status(201)
    .json(
      new ApiResponse(200, response, 'Connection request sent successfully.')
    );
});

module.exports = {
  handleLikeOrPass,
};
