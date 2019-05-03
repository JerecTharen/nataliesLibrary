class Library{
    constructor(){
        this.shelf = [];
        this.checkedOut = [];
        this.numBooks = 0;
    }
    addBook(book){
        this.shelf.push(book);
        this.numBooks++;
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
        fillLibrary();
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
        fillLibrary();
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
    let checkoutFill = "";
    let returnFill = "";
    let checkout = document.getElementById("checkoutBooks");
    let returnBooks = document.getElementById("returnBooks");
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
    library.addBook(book);
    fillLibrary();
    saveLibrary();
}

function saveLibrary(){
  let storeMe = {
    shelf: library.shelf,
    checkedOut: library.checkedOut,
    numBooks: library.numBooks,
  };
  window.localStorage.setItem("nLib", JSON.stringify(storeMe));
}

fillLibrary();
