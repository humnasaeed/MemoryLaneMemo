document.addEventListener('DOMContentLoaded', function () {
  const textarea = document.getElementById('notebook');
  const listContainer = document.createElement('ul');
  const dancingCharacter = document.getElementById('dancing-character');

  const totalImages = 12;

  function changeDancingCharacter() {
    const randomIndex = Math.floor(Math.random() * totalImages) + 1;
    dancingCharacter.src = `images/image${randomIndex}.gif`;
  }

  changeDancingCharacter();
// Load previously saved entries
chrome.storage.sync.get(['noteEntries'], function (result) {
  if (result.noteEntries) {
    result.noteEntries.forEach(entry => {
      addEntryToList(entry);
    });
  }
});

// Save entry on Enter key press
textarea.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    const entryText = textarea.value.trim();
    if (entryText !== '') {
      addEntryToList(entryText);
      saveEntries();
      textarea.value = '';
    }
  }
});

function addEntryToList(entryText) {
  const listItem = document.createElement('li');
  listItem.textContent = entryText;
  listContainer.appendChild(listItem);
}

function saveEntries() {
  const entries = Array.from(listContainer.children).map(item => item.textContent);
  chrome.storage.sync.set({ 'noteEntries': entries });
}


var alertDiv = document.getElementById("alert");
function invokeAlert() {
  var alertWindow = window.open('', '_blank', 'width=300,height=400');
  var entries = Array.from(listContainer.children).map(item => item.textContent);
var displayedEntries = entries.slice(0, 4).join('<br>'); // Use <br> for new lines
  var alertContent = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <link rel="stylesheet" type="text/css" href="popup.css">
     <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&display=swap" rel="stylesheet">
     <style>
     body {
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       height: 100vh;
       margin: 0;
     }
     #alert {
       text-align: center;
     }
    </style>
   </head>
   <body>
      <h1 id="title">REMINDER</h1>
      <div id="alert">
        <p>${displayedEntries.length > 0 ? 'To-Do List:<br>' + displayedEntries : 'No entries'}</p>
      </div>
      <div id="character-container">
        <img id="dancing-character" src="image1.gif" alt="Dancing Character">
      </div>
     <script src="popup.js"></script>
   </body>
   </html>
`;

// Write the content into the new window
alertWindow.document.write(alertContent);
alertWindow.document.close();
}
function closeCustomAlert() {
  // This function is intended to be called from the new window
  window.close();
}
/*function closeDialog() {
   alertDiv.style.display = "none";
}*/

/*function showAlert() {
  const entries = Array.from(listContainer.children).map(item => item.textContent);
  if (entries.length > 0) {
    alert('To-Do List:\n' + entries.join('\n'));
  }
}*/

// Set up recurring alert every 20 seconds
//setInterval(showAlert, 20 * 1000);
setInterval(invokeAlert, 10000);

// Initial setup - change dancing character image on extension load
changeDancingCharacter();

document.body.appendChild(listContainer);
});

document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.querySelector('.add-button');
  const todoInput = document.querySelector('.todo-input');
  const listContainer = document.getElementById('list-container');

  // Load todo list from storage
  chrome.storage.sync.get(['todoList'], function (result) {
    if (result.todoList) {
      result.todoList.forEach(todo => {
        addTodoToList(todo);
      });
    }
  });

  addButton.addEventListener('click', function () {
    addTodo();
  });

  todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
      // Create a container div for the todo item
      const todoContainer = document.createElement('div');
      todoContainer.className = 'todo-container';

      // Create a list item for the todo text
      const li = document.createElement('li');
      li.textContent = todoText;
      li.addEventListener('click', toggleTodo);

      // Create delete button
      const deleteButton = document.createElement('span');
      deleteButton.innerHTML = '&#10006;';
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', function (event) {
        event.stopPropagation();
        deleteTodo(todoContainer);
      });

      // Append the delete button to the todo container
      todoContainer.appendChild(li);
      todoContainer.appendChild(deleteButton);

      // Append the todo container to the list
      listContainer.appendChild(todoContainer);
      todoInput.value = '';

      // Save todo list to storage
      saveTodoList();
    } else {
      alert("Can not leave empty... :(");
    }
  }

  function toggleTodo() {
    this.classList.toggle('checked');
    saveTodoList();
  }

  function deleteTodo(todoContainer) {
    todoContainer.remove();
    saveTodoList();
  }

  function saveTodoList() {
    const todos = Array.from(listContainer.getElementsByClassName('todo-container')).map(item => item.firstChild.textContent);
    chrome.storage.sync.set({ 'todoList': todos });
  }

  function addTodoToList(todoText) {
    const todoContainer = document.createElement('div');
    todoContainer.className = 'todo-container';

    const li = document.createElement('li');
    li.textContent = todoText;
    li.addEventListener('click', toggleTodo);

    const deleteButton = document.createElement('span');
    deleteButton.innerHTML = '&#10006;';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function (event) {
      event.stopPropagation();
      deleteTodo(todoContainer);
    });

    todoContainer.appendChild(li);
    todoContainer.appendChild(deleteButton);

    listContainer.appendChild(todoContainer);
  }
});
