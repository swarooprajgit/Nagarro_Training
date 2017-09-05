var StatusENUMS = {
    DELETED:'DELETED',
    ACTIVE: 'ACTIVE',
    COMPLETE:'COMPLETE'

}

var todos = {
    1: {title:"one thing",status:StatusENUMS.ACTIVE},
    2: {title: 'other thing',status:StatusENUMS.ACTIVE},
    3:{title:'another thing',status:StatusENUMS.ACTIVE},
    }
var next_todo_id = 4;

module.exports = {
    StatusENUM:StatusENUMS,
    todos : todos,
    next_todo_id : next_todo_id
};
