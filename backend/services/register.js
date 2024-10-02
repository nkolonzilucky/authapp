const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const buildResponse = require('../utils/utils').buildResponse;

const ddb = new AWS.DynamoDB.DocumentClient();
const userTable = 'myusers';

async function register(userInfo) {
    const name = userInfo.name;
    const email = userInfo.email;
    const password = userInfo.password;
    const username = userInfo.username;
    if (!name || !email || !password || !username) {
        return buildResponse(400, 'all fields are required, Invalid input');
    }
}