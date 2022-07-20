"use strict";

let arr = [
  {
    id: 1,
    fullname: "Иванов Иван Иванович",
    position: "Програмист",
    age: 31,
    competence: "dasd asd asdsad asd sad ",
  },
  {
    id: 2,
    fullname: "Иванов Иван Иванович",
    position: "Програмист",
    age: 32,
    competence: "dasd asd asdsad asd sad ",
  },
  {
    id: 3,
    fullname: "Иванов Иван Иванович",
    position: "Програмист",
    age: 50,
    competence: "dasd asd asdsad asd sad ",
  },
  {
    id: 4,
    fullname: "Иванов Иван Иванович",
    position: "Програмист",
    age: 23,
    competence: "dasd asd asdsad asd sad ",
  },
];

const table = document.querySelector(".table");
const tableHeader = document.querySelector(".table__header");

const addDataRow = document.querySelector(".btn__add");
addDataRow.addEventListener("click", addDataArr);

for (let item of arr) {
  //строка таблицы
  let row = document.createElement("div");
  let btnDel = document.createElement("button");
  let rowItem = document.createElement("div");

  row.classList.add("table__row");
  row.setAttribute("id", `row${item.id}`);

  btnDel.innerText = "Удалить";
  btnDel.classList.add("btn");
  btnDel.setAttribute("id", item.id);
  btnDel.addEventListener("click", deleteRow);

  rowItem.classList.add("table__item");
  rowItem.append(btnDel);

  tableHeader.after(row);

  createCell(item.fullname, row);
  createCell(item.position, row);
  createCell(item.age, row);
  createCell(item.competence, row);

  row.after(rowItem);
}

function createCell(textItem, row) {
  let rowItem = document.createElement("div");
  let text = document.createElement("p");

  text.innerText = textItem;

  rowItem.classList.add("table__item");
  rowItem.append(text);

  row.append(rowItem);
}

function deleteRow(event) {
  let elID = event.target.id;
  document.getElementById(`row${elID}`).remove();

  let delIndex = arr.findIndex((el) => el.id == elID);
  arr.splice(delIndex, 1);
  console.log(arr);
}

function printError(elemId, hintMsg) {
  let messageEl = document.createElement("p");
  let element = document.getElementById(elemId);

  messageEl.classList.add("error__message");
  messageEl.innerText = hintMsg;

  element.before(messageEl);
}

function addDataArr(event) {
  let el = event.target;
  let fullnameValue = document.getElementById("fullname").value.trim();
  let ageValue = document.getElementById("age").value.trim();
  let positionValue = document.getElementById("position").value.trim();
  let competenceValue = document.getElementById("competence").value.trim();

  let fullnameErr = true;
  let ageErr = true;
  let positionErr = true;
  let competenceErr = true;

  if (fullnameValue === "") {
    printError("fullname", "Не заполнено поле 'ФИО'");
  } else {
    fullnameErr = validateTextForm(fullnameValue, "fullname");
    console.log(fullnameErr);
  }
  if (ageValue === "") {
    printError("Не заполнено поле 'Возраст'");
  } else {
    ageErr = validateTextForm(ageValue, "age");
  }

  if (positionValue === "") {
    printError("position", "Не заполнено поле 'позиция'");
  } else {
    positionErr = validateTextForm(positionValue, "position");
  }

  if (competenceValue === "") {
    printError("competence", "Не заполнено поле компетенция");
  } else {
    competenceErr = validateTextForm(competenceValue, "competence");
    console.log(competenceErr);
  }

  if ((nameErr || emailErr || mobileErr || countryErr || genderErr) == true) {
    return false;
  } else {
    // Создаем строки из входных данных для предварительного просмотра
    var dataPreview =
      "Вы ввели следующие данные: \n" +
      "ФИО: " +
      fullnameValue +
      "\n" +
      "должность: " +
      positionValue +
      "\n" +
      "Возраст: " +
      ageValue +
      "\n" +
      "компетенция: " +
      competenceValue;

    alert(dataPreview);
    arr.push({
      fullname: fullnameValue,
      age: ageValue,
      position: positionValue,
      competence: competenceValue,
    });
  }
}

function validateTextForm(elValue, elID) {
  let regExp = /^[а-яА-Я\s]+$/;

  if (regExp.test(elValue) === false) {
    printError(
      elID,
      "В поле ввода не должно содержаться спецсимволов или цифр"
    );
  }
}

function validateAgeForm(elValue, elID) {
  let regExp = /^[1-9]\d{3}$/;

  if (regExp.test(elValue) === false) {
    printError(elID, "Пожалуйста, введите корректный возраст");
  }
}
