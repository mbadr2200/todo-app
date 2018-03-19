const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {


    var db = client.db('TodoApp');

    if(err)
    {
        return console.log('unable to connect....')
    }
    console.log('connected to the DataBase.....')

    db.collection('Todos').find({name:'Mostafa Badr'}).count()
    .then((count) => {
        console.log(`Todo count is : ${count}`)
    },(err) => {
        console.log('error',err);
    });
    
    db.collection('Todos').find({name:'Mostafa Badr'}).toArray()
    .then((docs) => {
        console.log(JSON.stringify(docs,undefined,2));
    },(err) => {
        console.log('error',err);
    });
    
    // client.close();
});