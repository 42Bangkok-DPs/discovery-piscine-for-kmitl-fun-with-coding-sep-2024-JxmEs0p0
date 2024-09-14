$(document).ready(function() {
  // Load TO DOs from cookies when the page loads
  loadTodosFromCookie();

  // Event handler to create a new TO DO
  $('#newTodo').click(function() {
    const todoText = prompt('Enter a new TO DO:');
    if (todoText && todoText.trim() !== '') {
      addTodo(todoText);
      saveTodosToCookie();
    }
  });

  // Function to add a new TO DO item to the list
  function addTodo(text) {
    const newTodo = $('<div class="todo-item"></div>').text(text);
    $('#ft_list').prepend(newTodo);

    // Click event to remove the TO DO
    newTodo.click(function() {
      const confirmDelete = confirm('Do you really want to delete this TO DO?');
      if (confirmDelete) {
        $(this).remove();
        saveTodosToCookie(); // Save the updated list to cookies
      }
    });
  }

  // Function to save TO DOs to cookies
  function saveTodosToCookie() {
    const todoArray = [];
    $('#ft_list .todo-item').each(function() {
      todoArray.push($(this).text());
    });
    const encodedTodos = encodeURIComponent(JSON.stringify(todoArray)); // Encode before saving
    document.cookie = 'todos=' + encodedTodos + '; path=/';
  }

  // Function to load TO DOs from cookies
  // Function to load TO DOs from cookies
function loadTodosFromCookie() {
  const cookieString = document.cookie.split('; ').find(row => row.startsWith('todos='));
  if (cookieString) {
    const decodedTodos = decodeURIComponent(cookieString.split('=')[1]); // Decode before parsing
    let todoArray = JSON.parse(decodedTodos);

    // Reverse the array to put the first item at the end
    todoArray.reverse();

    todoArray.forEach(function(todoText) {
      addTodo(todoText);
    });
  }
}
});