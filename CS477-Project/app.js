/* ****************** submitForm ************** */
window.addEventListener("load", function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.entries().length == 0) return;
  document.getElementsByName("email")[0].value = urlParams.get("email");
  document.getElementsByName("fname")[0].value = urlParams.get("fname");
  document.getElementsByName("lname")[0].value = urlParams.get("lname");
  if (urlParams.get("select").length == 0) return;
  for (let eachOption of document.getElementsByName("select")[0].options) {
    if (urlParams.get("select").split(",").includes(eachOption.value))
      eachOption.selected = true;
    else eachOption.selected = false;
  }
});

/* ------------- Inventory ------------- */
// Inventory function

let tableArray = [];

let index = 1;
window.onload = function () {
  let sortElement = document.getElementsByName("sortList")[0];
  sortElement.onchange = sortSelection;
  let filterlist = document.getElementsByName("filterList")[0];
  filterlist.onchange = filterSelection;
  document.getElementsByName("addBtn").onclick = add;
  document.getElementsByName("clearFilter").onclick = clearFilter;
};
let rowUpdate = -1;
function checkEmpty() {
  let boxes = document.getElementsByTagName("input");
  for (let box of boxes) {
    if (box.value == "") {
      alert("Check all boxes have to not empty!");
      return true;
    }
  }
  return false;
}

function checkInputNumber() {
  if (
    Number.isInteger(parseInt(document.getElementById("price").value)) == false
  ) {
    alert("Price must be a number");
    let elePrice = document.getElementById("price");
    elePrice.style.backgroundColor = "red";
    elePrice.focus();
    return true;
  }
}
function addRow() {
  //Check Empty
  if (checkEmpty()) {
    return;
  }
  //Check Price is number
  if (checkInputNumber()) {
    return;
  } else {
    let elePrice = document.getElementById("price");
    elePrice.style.backgroundColor = "white";
  }
  //add or update row
  if (rowUpdate < 0) {
    add();
  } else {
    update();
  }
}

function add() {
  let table = document.getElementById("tableBody");
  let cellName = document.getElementById("name").value;
  let cellBrand = document.getElementById("brand").value;
  let cellPrice = document.getElementById("price").value;
  let cellQuantiry = document.getElementById("quantity").value;
  let cellRating = document.getElementById("rating").value;
  let cellEdit = "<button name='editRow' onclick='edit(this)'>Edit</button>";
  let cellRemove =
    "<button name='removeRow' onclick='remove(this)'>Remove</button>";
  let trElement = document.createElement("tr");
  trElement.id = index;
  trElement.innerHTML =
    "<td>" +
    cellName +
    "</td>" +
    "<td>" +
    cellBrand +
    "</td>" +
    "<td style='text-align:right' >" +
    cellPrice +
    "</td>" +
    "<td style='text-align:right' >" +
    cellQuantiry +
    "</td>" +
    "<td style='text-align:right' >" +
    cellRating +
    "</td>" +
    "<td style='text-align:center' >" +
    cellEdit +
    "</td>" +
    "<td style='text-align:center' >" +
    cellRemove +
    "</td>";
  table.append(trElement);
  //add to storage array
  tableArray.push({
    id: index,
    name: cellName,
    brand: cellBrand,
    price: cellPrice,
    quantity: cellQuantiry,
    rating: cellRating,
  });
  index++;
  /*Clear input box*/
  document.getElementById("name").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("rating").value = "";
}

function update() {
  let table = document.getElementById("myTable");
  let rows = table.rows;
  if (rowUpdate >= 0) {
    rows[rowUpdate].getElementsByTagName("td")[0].innerHTML =
      document.getElementById("name").value;
    rows[rowUpdate].getElementsByTagName("td")[1].innerHTML =
      document.getElementById("brand").value;
    rows[rowUpdate].getElementsByTagName("td")[2].innerHTML =
      document.getElementById("price").value;
    rows[rowUpdate].getElementsByTagName("td")[3].innerHTML =
      document.getElementById("quantity").value;
    rows[rowUpdate].getElementsByTagName("td")[4].innerHTML =
      document.getElementById("rating").value;
    //update tableArray
    for (let element of tableArray) {
      if (element.id == rowUpdate) {
        element.name = document.getElementById("name").value;
        element.name = document.getElementById("brand").value;
        element.price = document.getElementById("price").value;
        element.quantity = document.getElementById("quantity").value;
        element.rating = document.getElementById("rating").value;
      }
    }
    rowUpdate = -1;
    //clear input boxes
    document.getElementById("name").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("rating").value = "";
    document.getElementsByName("addBtn")[0].innerHTML = "Add";
  }
}

