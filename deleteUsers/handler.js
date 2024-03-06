const aws = require('aws-sdk');

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

const deleteUsers = async (event, context) => {
    try {
        const pk = event.pathParameters.id;
        const params = {
            TableName: 'usersTable',
            Key: { // Added the Key parameter here
                pk: pk // Specify the primary key value
            },
            UpdateExpression: 'pk = :pk',
            
            ReturnValues: 'Delete_pk'
        };
    
        // Use await to capture errors
        const response = await dynamodb.delete

            (params).promise();


        return {
            statusCode: 200,
            body: JSON.stringify({ user: params.Item, 'response': response }),
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
    deleteUsers: deleteUsers
};