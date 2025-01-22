const express = require('express');
const cors = require('cors');
const mongodb = require('./data/mongodb.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/', require('./routes/index.js'));

process.on('uncaughtException', (err) => {
  console.log(process.stderr.fd, `Caught exception: ${err} \n Exception origin: ${origin}`);
});

mongodb.initDb((err, db) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }
});