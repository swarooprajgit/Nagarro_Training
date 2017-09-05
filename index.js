var express = require('express');
var todo_db  = require('./seed.js');
var bodyparser = require('body-parser');
var app = express();

app.use('/', express.static(__dirname+'/public'));
app.use('/',bodyparser.urlencoded({extended:false}));

app.get('/api/todos',function (req,res) {
    res.json(todo_db.todos);
});

app.delete('/api/todos/:id',function (req,res) {
    var id_to_be_deleted = req.params.id;
    var todo = todo_db.todos[id_to_be_deleted];
    if (!todo){
        res.status(400).json({err:'Todo doesnot exits'});
    }
    else{
        todo.status  = todo_db.StatusENUM.DELETED;
        res.json(todo_db.todos);
    }
});
app.post('/api/todos',function (req,res) {
    var todo  =req.body.todo_title;
    if(!todo || todo ==''||todo.trim() == ''){
        res.status(400).json({err:'Todo title cannot be empty'});
    }
    else{
        var new_todo_object = {
            title:req.body.todo_title,
            status:todo_db.StatusENUM.ACTIVE
        }
        todo_db.todos[todo_db.next_todo_id++]=new_todo_object;
        res.json(todo_db.todos);
    }

});
app.put('/api/todos/:id',function (req,res) {
    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];
    if (!todo){
        res.status(400).json({err:'Todo doesnot exits!!! Cannot modify'});
    }
    else{
        var todo_title = req.body.todo_title;
        if (todo_title&&todo_title!=''&&todo_title.trim()!=''){
            todo.title = todo_title;
        }
        var todo_status = req.body.todo_status;
        if (todo_status &&
            (todo_status == todo_db.StatusENUM.ACTIVE ||
            todo_status == todo_db.StatusENUM.COMPLETE)){
            todo.status = todo_status;
        }
        res.json(todo_db.todos);
    }
});
app.get('/api/todos/active',function (req,res) {
   active_todos = {};
    for(var key in todo_db.todos) {
       if (todo_db.todos[key].status == todo_db.StatusENUM.ACTIVE) {
            active_todos[key] = todo_db.todos[key];
       }
   }
   res.json(active_todos);
});
app.get('/api/todos/delete',function (req,res) {
    delete_todos = {};
    for(var key in todo_db.todos) {
        if (todo_db.todos[key].status == todo_db.StatusENUM.DELETED) {
            delete_todos[key] = todo_db.todos[key];
        }
    }
    res.json(delete_todos);
});
app.get('/api/todos/complete',function (req,res) {
    complete_todos = {};
    for(var key in todo_db.todos) {
        if (todo_db.todos[key].status == todo_db.StatusENUM.COMPLETE) {
            complete_todos[key] = todo_db.todos[key];
        }
    }
    res.json(complete_todos);
});
app.put('/api/todos/complete/:id',function (req,res) {
    var todos_id_complete = req.params.id;
    var todo = todo_db.todos[todos_id_complete];
    if (!todo){
        res.status(400).json({err:'Todo doesnot exits'});
    }
    else {
        todo.status = todo_db.StatusENUM.COMPLETE;
    }
    res.json(todo_db.todos);
});
app.put('/api/todos/active/:id',function (req,res) {
    var todos_id_complete = req.params.id;
    var todo = todo_db.todos[todos_id_complete];
    if (!todo){
        res.status(400).json({err:'Todo doesnot exits'});
    }
    else {
        todo.status = todo_db.StatusENUM.ACTIVE;
    }
    res.json(todo_db.todos);
});
app.listen(3128);
