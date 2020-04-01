
module.exports = (app)=>{

    app.use('/task',require('./tasks/tasks.routes'));
    
    app.use('/user',require('./users/users.routes'));

}
