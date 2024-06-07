// add_campground.js

// Citation for confirm():
// Date: 6/6/24
// Adapted from:
// Source URL: https://www.w3schools.com/jsref/met_win_confirm.asp

let addCampgroundForm = document.getElementById('add-campground-form');

addCampgroundForm.addEventListener("submit", function (e) {
    e.preventDefault(); 

    // Show alert to confirm update
    if (confirm("Are you sure you want to add this campground?") == true) {

    //form fields 
    let inputCampgroundName = document.getElementById("input-cg-name"); 
    let inputNumCampsites = document.getElementById("input-num-cs"); 

    //get input values
    let campgroundNameValue = inputCampgroundName.value;
    let numCampsitesValue = inputNumCampsites.value; 

    //put data into campground object 
    let data = {
        campground_name: campgroundNameValue, 
        num_campsites: numCampsitesValue
    }

    console.log(data); 

    //setup ajax request 
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("POST", '/add-campground', true); 
    xhttp.setRequestHeader("Content-type", "application/json"); 

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            alert("Success!");

            // Clear the input fields for another transaction
            inputCampgroundName.value = '';
            inputNumCampsites.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input")
        }
    }   
    xhttp.send(JSON.stringify(data));

}});

addRowToTable = (data) => {
    //current table reference
    let currentTable = document.getElementById("campgrounds-table"); 

    // Get the last index in the table 
    let newRowIndex = currentTable.rows.length; 

    // Get a reference to the new row from the database query
    let parsedData = JSON.parse(data); 
    let newRow = parsedData[parsedData.length - 1]

    //create rows and cells
    let row = document.createElement("TR"); 
    let cgIdCell = document.createElement("TD");
    let cgNameCell = document.createElement("TD");
    let numCsCell = document.createElement("TD");

    //fill cells w data 
    cgIdCell.innerText = newRow.campground_id;
    cgNameCell.innerText = newRow.campground_name;
    numCsCell.innerText = newRow.num_campsites;

    //add cells to row 
    row.appendChild(cgIdCell);
    row.appendChild(cgNameCell);
    row.appendChild(numCsCell);

    //add row to table 
    currentTable.appendChild(row);
}
