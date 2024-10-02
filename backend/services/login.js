const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const buildResponse = require('../utils/utils').buildResponse;
const getUser = require('../utils/utils').getUser;
const generateToken = require('../utils/auth').generateToken;
const bcrypt = require('bcryptjs');

const ddb = new AWS.DynamoDB.DocumentClient();
const myUserTable = 'myusers';


async function login(user) {

  if(!user || !user.username || !user.password) {
    return buildResponse(401, {message: 'username and password are required'})
  }
  const username = user.username;
  const password = user.password;

  const dynamoUser = await getUser(username.toLowerCase().trim());
  if (!dynamoUser || !dynamoUser.username) {
    return buildResponse(403, {message: 'user does not exist'});
  }

  if (!bcrypt.compareSync(password, dynamoUser.password)) {
    return buildResponse(403, {message: 'password is incorrect'});
  }

  const userInfo = {
    username: dynamoUser.username,
    name: dynamoUser.name
  }

  const token = generateToken(userInfo);

  const response = {
    user: userInfo,
    token: token
  }

  return buildResponse(200, response);
  
}
