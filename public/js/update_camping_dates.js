// Get the objects we need to modify
let updateCampingDatesForm = document.getElementById('update-camping-dates-form-ajax')

// Modify the objects we need 
updateCampingDatesForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputReservationId = document.getElementById("mySelect");
    let inputCampingStartDate = document.getElementById("input-camping-start-date");
    let inputCampingEndDate = document.getElementById("input-camping-end-date");

    // Get the values from the form fields
    let reservationIdValue = inputReservationId.value;
    let campingStartDateValue = inputCampingStartDate.value;
    let campingEndDateValue = inputCampingEndDate.value;

    if (isNaN(campingStartDateValue) || isNaN(campingEndDateValue)) {
        return;
    }

    // Put our data we want to send in a javascript object 
    let data = {
        reservationId: reservationIdValue,
        campingStartDate: campingStartDateValue,
        campingEndDate: campingEndDateValue,
    }

    // Set up our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-reservation-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onereadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, reservationIdValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

function updateRow(data, reservationId) {
    let parsedData = JSON.parse(data);

    let reservationTable = document.getElementById("reservation-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        // Rows would be accessed using the "row" variable assigned in loop
        if (table.rows[i].getAttribute("data-value") == reservationId) {

            // Get the location of the row where we found the matching reservation ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of camping start date
            let tdStartDate = updateRowIndex.getElementsByTagName("td")[6];
            let tdEndDate = updateRowIndex.getElementsByTagName("td")[7];

            // Reassign camping start date to our value we updated to
            tdStartDate.innerHTML = parsedData[0].campingStartDate;
            tdEndDate.innerHTML = parsedData[1].campingEndDate;
        }
    }
};