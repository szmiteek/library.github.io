const button = document.getElementById("button");
const title = document.getElementById("title");
const author = document.getElementById("author");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const tbody = document.getElementById("tbody");

const setError = (input, errorMsg) => {
  const formSection = input.parentElement;
  formSection.className = "form-section error";
  const small = formSection.querySelector("small");
  small.innerText = errorMsg;
};
const setSuccess = (input) => {
  const formSection = input.parentElement;
  formSection.className = "form-section success";
};

const validation = (title, author, category, priority) => {
  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const categoryValue = category.options[category.selectedIndex].value;
  const priorityValue = priority.options[priority.selectedIndex].value;

  if (titleValue.length < 1) {
    setError(title, "To pole musi mieć conajmniej 1 znak");
  } else setSuccess(title);

  if (authorValue.length < 3) {
    setError(author, "To pole musi mieć conajmniej 3 znaki");
  } else setSuccess(author);

  if (categoryValue === "") {
    setError(category, "Wybierz coś");
  } else setSuccess(category);

  if (priorityValue === "") {
    setError(priority, "Wybierz coś");
  } else setSuccess(priority);

  if (
    titleValue.length >= 1 &&
    authorValue.length >= 3 &&
    categoryValue !== "" &&
    priorityValue !== ""
  ) {
    return true;
  } else return false;
};

const saveToLocalStorage = (title, author, category, priority) => {
  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const categoryValue = category.options[category.selectedIndex].text;
  const priorityValue = priority.options[priority.selectedIndex].text;
  const book = {
    title: titleValue,
    author: authorValue,
    category: categoryValue,
    priority: priorityValue,
  };

  if (localStorage.hasOwnProperty("library")) {
    const books = JSON.parse(localStorage.getItem("library"));
    books.push(book);
    localStorage.setItem("library", JSON.stringify(books));
  } else {
    const books = [book];
    localStorage.setItem("library", JSON.stringify(books));
  }
  title.value = "";
  author.value = "";
  category.value = "";
  priority.value = "";
};

const getBooks = () => {
  if (localStorage.hasOwnProperty("library")) {
    const books = JSON.parse(localStorage.getItem("library"));
    books.map((book) => {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
      td1.innerText = book.title;
      td2.innerText = book.author;
      td3.innerText = book.category;
      td4.innerText = book.priority;
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tbody.appendChild(tr);
    });
  }
};
createTableElement = (title, author, category, priority) => {
  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const categoryValue = category.options[category.selectedIndex].text;
  const priorityValue = priority.options[priority.selectedIndex].text;
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  td1.innerText = titleValue;
  td2.innerText = authorValue;
  td3.innerText = categoryValue;
  td4.innerText = priorityValue;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tbody.appendChild(tr);
};

getBooks();
button.addEventListener("click", (e) => {
  e.preventDefault();
  if (validation(title, author, category, priority)) {
    createTableElement(title, author, category, priority);
    saveToLocalStorage(title, author, category, priority);
  }
});
