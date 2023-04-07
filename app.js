// .trim() --> string ifadenin başındaki ve sonundaki boşlukları siler.

const form = document.querySelector("#todo-form-id");
const todoInput = document.querySelector("#todo-input");
const ulist = document.querySelector(".todo-ulist");
const section_2 = document.querySelector("#section-2-id");
const section_3 = document.querySelector("#section-three");
const filter = document.querySelector("#todo-filter");
const clearTodos = document.querySelector("#clear-button");

eventListeners();

function eventListeners() { // Tüm event listeners

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadallTodosToUI); // ekran yenilendiğinde todoları korumak
    section_3.addEventListener("click", deleteListElement); // listleri tekli şekilde silme
    filter.addEventListener("keyup", filterTodos); // filtering
    clearTodos.addEventListener("click", clearAllTodos); // clear all todos

}

function clearAllTodos(e) {

    if(confirm("Are you sure to delete all the todos ?")) {

        // Arayüzden todoları temizleme
        // ulist.innerHTML = ""; // Yavaş yöntem (Kullanılabilir sorunu yok sadece yavaş çalışır)
        
        while(ulist.firstElementChild != null) {
            ulist.removeChild(ulist.firstElementChild);
        }
    }

    localStorage.removeItem("todos");

    setAlert("warning", "All todos are deleted");

}

function filterTodos(e) {

    const filterValue = e.target.value.toLowerCase();

    // tüm listeleri çekmek için:
    const listItems = document.querySelectorAll(".todo-list");

    listItems.forEach(function(item){
        const text = item.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // Bulunamadıysa;
            item.setAttribute("style", "display : none !important");
        }
        else {
            item.setAttribute("style", "display : block");
        }
    });

}

function deleteListElement(e) {
    if (e.target.className == "fa-sharp fa-solid fa-trash aligned-items icon-1") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.children[0].textContent);
        setAlert("primary", "Todo Deleted");
    }
}

function deleteTodoFromStorage(deleteTodo) {

    let todos = getTodoFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deleteTodo) {
            todos.splice(index,1); // arrayden değer silme
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));

}

function loadallTodosToUI() {
    
    let todos = getTodoFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    });

}

function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        setAlert("danger", "Error");
    }
    else {
        addTodoToUI(newTodo); // User ınterface te liste oluşturup ekleme
        getTodoFromStorage(newTodo); // local storage dan inputları alma
        addTodoToStorage(newTodo); // local storage a inputları ekleme
        setAlert("success", "Success"); // inputa veri girildiğine dair alert
    }

    e.preventDefault();
}

function setAlert(type,message){

    // <div class="alert alert-danger" role="alert">
    //     A simple danger alert—check it out!
    // </div>

    const alert = document.createElement("div");
    alert.className = `alert-1 alert alert-${type}`;

    alert.textContent = message;

    section_2.appendChild(alert);

    // time ayarı (1000 ifadesi 1 saniyedir. ms cinsinden gösterilir.)
    // setTimeout(function,time) --> bu fonksiyon 2 değer alır.
    setTimeout(function(){
        alert.remove();
    },2000);
}

function getTodoFromStorage(variable){
    
    let todoArray;

    if (localStorage.getItem("todos") === null) {
        todoArray = [];
    }
    else {
        todoArray = JSON.parse(localStorage.getItem("todos"));
    }

    return todoArray;
}

function addTodoToStorage(variable) {

    let todos = getTodoFromStorage();

    todos.push(variable);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function addTodoToUI(newTodo){ // String değerini (newTodo yu list item olarak arayüze ekleyeceğiz) 

                // <li class="todo-list">
                //     Todo
                //     <a href="#" class="link-1">
                //         <i class="fa-sharp fa-solid fa-trash aligned-items icon-1"></i>
                //     </a>
                // </li> 
    
    // list oluşturma
    const listElement = document.createElement("li");
    listElement.className = "todo-list d-flex justify-content-between item-align-center";
    
    // paragraf oluşturma ve bu paragrafın içerisine textNode atama
    const para = document.createElement("p");
    para.className = "para-1";
    para.appendChild(document.createTextNode(newTodo));

    // link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "link-1";
    link.innerHTML = "<i class='fa-sharp fa-solid fa-trash aligned-items icon-1'></i>";


    // list element içerisine paragraf ve linki ekleme
    listElement.appendChild(para);
    listElement.appendChild(link);

    // bu son oluşturulan listi ul içerisine ekleme
    ulist.appendChild(listElement);

    todoInput.value = "";
    

}
