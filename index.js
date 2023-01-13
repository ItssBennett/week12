let itemID = 0;
const orderArray = [];

document.addEventListener("DOMContentLoaded", function() {


  document.getElementById("create-new-item").onclick = function() {
    // Get the form data
    const item = document.getElementById("itm").value;
    const quantity = document.getElementById("qty").value;
    const price = document.getElementById("price").value;

    // Create an object that holds the form data
    const itemData = {
      id: itemID,
      item: item,
      quantity: quantity,
      price: price
    };

    // Push the object into the array
    orderArray.push(itemData);

    // Update the item ID for the next item
    itemID++;

    // Insert the row into the table
    var table = document.getElementById("dataTable");
    var row = table.insertRow(-1);
    var itemCell = row.insertCell(0);
    var quantityCell = row.insertCell(1);
    var priceCell = row.insertCell(2);
    var editCell = row.insertCell(3);
    itemCell.innerHTML = item;
    quantityCell.innerHTML = quantity;
    priceCell.innerHTML = price;

    // inserting edit/delete button and also giving them the itemID so that they can also be targeted and given individual functionalities
    editCell.innerHTML = '<button type="button" class="btn btn-secondary" id="edit-' + itemID + '">Edit</button><button type="button" class="btn btn-secondary" id="delete-' + itemID + '">Delete</button>';

    // adding a 'click' event listener to delete button. Also uses an arrow function on the delete function which takes the itemData object as an argument.
    document
      .getElementById("delete-" + itemID)
      .addEventListener("click", () => delFnc(itemData));

    // adding a 'click' event listener to edit button. Also uses an arrow function on the delete function which takes the itemData object as an argument.
    document
      .getElementById("edit-" + itemID)
      .addEventListener("click", () => editFnc(itemData));

    console.log(orderArray);
    return false;
  };
});




  //this function was really hard to figure out lol
const delFnc = (itemData) => {

  // Find the index of the item in the array
const itemIndex = orderArray.findIndex(item => item.id == itemData.id);

  // Remove the item from the array
orderArray.splice(itemIndex, 1);

  // setting the rows variable to the rows in the HTML table
const rows = document.getElementById("dataTable").rows;

  //for loop to iterate through
for (let i = 0; i < rows.length; i++) {

    //saying that if the innerHTML of the row it is searching at cell 0 is equal to the item param in the itemData object *which is the items ID # 
    if (rows[i].cells[0].innerHTML == itemData.item) {
    
    
     // Delete the row
    document.getElementById("dataTable").deleteRow(i);
    break;
    }
    }
}



//asked for help on this one because i kept getting an error
//the error was that i was trying to add an event listener on the modal 
//but the modal was not being added to the DOM yet so it kept reading as null
function editFnc(itemData) {
  // Get the data for the corresponding item from the orderArray
  const itemToEdit = orderArray.find(item => item.id == itemData.id);

  // Show the modal
  $('#editModal').modal('show');

  // Pre-populate the input fields with the retrieved data
  document.getElementById("edit-item").value = itemToEdit.item;
  document.getElementById("edit-quantity").value = itemToEdit.quantity;
  document.getElementById("edit-price").value = itemToEdit.price;
  
  // Add a submit event listener to the modal form
  $('#editModal').on('shown.bs.modal', function () {
    document.getElementById("update-item").addEventListener("click", function() {
      // Get the updated data from the form inputs
      const updatedItem = document.getElementById("edit-item").value;
      const updatedQuantity = document.getElementById("edit-quantity").value;
      const updatedPrice = document.getElementById("edit-price").value;

      // Update the item data in the orderArray
      itemToEdit.item = updatedItem;
      itemToEdit.quantity = updatedQuantity;
      itemToEdit.price = updatedPrice;

      // setting the rows variable to the rows in the HTML table
      const rows = document.getElementById("dataTable").rows;

      //for loop to iterate through
      for (let i = 0; i < rows.length; i++) {

        //saying that if the innerHTML of the row it is searching at cell 0 is equal to the item param in the itemData object *which is the items ID #
        if (rows[i].cells[0].innerHTML == itemToEdit.item) {
          rows[i].cells[0].innerHTML = updatedItem;
          rows[i].cells[1].innerHTML = updatedQuantity;
          rows[i].cells[2].innerHTML = updatedPrice;
          break;
        }
      }
    });
  });
}


function closeModal() {
  $('#editModal').modal('hide');
}



/* known errors:
cannot seem to update the item cell with the new data from the modal
cannot update the same row more than once
program is fairly slow

*/








