// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {


    var db = client.db('TodoApp');

    if(err)
    {
        return console.log('unable to connect....')
    }
    console.log('connected to the DataBase.....')

    // deleteMany  
    db.collection('Todos').deleteMany({name:'Mostafa Badr'}).then((result) => {
        console.log(`delete ${result} document `);
    });

    // deleteOne
    db.collection('Todos').deleteOne({name:'ahmed Badr'}).then((result) => {
        console.log(`delete ${result} document `);
    });
    // findOneAndDelete
    db.collection('Todos').findOneAndDelete({name:'alaa shabat'}).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({
        _id : new ObjectID('5aacf776c0b6a025042d19bd')
    }).then((result) => {
        console.log(result);
    });

    // client.close();
});