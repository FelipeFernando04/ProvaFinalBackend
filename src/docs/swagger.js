const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Backend Final",
      version: "1.0.0",
      description: "Documentação da API"
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
