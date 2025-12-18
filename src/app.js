const express = require('express');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/tasks.routes');
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

module.exports = app;
