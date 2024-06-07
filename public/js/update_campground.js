// update_campground.js

// Citation for confirm():
// Date: 6/6/24
// Adapted from:
// Source URL: https://www.w3schools.com/jsref/met_win_confirm.asp


// Get the objects we need to modify
let updateCampgroundForm = document.getElementById('update-campground-form-ajax')

// Modify the objects we need 
updateCampgroundForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    
    // Show alert to confirm update
    if (confirm("Are you sure you want to update this reservation?") == true) {

    // Get form fields we need to get data from
    let inputReservationId = document.getElementById("input-reservation-id-campground");
    let inputCampgroundId = document.getElementById("input-campground-id");

    // Get the values from the form fields
    let reservationIdValue = inputReservationId.value;
    let campgroundIdValue = inputCampgroundId.value;

    // Put our data we want to send in a javascript object 
    let data = {
        reservationId: reservationIdValue,
        campgroundId: campgroundIdValue
    }

    console.log(data);

    // Set up our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-reservation-campground-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, reservationIdValue);
            location.reload();
            alert("Success!");
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

}});

function updateRow(data, reservationId) {
    let parsedData = JSON.parse(data);
    console.log(parsedData);

    let table = document.getElementById("reservations-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        // Rows would be accessed using the "row" variable assigned in loop
        if (table.rows[i].getAttribute("data-value") == reservationId) {

            // Get the location of the row where we found the matching reservation ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of campground
            let tdCampgroundId = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign campground
            tdCampgroundId.innerHTML = parsedData[0].campgroundId;
            
        }
    }
};