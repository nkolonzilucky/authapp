const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const buildResponse = require('../utils/utils').buildResponse;
const bcrypt = require('bcryptjs');

const ddb = new AWS.DynamoDB.DocumentClient();
const myUserTable = 'myusers';

async function register(userInfo) {
    const name = userInfo.name;
    const email = userInfo.email;
    const password = userInfo.password;
    const username = userInfo.username;
    if (!name || !email || !password || !username) {
        return buildResponse(400, {message: 'all fields are required, Invalid input'});
    }

    const dynamoUser = await getUser(username);
    if (dynamoUser && dynamoUser.username) {
        return buildResponse(401, {message: 'username already exists in our database. Please choose another username.'})
    }

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPW
    }

    const saveUserResponse = await saveUser(user);
    if(!saveUserResponse)  {
        return buildResponse(503, {message: 'Server Error. Please try again later.'});
    }

    return buildResponse(200, {username: username});
}

async function getUser(username) {
    const params = {
        TableName: myUserTable,
        Key: {
            username: username
        }
    }
    return await ddb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.log('There is an error: ', error)
    })
}

async function saveUser(user) {
    const params = {
        TableName: myUserTable,
        Item: user
    }
    return await ddb.put(params).promise().then(() => true, error => console.log('There is an error saving the user: ', error))
}

module.exports.register = register;
