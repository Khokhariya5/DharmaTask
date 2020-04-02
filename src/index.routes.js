
module.exports = (app)=>{

    //app.use('/task',require('./tasks/tasks.routes'));
    
    app.use('/apis/user',require('./users/users.routes'));

}
