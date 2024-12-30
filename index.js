require('dotenv').config();
const express = require('express')
const app = express()
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const mongoose = require('mongoose');
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false})); 

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;


// routes
app.use('/api/products', productRoute);


app.get('/', (req, resp) => {
    resp.send("hello from node api updated");
});

 
//connect to mongodb
mongoose.connect(mongoUri)
    .then(() => {
        console.log("connected to mongodb")
        app.listen(port, () => {
            console.log(`server is running on port ${port} updated`)
        });
    })
    .catch(() => {
        console.log("connection failed")
    });