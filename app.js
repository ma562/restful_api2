require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)
//localhost:3000/subscribers

//ROUTES
app.get('/', (req, res) => {
    res.send('We are on home');

});

app.get('/posts', (req, res) => {
    res.send('We are on posts');

});

//start listening to server

app.listen(3000, 

    ()=>{
        console.log("listening to port 3000...")
}

)