const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express()
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ak6zw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const port = 3001

console.log(process.env.DB_USER);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const products = client.db("emaJohnStore").collection("products");
  // perform actions on the collection object
//   client.close(); // Must remove this line

    app.get('/addProduct', (req,res) => {
        const product = req.body;
        products.insertOne(product)
        .then(result => {
            console.log(result);
        })
    })

console.log('database connected')
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})