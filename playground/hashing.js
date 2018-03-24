const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// var message = 'iam user num 3';
// var hashed_message = SHA256(message);


// var data ={
//     id:4
// }

// var token = {
//     data,
//     hash:SHA256(JSON.stringify(data)+'the secret salt').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data)+'the secret salt').toString();

// if (resultHash === token.hash)
// {
//     console.log('data was not changed')
// }else{
//     console.log('data changed !')
// }

// var token = jwt.sign(data,'theSecret');

// var decoded = jwt.verify(token,'theSecret');



var password = 'thisispassword';

bcrypt.genSalt(10,(err,salt) => {
     bcrypt.hash(password,salt,(err,hash) => {
        // console.log(hash);
    });
});

var hashed_password = '$2a$10$v7GQcquv6AQqRQkvAMmz7uyfHxP0SjI0uWlFvCv.zR6zWstfBIqrW';

bcrypt.compare(password,hashed_password,(err,result) => {
    console.log(result);
})