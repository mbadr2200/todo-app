// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {


    var db = client.db('TodoApp');

    if(err)
    {
        return console.log('unable to connect....')
    }
    console.log('connected to the DataBase.....')

    // db.collection('Todos').insertOne({
    //     name:'Mostafa Badr',
    //     email:'Mostafa_b2200@yahoo.com',
    //     phone:'01098056741'
    // },(err , result) => {
    //     if(err)
    // {
    //     return console.log('unable to insert....' , err);
    // }
    // console.log('connected to the DataBase.....')
    // console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name:'Mostafa Badr',
    //     age:21,
    //     location:'Alexandria egypt'
    // },(err , result) => {
    //     if(err)
    // {
    //     return console.log('unable to connect....')
    // }
    // console.log('inserted to the DataBase.....');
    // console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    // });

    client.close();
});