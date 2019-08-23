const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}
);

const connection = mongoose.connection;
connection.once('open', (req, res) => {
    console.log('MongoDB databse connected succesfully');
})
.on('error', error => console.log('Error connecting to MongoLab:', error));

const exerciseRouter = require('./routes/exercise');
const usersRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);
app.listen(port, () => {
    console.log(`My express server running at port: ${port}`);
});