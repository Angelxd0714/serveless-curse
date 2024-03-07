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

        // Verificar si el elemento existe antes de intentar eliminarlo
        const getItemParams = {
            TableName: 'usersTable',
            Key: {
                pk: pk,
            },
        };

        const existingItem = await dynamodb.get(getItemParams).promise();

        // Si el elemento no existe, retornar un error 404
        if (!existingItem.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'El elemento no existe' }),
            };
        }

        // Si el elemento existe, proceder con la eliminación
        const deleteParams = {
            TableName: 'usersTable',
            Key: {
                pk: pk,
            },
        };

        // Utiliza await para capturar errores
        const response = await dynamodb.delete(deleteParams).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ response }),
        };
    } catch (error) {
        // Maneja diferentes tipos de errores
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