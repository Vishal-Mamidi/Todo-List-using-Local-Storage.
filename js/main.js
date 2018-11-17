var data =(localStorage.getItem("todoList")) ? JSON.parse(localStorage.getItem("todoList")):{
  todo: [],
  completed:[]
};
renderTodoList();

document.getElementById("add").addEventListener('click', function(){
  var value = document.getElementById("item").value;
  if(value){
    addItem(value);
  }
  
});

document.getElementById("item").addEventListener("keydown", function (e){
  var value = this.value;
  if(e.code == "Enter" && value){
    addItem(value);
  }
})

function addItem(value){
    addItemToDOM(value);
    document.getElementById("item").value = "";
    data.todo.push(value);
    dataObjectUpdated();
}

function renderTodoList(){
  if(!data.todo.length && !data.completed.length){
    return;
  }
  for(var i = 0; i<data.todo.length;i++){
    var value = data.todo[i];
    addItemToDOM(value);
  }
  for(var j =0;j<data.completed.length;j++){
    var value = data.completed[j];
    addItemToDOM(value,true);
  }
}

function dataObjectUpdated(){
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem(){
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  
  var value = item.innerText;
  if(id=="todo"){
    data.todo.splice(data.todo.indexOf(value), 1);   
  }
  else{
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  dataObjectUpdated();
  parent.removeChild(item);
}

function completeItem(){
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  
  var value = item.innerText;
  if(id=="todo"){
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  }
  else{
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();
  
  var target = (id =="todo") ? document.getElementById("completed"):document.getElementById("todo");
  
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
  
}

function editItem(){
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  
  var value = item.innerText;
  var index = null;
  if(id=="todo"){
    index = data.todo.indexOf(value);
    data.todo.splice(data.todo.indexOf(value), 1);
  }
  else{
    index = data.completed.indexOf(value);
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  document.getElementById("item").value = value;
  dataObjectUpdated();
  parent.removeChild(item);
  console.log(data);
  
}

function addItemToDOM(text, complet){
  var list = (complet) ? document.getElementById("completed") : document.getElementById("todo");
  
  var item = document.createElement("li");
  item.innerText = text;
 
  var butt = document.createElement("div");
  butt.classList.add("buttons");
  
  var remove = document.createElement("button");
  remove.classList.add("btn", "btn-lg", "remove"); 
  var removeSpan = document.createElement("span");
  removeSpan.classList.add("glyphicon", "glyphicon-trash");
  
  remove.addEventListener('click', removeItem);
  
  
  var complete = document.createElement("button");
  complete.classList.add("btn", "btn-lg", "complete"); 
  var completeSpan = document.createElement("span");
  completeSpan.classList.add("glyphicon", "glyphicon-ok");
  
  complete.addEventListener('click', completeItem);
  
  
  var edit = document.createElement("button");
  edit.classList.add("btn", "btn", "btn-lg", "edit");
  var editSpan = document.createElement("span");
  editSpan.classList.add("glyphion", "glyphicon-pencil");
  
  edit.addEventListener('click', editItem);
  
  list.insertBefore(item, list.childNodes[0]);
  item.appendChild(butt);
  butt.appendChild(remove);
  butt.appendChild(complete);
  butt.appendChild(edit);
  remove.appendChild(removeSpan);
  complete.appendChild(completeSpan);
  edit.appendChild(editSpan);
}




