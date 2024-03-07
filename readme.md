
# Proyecto de Serverless con AWS y DynamoDB

Este proyecto utiliza Serverless Framework para desplegar una función Lambda en AWS que consulta datos desde una tabla de DynamoDB.

## Requisitos previos

1. Instalar Node.js: [https://nodejs.org/](https://nodejs.org/)
2. Instalar Serverless Framework globalmente:

    ```bash
    npm install -g serverless
    ```

3. Configurar el AWS CLI con tus credenciales:

    ```bash
    aws configure
    ```

## Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/serverless-dynamodb-example.git
    cd serverless-dynamodb-example
    ```

2. Instalar las dependencias:

    ```bash
    npm install
    ```

3. Desplegar la función y la tabla de DynamoDB:

    ```bash
    serverless deploy
    ```

Este comando desplegará la función Lambda y la tabla de DynamoDB en tu cuenta de AWS.

## Uso

Una vez desplegado, puedes obtener datos de DynamoDB llamando a la función Lambda a través de la URL proporcionada por Serverless Framework después del despliegue. Puedes encontrar esta URL en la salida del comando `serverless deploy`.

```bash
curl https://<URL-de-tu-funcion-lambda>
