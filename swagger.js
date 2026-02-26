const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Port de Russel",
      version: "1.0.0",
      description: "Documentation de l'API Port de Russel"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },

  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;