function tableUpdate(array) {
  let tableElement = document.getElementById("tableBody");
  let cellEdit = "<button name='editRow' onclick='edit(this)'>Edit</button>";
  let cellRemove =
    "<button name='removeRow' onclick='remove(this)'>Remove</button>";
  tableElement.innerHTML = "";
  array.forEach(function (item) {
    let trElement = document.createElement("tr");
    trElement.innerHTML =
      "<td>" +
      item.name +
      "</td>" +
      "<td>" +
      item.brand +
      "</td>" +
      "<td style='text-align:right'>" +
      item.price +
      "</td>" +
      "<td style='text-align:right'>" +
      item.quantity +
      "</td>" +
      "<td style='text-align:right'>" +
      item.rating +
      "</td>" +
      "<td style='text-align:center'>" +
      cellEdit +
      "</td>" +
      "<td style='text-align:center'>" +
      cellRemove +
      "</td>";

    tableElement.append(trElement);
  });
}

function edit(rowObj) {
  let table = document.getElementById("myTable");
  let rows = table.rows;
  let i = rowObj.parentNode.parentNode.rowIndex;
  rowUpdate = i;
  document.getElementById("name").value =
    rows[i].getElementsByTagName("td")[0].innerHTML;
  document.getElementById("brand").value =
    rows[i].getElementsByTagName("td")[1].innerHTML;
  document.getElementById("price").value =
    rows[i].getElementsByTagName("td")[2].innerHTML;
  document.getElementById("quantity").value =
    rows[i].getElementsByTagName("td")[3].innerHTML;
  document.getElementById("rating").value =
    rows[i].getElementsByTagName("td")[4].innerHTML;
  document.getElementsByName("addBtn")[0].innerHTML = "Update";
}

function sortSelection() {
  for (let option of this.options) {
    if (option.selected) {
      if (option.innerHTML == "Sort by Name") {
        tableArray.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        });
        tableUpdate(tableArray);
      } else {
        if (option.innerHTML == "Sort by Price") {
          tableArray.sort((a, b) => a.price - b.price);
          tableUpdate(tableArray);
        }
      }
    }
  }
}

function filterSelection() {
  for (let option of this.options) {
    if (option.selected) {
      if (option.innerHTML == "Quantity greater than 100") {
        let filtedArr = tableArray.filter((item) => item.quantity > 100);
        tableUpdate(filtedArr);
      } else {
        if (option.innerHTML == "Rating greater than 4") {
          let filtedArr = tableArray.filter((item) => item.rating > 4);
          tableUpdate(filtedArr);
        }
      }
    }
  }
}
function remove(obj) {
  const rowId = obj.parentNode.parentNode;
  for (let element of tableArray) {
    if (element.id == rowId.id) {
      tableArray.splice(tableArray.indexOf(element), 1);
    }
  }
  rowId.remove();
}

function clearFilter() {
  tableUpdate(tableArray);
}
console.log("tableArray :>> ", tableArray);
// --------------- generateDB -------------------- //

// dataBase is tableArray

/* ----------- show items in product.html ----------- */
window.onload = function () {
  let categories = document.querySelector(".categories");
  console.log("object :>> ", categories);
  let temp = tableArray.forEach(function (item) {
    ` <h2 class="card-title">${item.name}</h2>
    <a href="#">
      <img
        src="${item.url}"
        class="card-img-top"
        alt="..."
    /></a>
    <div class="card-body">
      <div class="row priceRate" style="display: flex; text-align: right">
        <h4>Price:${item.price}</h4>
        <label for="price">${item.category}</label>
      </div>
      <p class="card-text" style="text-align: left">
        Description: ${item.description}
        <a href="view.html" class="btn btn-primary">View more</a>
      </p>
    </div>`;
  });

  categories.innerHTML = temp;
};
