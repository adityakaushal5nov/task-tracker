const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

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

const environment = app.get('env');
console.log('environment: ' + environment);

//check if in production 
if(process.env.NODE_ENV === 'production'){
    //set the static folder
    app.use(express.static('src/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'src', 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`My express server running at port: ${port}`);
});