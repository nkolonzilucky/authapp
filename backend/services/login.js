const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const buildResponse = require('../utils/utils').buildResponse;
const getUser = require('../utils/utils').getUser;
const bcrypt = require('bcryptjs');

const ddb = new AWS.DynamoDB.DocumentClient();
const myUserTable = 'myusers';

async function login(user) {
  if(!user || !username || !password) {
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
}
