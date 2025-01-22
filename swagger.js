const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Momorize Quotes API',
    description: 'Memorize quotes for CSE341 project',
  },
  host: 'localhost:3000',
  schemes: ['http' ,'https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);