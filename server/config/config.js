// env variables 
var env = process.env.NODE_ENV || 'development';
console.log(env);

if(env === 'development')
{
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if (env === 'test')
{
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}else if (env === 'production')
{
    process.env.MONGODB_URI = "mongodb://admin123@ds119049.mlab.com:19049/todo-app";
}
