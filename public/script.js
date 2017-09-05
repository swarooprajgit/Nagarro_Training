const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const NEW_TODO_INPUT_ID="new_todo_input";
var data;

window.onload = getTodosAJAX();
const ID = 'todo_list_div';
function changevisibility(id) {
    var x = document.getElementById(id);
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}
function addTodoElement(id,todos_data_json) {
    var todos = JSON.parse(todos_data_json);
    console.log(todos);
    //var temp = todos.length;
    var parent = document.getElementById(id);
    parent.innerHTML = "<h4>Active Todos</h4>";
    if (parent){
        Object.keys(todos).forEach(
            function (key) {
                if(todos[key].status=="ACTIVE") {
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                  //  addTodoElement_COMPLETE("complete_div",todos_data_json)
                }

            }
        );

        //getTodosAJAX();
        //parent.appendChild(createTodoElement());
    }
    //parent.innerText = todos_data_json;
};
function addTodoElement_COMPLETE(id,todos_data_json) {
    var todos = JSON.parse(todos_data_json);
    console.log(todos);
    //var temp = todos.length;
    var parent = document.getElementById(id);
    parent.innerHTML = "<h4>Completed Todos</h4>";
    if (parent){
        Object.keys(todos).forEach(
            function (key) {
                if(todos[key].status=="COMPLETE") {
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                    addTodoElement(ID,todos_data_json);

                }


            }

        );
        //parent.appendChild(createTodoElement());
    }
    //parent.innerText = todos_data_json;
};
function addTodoElement_DELETED(id,todos_data_json) {
    var todos = JSON.parse(todos_data_json);
    console.log(todos);
    //var temp = todos.length;
    var parent = document.getElementById(id);
    parent.innerHTML = "<h4>Deleted Todos</h4>";
    
    if (parent){
        Object.keys(todos).forEach(
            function (key) {
                if(todos[key].status=="DELETED") {
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                    addTodoElement(ID,todos_data_json);
                    addTodoElement_COMPLETE("complete_div",todos_data_json);
                }
            }
        );
        //parent.appendChild(createTodoElement());
    }
    //parent.innerText = todos_data_json;
};
function createTodoElement(id,todo_object) {
    var todo_element = document.createElement("div");

    todo_element.setAttribute("data-id",id);
    todo_element.setAttribute("class","todoStatus"+todo_object.status);
    todo_element.innerText = todo_object.title;
    if (todo_object.status =='ACTIVE'){
        var complete_button = document.createElement("input");
        complete_button.type = "checkbox";
        complete_button.setAttribute("id","complete_button");
        complete_button.setAttribute("onchange","completeTodoAJAX("+id+")");
        complete_button.setAttribute("class","breathVertical");
        todo_element.appendChild(complete_button);

        var delete_button = document.createElement("button");
        delete_button.innerText = "X";
        delete_button.setAttribute("id","delete");
        delete_button.setAttribute("onclick","deleteTodoAJAX("+id+")");
        delete_button.setAttribute("class","breathVertical");
        delete_button.setAttribute('class','breathHorizontal');
        todo_element.appendChild(delete_button);
    }
    if (todo_object.status =='COMPLETE'){
         var complete_button = document.createElement("input");
         complete_button.type = "checkbox";
         complete_button.setAttribute("id","complete_button");
         complete_button.setAttribute("checked",'');
         complete_button.setAttribute("onchange","activeTodoAJAX("+id+")");
         todo_element.appendChild(complete_button);
        var delete_button = document.createElement("button");
        delete_button.innerText = "X";
        delete_button.setAttribute("id","delete");
        delete_button.setAttribute("onclick","deleteTodoAJAX("+id+")");
        delete_button.setAttribute("class","breathVertical");
        delete_button.setAttribute('class','breathHorizontal');
        todo_element.appendChild(delete_button);
    }


    //todo_element.setAttribute("class",'breathHorizontal');
    //todo_element.setAttribute("class","breathVertical");
    return todo_element;
}

function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET','/api/todos',true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                addTodoElement(ID,xhr.responseText);
                addTodoElement_COMPLETE("complete_div",xhr.responseText);
                addTodoElement_DELETED("delete_div",xhr.responseText);
            }
        }
    }
    xhr.send(data==null);
}
function addTodoAJAX() {

    var title = document.getElementById(NEW_TODO_INPUT_ID).value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/api/todos',true);
    xhr.setRequestHeader("Content-type",'application/x-www-form-urlencoded');
    var data = 'todo_title='+encodeURI(title);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                addTodoElement(ID,xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}
function activeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT','/api/todos/'+id,true);
    xhr.setRequestHeader("Content-type",'application/x-www-form-urlencoded');
    var data = 'todo_status=ACTIVE';
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                addTodoElement(ID,xhr.responseText);
                addTodoElement_COMPLETE("complete_div",xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}

function completeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT','/api/todos/'+id,true);
    xhr.setRequestHeader("Content-type",'application/x-www-form-urlencoded');
    var data = 'todo_status=COMPLETE';
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                addTodoElement_COMPLETE("complete_div",xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}
function deleteTodoAJAX(id) {
    //console.log("Testing");
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE','/api/todos/'+id,true);
    xhr.setRequestHeader("Content-type",'application/x-www-form-urlencoded');
    var data = 'todo_status=DELETED';
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            if (xhr.status == STATUS_OK){
                addTodoElement_DELETED("delete_div",xhr.responseText);
                //console.log(ID);

            }
            else{
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}