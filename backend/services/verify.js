const util = require('../utils/utils');

function verify(requestBody) {
  if(!requestBody || !requestBody.user || !requestBody.user.username || !requestBody.token) {
    return util.buildResponse(401, {
      verified: false,
      message: 'incorrect request body'
    })
  }

  const user = requestBody.user;
  const token = requestBody.token;
  const verification = 
}
