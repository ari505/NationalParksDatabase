// add_employee.js

// Citation for confirm():
// Date: 6/6/24
// Adapted from:
// Source URL: https://www.w3schools.com/jsref/met_win_confirm.asp

// Get objects we need to modify
let addEmployeeForm = document.getElementById('add-employee-form-ajax');

// Modify the objects we need
addEmployeeForm.addEventListener("submit", function(e) {
    // Prevent from from submitting
    e.preventDefault();

    // Show alert to confirm update
    if (confirm("Are you sure you want to add this employee?") == true) {

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("first_name");
    let inputLastName = document.getElementById("last_name");
    let inputPhoneNumber = document.getElementById("phone_number");

    // Get values from form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let phoneNumberValue = inputPhoneNumber.value;

    // Put our data we want to send in a javascript object
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        phone_number: phoneNumberValue              
    }

    // Set up our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);
            alert("Success!");

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputPhoneNumber.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

}});

// Create single from from an Object representing a single record from Employees
addRowToTable = (data) => {
    // Get reference to current table on the page and clear it out. 
    let currentTable = document.getElementById("employees-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data)
    let newRow = parsedData[parsedData.length - 1]  

    // Create a row and 4 cells
    let row = document.createElement('tr');
    let employeeIdCell = document.createElement('td');
    let firstNameCell = document.createElement('td');
    let lastNameCell = document.createElement('td');
    let phoneNumberCell = document.createElement('td');

    // Fill the cells with correct data
    employeeIdCell.innerText = newRow.employee_id;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    phoneNumberCell.innerText = newRow.phone_number;

    // Add the cells to the row
    row.appendChild(employeeIdCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(phoneNumberCell);

    // Add the row to the table
    currentTable.appendChild(row);
};