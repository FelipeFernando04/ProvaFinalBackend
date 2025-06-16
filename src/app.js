const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const { swaggerUi, specs } = require('./docs/swagger');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

module.exports = app;
