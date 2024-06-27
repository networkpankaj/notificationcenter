const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Leave = require('./models/leave');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/notificationApp');

app.get('/api/leave', async (req, res) => {
  try {
      const leaves = await Leave.find();
      res.json(leaves);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post('/api/leave', async (req, res) => {
  try {
      const { user, message } = req.body;
      const leave = new Leave({ user, message });
      await leave.save();
      res.status(201).json({ message: 'Leave request submitted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
