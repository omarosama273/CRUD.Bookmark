
var sitNameInput = document.getElementById('sitName')
var sitURLInput = document.getElementById('sitURL')
var submitBtn = document.getElementById('submitBtn')
var books = [];
var currntIndex = 0;
if (JSON.parse(localStorage.getItem('booksList')) != null) {
    books = JSON.parse(localStorage.getItem('booksList'))
    display()
}


var inputs = document.getElementsByClassName('form-control')


submitBtn.onclick = function () {
    if (submitBtn.innerHTML == 'Submit') {
        addBook();
    }
    else {
        updateBook();
    }
    display();
    resetForm()
}


function addBook() {
    var book =
    {
        name: sitNameInput.value,
        url: sitURLInput.value,
    }
    books.push(book)
    localStorage.setItem('booksList', JSON.stringify(books))
}

function display() {
    var cartona = '';
    for (var i = 0; i < books.length; i++) {
        cartona += `<tr>
      <td>${books[i].name}</td>
      
      <td><a onclick="visitBook(${i})"href="${sitURLInput.value}"target="_blank" class='btn btn-primary'>visit</a></td>
      <td><button onclick="getInfoBook(${i})" class='btn btn-warning'>update</button></td>
        <td><button onclick="delateBook(${i})" class='btn btn-danger'>delate</button></td>
      `

    }
    document.getElementById('tableBody').innerHTML = cartona;
}

function visitBook() {

}

function getInfoBook(index) {
    currntIndex = index;
    var currntbook = books[index];
    sitNameInput.value = currntbook.name;
    sitURLInput.value = currntbook.url;
    submitBtn.innerHTML = 'Update Book'
}

function updateBook() {
    var book =
    {
        name: sitNameInput.value,
        url: sitURLInput.value,
    }
    books[currntIndex] = book;
    submitBtn.innerHTML = "Submit"
    localStorage.setItem('booksList', JSON.stringify(books));

}

function delateBook(index) {
    books.splice(index, 1);
    display()
    localStorage.setItem('booksList', JSON.stringify(books))
}

function search(searchTxt) {
    var cartona = '';
    for (var i = 0; i < books.length; i++) {
        if (books[i].name.toUpperCase().includes(searchTxt.toUpperCase()))
            cartona += `<tr>
      <td>${books[i].name}</td>
      <td><button onclick="visitBook(${i})" class='btn btn-primary'>visit</button></td>
      <td><button onclick="getInfoBook(${i})" class='btn btn-warning'>update</button></td>
        <td><button onclick="delateBook(${i})" class='btn btn-danger'>delate</button></td>
      `

    }
    document.getElementById('tableBody').innerHTML = cartona;
}

function resetForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
    sitNameInput.classList.remove('is-valid');
    sitURLInput.classList.remove('is-valid');
    submitBtn.disabled = 'true';
}



sitNameInput.addEventListener("keyup", cheek)
sitURLInput.addEventListener("keyup", cheek)
function cheek() {
    if (nameRejex() && urlRejex()) {
        submitBtn.removeAttribute('disabled')
    }
    else {
        submitBtn.disabled = 'true';

    }
}


function nameRejex() {
    var nameRejex = /^[A-Z][a-z ]{2,20}$/;
    if (nameRejex.test(sitNameInput.value)) {

        sitNameInput.classList.add('is-valid');
        sitNameInput.classList.remove('is-invalid');
        nameAlart.classList.add('d-none')
        return true;
    }
    else {

        sitNameInput.classList.add('is-invalid');
        sitNameInput.classList.remove('is-valid');
        nameAlart.classList.remove('d-none')
        return false;
    }
}


function urlRejex() {
    var urlRejex = /^(http|https)[a-z ./:]{2,100}$/;
    if (urlRejex.test(sitURLInput.value)) {

        sitURLInput.classList.add('is-valid');
        sitURLInput.classList.remove('is-invalid');
        urlAlart.classList.add('d-none')
        return true;
    }
    else {

        sitURLInput.classList.add('is-invalid');
        sitURLInput.classList.remove('is-valid');
        urlAlart.classList.remove('d-none')
        return false;
    }
}


