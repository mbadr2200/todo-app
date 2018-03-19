const {ObjectID} = require('mongodb');
const {mongoose} =  require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');



// id for the todo and check its validation 

// var id = "5aad72221428c61bb013a3283";
// if(!ObjectID.isValid(id)){
//     console.log('ID IS NOT VALID ......')
// };

// diffrent  find method test

// Todo.find({
//     _id:id
// }).then((todos) => {
//     console.log(todos)
// });

// Todo.findOne({
//     _id:id
// }).then((todo) => {
//     if(!todo)
//     {
//         return console.log('404 Id NOT FOUND ')
//     }
//     console.log(todo)
// });

// Todo.findById(id).then((todo) => {
//     if(!todo)
//     {
//         return console.log('ID NOT FOUND ......')
//     }
//     console.log(todo);
// }).catch(e => console.log(e));



var userId = '5aad75fc5dcee43828e0a884';

User.findById(userId).then((user) => {

    if(!user)
    {
        return console.log('USER NOT FOUND ....')
    }
    console.log('uSER :',user)

}).catch(e => console.log(e));