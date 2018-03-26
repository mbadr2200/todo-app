// enviromenta variables
require('./config/config');
// Libraries
const _ = require('lodash');
const express =  require('express');
const bodyParser = require('body-parser');
const {ObjectID} =require('mongodb');
const jwt = require('jsonwebtoken');
//Files
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authunticate} = require('./middleware/authunticate');

// get express work
var app = express();
var port = process.env.PORT || 3000;

// Set the middleWare
app.use(bodyParser.json());
 
// post request to save the todo
app.post('/todos', (req,res) => {

    var todo =  new Todo({
    });

    todo.save().then((doc) => {
        res.send(doc);
        text:req.body.text
    },(e) => {
        res.status(400).send(e);
    });

});

// GET request to list the todos

app.get('/todos',(req,res) => {
    Todo.find()
     .then((todos) => {
        res.send({todos})
     },(err) => {
        res.status(400).send(e);
     });
});

// GET request a todo or user with the id provided in url params
app.get('/todos/:id',(req,res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id)
        .then((todo) => {
            if(!todo){
                return res.status(404).send();
            }
            res.status(200).send(todo);
        })
        .catch((e) => {
            res.status(400).send();
        });
});

// delete todo section 
app.delete('/todos/:id',(req,res) => {
    
    var todo_id = req.params.id;


    if(!ObjectID.isValid(todo_id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(todo_id)
    .then((todo) => {

        if(!todo) {
            res.status(404).send();
        }

        res.send(todo).status(200);
        
    })
    .catch((e) => {
        res.status(400).send();
    });

})

// update the todo 
 app.patch('/todos/:id',(req,res) => {
     var id = req.params.id;
     var body = _.pick(req.body,['text','completed']);

     if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed)
    {
        body.completedAt = new Date().getTime();
    }else
    {
        body.completed= false;
        body.completedAt=null;
    }

    Todo.findByIdAndUpdate(id,{$set:body} , {new:true})
    .then((todo) => {
        
        if(!todo){
           return res.status(404).send();
        }

        res.status(200).send(todo);
    })
    .catch((e) => {
        res.status(400).send();
    });
 });

// sign up a new user  -- register 
 app.post('/users',(req,res) => {

    var body = _.pick(req.body,['email','password']);

    var user = new User(body);

    user.save()
    .then(() => {
        return user.generateAuthToken()
    })
    .then((token) => {
        res.header('x-auth',token).send(user)
    })
    .catch((e) => {
        res.status(400).send(e)
    })
    
 })
 
// Login in excisting user
app.post('/users/login', (req,res) => {

    var body = _.pick(req.body,['email','password']);

    User.findByCredentials(body.email,body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(user);
        })
    })
    .catch((e) => {
        res.status(400).send();
    });
});

// log in with exsiting user
app.get('/users/me',authunticate,(req,res) => {
    res.send(req.user);
});


// listen to port
app.listen(port,() =>console.log(`Server Connected to port ${port}...`));