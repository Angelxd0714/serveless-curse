module.exports= {
  plugins: [
    "serverless-dynamodb",
    "serverless-offline",
  ],
  custom: {
    'serverless-dynamodb': {
      port: 5000,
      docker: false,
    }
  }
}