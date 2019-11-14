//book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//ui constructor
function UI() {}

//add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  //create table row element
  const row = document.createElement('tr');
  //insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X</a></td>
  `;

  list.appendChild(row);
}

// show error alert
UI.prototype.showAlert = function (message, className) {
  //create div
  const div = document.createElement('div');
  //add error class
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  // get parent element
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  //Insert alert  before forms
  container.insertBefore(div , form);
  // alert time out
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 1500);
}

//delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}
//clear inputs
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//eventListeners
document.getElementById('book-form').addEventListener('submit', function(e){
  //get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  //instanciate book
  const book = new Book(title, author, isbn);

  //instanciate ui
  const ui = new UI();

  //validation sign
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
  }else {
    //add book to list
    ui.addBookToList(book);

    //sucess banner
    ui.showAlert('Book Added!', 'success');

    //clear field
     ui.clearFields();

  }

  e.preventDefault();

});

// delete event Listener
document.getElementById('book-list').addEventListener('click', function(e){
  //instanciate ui
  const ui = new UI();
  //deleteBook
  ui.deleteBook(e.target);

  //success banner
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
