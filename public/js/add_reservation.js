// Get the objects we need to modify
let addReservationForm = document.getElementById('/add-reservation-form-ajax');

// Modify the objects we need
addReservationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmployeeId = document.getElementById("employee_id");
    let inputDateTimeCreated = document.getElementById("date_time_created");
    let inputIsCampground = document.getElementById("is_campground");
    let inputCampgroundId = document.getElementById("campground_id");
    let inputProgramId = document.getElementById("program_id");
    let inputCampingStartDate = document.getElementById("camping_start_date");
    let inputCampingEndDate = document.getElementById("camping_end_date");

    // Get values from form fields
    let employeeIdValue = inputEmployeeId.value;
    let dateTimeCreatedValue = inputDateTimeCreated.value;
    let isCampgroundValue = inputIsCampground.value;
    let campgroundIdValue = inputCampgroundId.value;
    let programIdValue = inputProgramId.value;
    let campingStartDateValue = inputCampingStartDate.value;
    let campingEndDateValue = inputCampingEndDate.value;

    // Put data we want to send in a Javascript object
    let data = {
        employee_id: employeeIdValue,
        date_time_created: dateTimeCreatedValue,
        is_campground: isCampgroundValue,
        campground_id: campgroundIdValue,
        program_id: programIdValue,
        camping_start_date: campingStartDateValue,
        camping_end_date: campingEndDateValue
    }

     // Print data to console 
     console.log(data)

    // Set up our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_reservation", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmployeeId.value = '';
            inputDateTimeCreated.value = '';
            inputIsCampground.value = '';
            inputCampgroundId.value = '';
            inputProgramId.value = '';
            inputCampingStartDate.value = '';
            inputCampingEndDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

// Creates a single row from an Object representing a single record from Reservations
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("reservations-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("tr");
    let employeeIdCell = document.createElement("td");
    let dateTimeCreatedCell = document.createElement("td");
    let isCampgroundCell = document.createAttribute("td");
    let campgroundIdCell = document.createElement("td");
    let programIdCell = document.createElement("td");
    let campingStartDateCell = document.createElement("td");
    let campingEndDateCell = document.createElement("td");

    // Fill the cells with correct data
    employeeIdCell.innerText = newRow.employee_id;
    dateTimeCreatedCell.innerText = newRow.date_time_created;
    isCampgroundCell.innerText = newRow.is_campground;
    campgroundIdCell.innerText = newRow.campground_id;
    programIdCell.innerText = newRow.program_id;
    campingStartDateCell.innerText = newRow.camping_start_date;
    campingEndDateCell.innerText = newRow.camping_end_date;

    // Add the cells to the row
    row.appendChild(employeeIdCell);
    row.appendChild(dateTimeCreatedCell);
    row.appendChild(isCampgroundCell);
    row.appendChild(campgroundIdCell);
    row.appendChild(programIdCell);
    row.appendChild(campingStartDateCell);
    row.appendChild(campingEndDateCell);

    // Add the row to the table
    currentTable.appendChild(row);
};