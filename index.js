const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });



app.get('/foods', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("foods");
        collection.find(/* you can use any filter here like that {name: "Mobile"}*/).toArray((err, documents) => {
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
        });
});

// app.get('/product/:key', (req, res)=>{
//     const key = req.params.key;
//     client = new MongoClient(uri, { useNewUrlParser: true });
//     client.connect(err => {
//         const collection = client.db("onlineStore").collection("products");
//         collection.find({key:key}).toArray((err, documents) => {
//             if(err){
//                 console.log(err)
//                 res.status(500).send({message:err});
//             }
//             else{
//                 res.send(documents[0]);
//             }
//             });
//             client.close();
//         });
    
// });

// app.post('/getProductByKey', (req, res)=>{
//     const key = req.params.key;
//     const productKeys =req.body;
//     console.log(productKeys);
//     client = new MongoClient(uri, { useNewUrlParser: true });
//     client.connect(err => {
//         const collection = client.db("onlineStore").collection("products");
//         collection.find({key:{$in: productKeys}}).toArray((err, documents) => {
//             if(err){
//                 console.log(err)
//                 res.status(500).send({message:err});
//             }
//             else{
//                 res.send(documents);
//             }
//             });
//             client.close();
//         });   
// });

app.post('/addFood', (req, res)=> {
        client = new MongoClient(uri, { useNewUrlParser: true });
        const foods =req.body;
        client.connect(err => {
        const collection = client.db("redOnion").collection("foods");
        // perform actions on the collection object
        collection.insertMany(foods, (err, result) => {
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
        });
});

// app.post('/placeOrder', (req, res)=> {
//     const orderDetails =req.body;
//     orderDetails.orderTime = new Date();
//     console.log(orderDetails);
//     client = new MongoClient(uri, { useNewUrlParser: true });
//     client.connect(err => {
//     const collection = client.db("onlineStore").collection("orders");
//     collection.insertOne(orderDetails, (err, result) => {
//         if(err){
//             console.log(err)
//             res.status(500).send({message:err});
//         }
//         else{
//             res.send(result.ops[0]);
//         }
//     });
//     client.close();
//     });
// });

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log("listening to port 8080"));