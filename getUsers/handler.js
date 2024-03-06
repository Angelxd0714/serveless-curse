
const aws = require('aws-sdk')
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
const ddb = new aws.DynamoDB.DocumentClient(
    dynamodbClientParams
)
const getUsers = async (event, context) => {
    let userId = event.pathParameters.id;
    const params = {
        ExpressionAttributeValues: {
            ':pkValue': userId
        },
        KeyConditionExpression: 'pk = :pkValue',
        TableName: 'usersTable'
    };

    console.log("Querying DynamoDB with params:", params); // Log query parameters

    try {
        const response = await ddb.query(params).promise();
        const item = response.Items[0];

        console.log("DynamoDB response:", response); // Log the entire response

        if (item) {
            return {
                statusCode: 200,
                body: JSON.stringify(item)
            };
        } else {
            console.warn("No item found for:", userId); // Log if no item found
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'User not found' })
            };
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

module.exports = {
    getUsers: getUsers
};
