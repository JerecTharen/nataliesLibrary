let checkout = document.getElementById("checkoutBooks");
let checkoutDiv = document.getElementById("checkoutDiv");
let returnBooks = document.getElementById("returnBooks");
let returnDiv = document.getElementById("returnDiv");
let DAddBook = document.getElementById("addBook");
let mainDOM = document.getElementById("main");

class Library{
    constructor(){
        this.shelf = [];
        this.checkedOut = [];
        this.numBooks = 0;
    }
    addBook(book){
        this.shelf.push(book);
        this.numBooks++;
        saveLibrary();
    }
    removeBook(id){
        let found = false;
        for(let i = 0; i < this.shelf.length; i++){
            if(this.shelf[i].id === id){
                found = true;
                this.shelf.splice(i, 1);
            }
        }
        if(!found){
            for(let x = 0; x < this.checkedOut.length; x++){
                if(this.checkedOut.id === id){
                    found = true;
                    this.shelf.splice(i, 1);
                }
            }
        }
        saveLibrary();
        fillLibrary();
        return found;
    }
    checkOut(id){
        let found = false;
        let book;
        for(let i = 0; i < this.shelf.length; i++){
            if(this.shelf[i].id === id){
                found = true;
                book = this.shelf[i];
                this.shelf.splice(i, 1);
                this.checkedOut.push(book);
                console.log(this.shelf);
            }
        }
        saveLibrary();
        fillLibrary();
        showReturnBooks();
        if(found){
            return book;
        }
        else{
            return found;
        }
    }
    returnBook(id){
        let found = false;
        let book;
        for(let i = 0; i < this.checkOut.length; i++){
            if(this.checkedOut[i].id === id){
                found = true;
                book = this.checkedOut[i];
                this.checkedOut.splice(i,1);
                this.shelf.push(book);
            }
        }
        saveLibrary();
        fillLibrary();
        showcheckOut();
        if(found){
            return book;
        }
        else{
            return found;
        }
    }
}

class Book{
    constructor(id,title, author){
        this.id = id;
        this.title = title;
        this.author = author;
    }
}

let library = new Library();

function fillLibrary(){
    loadLibrary();
    let checkoutFill = "";
    let returnFill = "";
    library.shelf.forEach(book => {
        checkoutFill += `<li id="book${book.id}"><p>${book.title}</p><p>${book.author}</p><button onclick="library.checkOut(${book.id})">CHECKOUT</button><button onclick="library.removeBook(${book.id})">DELETE</button></li>`;
    });
    library.checkedOut.forEach(book => {
        returnFill += `<li id="book${book.id}"><p>${book.title}</p><p>${book.author}</p><button onclick="library.returnBook(${book.id})">RETURN</button></li>`;
    });
    checkout.innerHTML = checkoutFill;
    returnBooks.innerHTML = returnFill;
}

function addToLibrary(){
    let title = document.getElementById("bookTitle").value;
    let author = document.getElementById("bookAuthor").value;
    let book = new Book(library.numBooks, title, author);
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    library.addBook(book);
    fillLibrary();
    showcheckOut();
}

function saveLibrary(){
  // console.log(library);
  let storeMe = {
    shelf: library.shelf,
    checkedOut: library.checkedOut,
    numBooks: library.numBooks,
  };
  window.localStorage.setItem("nLib", JSON.stringify(storeMe));
}

function loadLibrary(){
  // console.log(library);
  let fromStorage = JSON.parse(window.localStorage.getItem("nLib"));
  library.shelf = fromStorage.shelf;
  library.checkedOut = fromStorage.checkedOut;
  library.numBooks = fromStorage.numBooks;
}

function hideAll(){
  mainDOM.style.display = "none";
  DAddBook.style.display = "none";
  returnDiv.style.display = "none";
  checkoutDiv.style.display = "none";
}

function showDAddBook(){
  hideAll();
  DAddBook.style.display = "block";
}

function showReturnBooks(){
  hideAll();
  mainDOM.style.display = "block";
  returnDiv.style.display = "block";
}

function showcheckOut(){
  hideAll();
  mainDOM.style.display = "block";
  checkoutDiv.style.display = "block";
}

showcheckOut();

fillLibrary();
