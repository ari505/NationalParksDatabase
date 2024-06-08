// add_participant

// Citation for all code with the exception of confirm():
// Date: 06/07/24
// Adapted from: Sample code privided in class
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Citation for confirm():
// Date: 6/6/24
// Adapted from: confirm alert function at the given link 
// Source URL: https://www.w3schools.com/jsref/met_win_confirm.asp

// Get objects we need to modify
let addParticipantForm = document.getElementById('add-participant-form-ajax');

// Modify the objects we need 
addParticipantForm.addEventListener("submit", function(e) {
    // Prevent form submission
    e.preventDefault();

    // Show alert to confirm update
    if (confirm("Are you sure you want to add this participant?") == true) {

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("first_name");
    let inputLastName = document.getElementById("last_name");
    let inputAge = document.getElementById("age");
    let inputPhoneNumber = document.getElementById("phone_number");
    let inputEmail = document.getElementById("email");

    // Get values from form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let ageValue = inputAge.value;
    let phoneNumberValue = inputPhoneNumber.value;
    let emailValue = inputEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        age: ageValue,
        phone_number: phoneNumberValue, 
        email: emailValue             
    }

    // Set up our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-participant-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);
            location.reload();
            alert("Success!");

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputAge.value = '';
            inputPhoneNumber.value = '';
            inputEmail.value = '';
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
    let currentTable = document.getElementById("participants-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data)
    let newRow = parsedData[parsedData.length - 1]  

    // Create a row and 4 cells
    let row = document.createElement('tr');
    let participantIdCell = document.createElement('td');
    let firstNameCell = document.createElement('td');
    let lastNameCell = document.createElement('td');
    let ageCell = document.createElement('td');
    let phoneNumberCell = document.createElement('td');
    let emailCell = document.createElement('td');

    // Fill the cells with correct data
    participantIdCell.innerText = newRow.employee_id;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    ageCell.innerText = newRow.age;
    phoneNumberCell.innerText = newRow.phone_number;
    emailCell.innerText = newRow.email;

    // Add the cells to the row
    row.appendChild(participantIdCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(age);
    row.appendChild(phoneNumberCell);
    row.appendChild(email);

    // Add the row to the table
    currentTable.appendChild(row);
};
