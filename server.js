const express = require('express');
const axios = require("axios");
const  xml2js  =  require('react-native-xml2js');
const app = express();
const {MongoClient,ObjectId} = require('mongodb')
const port = process.env.PORT || 5000;
const router = express.Router(); 
const bodyParser= require('body-parser')

let db
const dbName = "todolist"
const MONGODB_CONNECT_URL = "mongodb://localhost:27017/"

app.use(bodyParser.json({type: 'application/json'}))

MongoClient.connect(MONGODB_CONNECT_URL, (err, client) => {
  if (err) return console.log(err)
    db = client.db(dbName);
    
    router.route('/lists')
        .post((req, res) => {
            db.collection('lists').save(req.body, (err, result) => {
            if (err) return console.log(err)
                res.send({_id:req.body._id,result})
            })
        })
        .delete((req, res) => {
             const {_id} =  req.query
             db.collection('lists').deleteOne({'_id': ObjectId(_id)}).then((result) => {
                db.collection('todos').deleteMany({'list_id': ObjectId(_id)});
                res.send({result});
    		})
        })
        .get((req, res) => {
                db.collection('lists').aggregate([{
                    "$lookup": {
                        "from": "todos",
                        "localField": "_id",
                        "foreignField": "list_id",
                        "as": "todos"
                    }
               }
               ]).toArray((err,list) => {
                    res.send({list});
        	   })
    });
    
    
        
    router.route('/todos')
        .post((req, res) => {
            const {body} = req
            body.list_id = ObjectId(body.list_id)
            db.collection('todos').save(body, (err, result) => {
            if (err) return console.log(err)
                 res.send({_id:req.body._id,result})
            })
        })
        .delete((req, res) => {
             const {_id} =  req.query
             db.collection('todos').deleteOne({'_id': ObjectId(_id)}).then((result) => {
    		      res.send({result});
    		})
        });
        router.route('/todos/:_id')
         .put(function(req, res) {
            const {_id} = req.params;
            let {body} = req
            if('list_id' in body){
                body.list_id  = ObjectId(body.list_id)
            }
            db.collection('todos').update({'_id': ObjectId(_id)},{ $set: body}, (err, result) => {
            if (err) return console.log(err)
                 res.send({result})
            })
        });

})

app.use('/api', router);
app.listen(port, () => console.log(`Listening on port ${port}`));