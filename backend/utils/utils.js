function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Control-Type' : 'application/json'
    },
    body: JSON.stringify(body)
  }
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

module.exports = {
  buildResponse,
  getUser
}
