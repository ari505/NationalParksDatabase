// Get the objects we need to modify
let addReservationForm = document.getElementById('add-reservation-form-ajax');

// Modify the objects we need
addReservationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmployeeId = document.getElementById("employee_id");
    let inputDateCreated = document.getElementById("date_created");
    let inputIsCampground = document.getElementById("is_campground");
    let inputCampgroundId = document.getElementById("campground_id");
    let inputProgramId = document.getElementById("program_id");
    let inputCampingStartDate = document.getElementById("camping_start_date");
    let inputCampingEndDate = document.getElementById("camping_end_date");

    // Get values from form fields
    let employeeIdValue = inputEmployeeId.value;
    let dateCreatedValue = inputDateCreated.value;
    let isCampgroundValue = inputIsCampground.value;
    let campgroundIdValue = inputCampgroundId.value;
    let programIdValue = inputProgramId.value;
    let campingStartDateValue = inputCampingStartDate.value;
    let campingEndDateValue = inputCampingEndDate.value;

    // Put our data we want to send in a Javascript object
    let data = {
        employee_id: employeeIdValue,
        date_created: dateCreatedValue,
        is_campground: isCampgroundValue,
        campground_id: campgroundIdValue,
        program_id: programIdValue,
        camping_start_date: campingStartDateValue,
        camping_end_date: campingEndDateValue
    }

    // Set up our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "add-reservation-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmployeeId.value = '';
            inputDateCreated.value = '';
            inputIsCampground.value = '';
            inputCampgroundId.value = '';
            inputProgramId.value = '';
            inputCampingStartDate = '';
            inputCampingEndDate = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

// Creates a single row from an Object representing a single record from Reservations
