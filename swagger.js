const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Momorize Quotes API',
    description: 'Memorize quotes for CSE341 project',
  },
  host: 'cse341-memorize-quotes.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);