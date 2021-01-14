const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

module.exports = app;