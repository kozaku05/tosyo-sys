const storage = localStorage;
function getBooks() {
  const list = storage.getItem("books");
  return list ? JSON.parse(list) : [];
}
function createBook(id, title, author, genre) {
  let books = getBooks();
  for (const book of books) {
    if (book.id == id) {
      return "同じIDが存在します";
    }
  }
  if (id === "" || title === "" || author === "" || genre === "") {
    return "本の情報が不完全です";
  }
  const book = {
    id: parseInt(id),
    title: title,
    author: author,
    genre: genre,
    isLending: false,
    lendingName: "",
  };

  books.push(book);
  storage.setItem("books", JSON.stringify(books));
  return "本を追加しました";
}
function deleteBook(id) {
  let books = getBooks();
  if (books.length === 0) {
    return "本がありません";
  }
  for (const book of books) {
    if (book.id === id) {
      books.splice(books.indexOf(book), 1);
      storage.setItem("books", JSON.stringify(books));
      return "本を削除しました";
    }
  }
  return "本が見つかりませんでした";
}
function lendBook(id, name) {
  let books = getBooks();
  if (books.length === 0) {
    return "本がありません";
  }
  if (name === "") {
    return "名前がありません";
  }
  for (const book of books) {
    if (book.id === id) {
      if (book.isLending) {
        return "本は貸出中です";
      } else {
        book.isLending = true;
        book.lendingName = name;
        storage.setItem("books", JSON.stringify(books));
        return "本を貸出しました";
      }
    }
  }
  return "本が見つかりませんでした";
}
function returnBook(id) {
  let books = getBooks();
  if (books.length === 0) {
    return "本がありません";
  }
  for (const book of books) {
    if (book.id === id) {
      if (!book.isLending) {
        return "本は貸出されていません";
      } else {
        book.isLending = false;
        book.lendingName = "";
        storage.setItem("books", JSON.stringify(books));
        return "本を返却しました";
      }
    }
  }
  return "本が見つかりませんでした";
}
//list.html
if (document.getElementById("list-table")) {
  const table = document.getElementById("list-table");
  const books = getBooks();
  if (books.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = "本がありません";
    tr.appendChild(td);
    table.appendChild(tr);
  } else {
    for (const book of books) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
      const td5 = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      deleteButton.onclick = function () {
        const result = deleteBook(book.id);
        alert(result);
        location.reload();
      };
      tr.align = "center";
      td1.textContent = book.id;
      td2.textContent = book.title;
      td3.textContent = book.author;
      td4.textContent = book.genre;
      if (book.isLending) {
        td5.textContent = "貸出中";
      } else {
        td5.textContent = "貸出可能";
      }
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(deleteButton);
      table.appendChild(tr);
    }
  }
}
//add.html
function add() {
  let id = document.getElementById("id").value;
  if (id === "") {
    const list = storage.getItem("books");
    const books = JSON.parse(list);
    let num = 0;
    for (const book of books) {
      if (num < book.id) {
        num = book.id;
      }
    }
    id = num + 1;
  } else {
    if (isNaN(parseInt(id))) {
      alert("IDは数字で入力してください");
      return;
    }
  }
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  if (id === "" || title === "" || author === "" || genre === "") return;
  const result = createBook(id, title, author, genre);
  alert(result);
}
//lend.html
function lend() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  if (id === "" || name === "") return;
  const result = lendBook(parseInt(id), name);
  alert(result);
}
//retun.html
function Return() {
  const id = document.getElementById("id").value;
  if (id === "") return;
  const result = returnBook(parseInt(id));
  alert(result);
}

function sample() {
  const books = [
    {
      id: 1,
      title: "本1",
      author: "著者1",
      genre: "ジャンル1",
      isLending: false,
      lendingName: "",
    },
    {
      id: 2,
      title: "本2",
      author: "著者2",
      genre: "ジャンル2",
      isLending: false,
      lendingName: "",
    },
    {
      id: 3,
      title: "本3",
      author: "著者3",
      genre: "ジャンル3",
      isLending: false,
      lendingName: "",
    },
  ];

  storage.setItem("books", JSON.stringify(books));
  alert("サンプルデータを追加しました");
}
