const aws = require('aws-sdk');
const { randomUUID } = require('crypto')
let dynamodbClientParams = {

}

if (process.env.IS_OFFLINE) {
    dynamodbClientParams = {
        region: 'localhost',
        endpoint: 'http://localhost:5000',
        accessKeyId: 'MockAccessKeyId',
        secretAccessKey: 'MockSecretAccessKey',
    }
}
const dynamodb = new aws.DynamoDB.DocumentClient({
    dynamodbClientParams
})

const createUsers = async (event, context) => {
    try {
        const pk = randomUUID();
        let userBody = JSON.parse(event.body);
        userBody.pk = pk;
        const params = {
            TableName: 'usersTable',
            Item: userBody,
        };
        console.log(params.Item)
        // Use await to capture errors
        const response = await dynamodb.put
            
        (params).promise();
     

        return {
            statusCode: 200,
            body: JSON.stringify({ user: params.Item }),
        };
    } catch (error) {
        // Handle multiple error types
        console.error('Error:', error.message);

        if (error.code === 'ResourceNotFoundException') {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Recurso no encontrado' }),
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error interno del servidor' }),
            };
        }
    }
};
module.exports = {
    createUsers: createUsers
};