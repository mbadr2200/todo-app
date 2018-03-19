// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {


    var db = client.db('TodoApp');

    if(err)
    {
        return console.log('unable to connect....')
    }
    console.log('connected to the DataBase.....')

    // db.collection('Users').findOneAndUpdate({
    //     _id: new ObjectID('5aad338b44e6b791a918c0f5')
    // },{
    //     $set:{
    //         completed:true
    //     }
    // },{
    //     returnOriginal:false
    // }).then((result) => { console.log(result)});


    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5aad338b44e6b791a918c0f5')
    },{
        $set:{
            text:'change the task'
        },
        $inc:{
            age:1
        }
    },{
        returnOriginal:false
    }).then((result) => { console.log(result)});


    // client.close();
});