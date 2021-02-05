require('dotenv').config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:n8w134xknVAhYeRy@cluster0.wmcvu.mongodb.net/mybrary?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Mongoose"));


app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);