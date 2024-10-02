const buildResponse = require('../utils/utils').buildResponse;
const verifyToken = require('../utils/auth').verifyToken;

function verify(requestBody) {
  if(!requestBody || !requestBody.user || !requestBody.user.username || !requestBody.token) {
    return buildResponse(401, {
      verified: false,
      message: 'incorrect request body'
    })
  }

  const user = requestBody.user;
  const token = requestBody.token;
  const verification = verifyToken(user.username, token);
  if(!verification.verified) {
    return buildResponse(401, verification);
  }

  return buildResponse(200, {
    verified: true,
    message: 'success',
    user: user,
    token: token
  }
}

module.exports.verify = verify;
