const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');

require('./db');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const auth = require('./middleware/auth');

app.use('/api/contacts', auth, contactsRouter);
app.use('/api/users', authRouter);
app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: error.message })
});

module.exports = app;
