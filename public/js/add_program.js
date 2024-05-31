let addProgramForm = document.getElementById('add-program-form'); 

addProgramForm.addEventListener("submit", function (e) {
    e.preventDefault(); 
    
    let inputName = document.getElementById("input-program-name"); 
    let inputCapacity = document.getElementById("input-program-cap"); 
    let inputLocation = document.getElementById("input-program-location"); 
    let inputDatetime = document.getElementById("input-program-datetime"); 
    let inputEmployeeId = document.getElementById("input-employee-id"); 

    let nameValue = inputName.value;
    let capacityValue = inputCapacity.value;
    let locationValue = inputLocation.value; 
    let datetimeValue = inputDatetime.value; 
    let employeeIdValue = inputEmployeeId.value; 

    let data = {
        name: nameValue,
        capacity: capacityValue,
        location: locationValue, 
        date_time: datetimeValue, 
        employee_id: employeeIdValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-program", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            location.reload();

            // Clear the input fields for another transaction
            inputName.value = '';
            inputCapacity.value = ''; 
            inputLocation.value = '';
            inputDatetime.value = '';
            inputEmployeeId.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

addRowToTable = (data) => {
    let currentTable = document.getElementById("programs-table"); 

    let newRowIndex = currentTable.rows.length; 

    let parsedData = JSON.parse(data); 
    let newRow = parsedData[parsedData.length - 1]; 

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let programIdCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let capacityCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
    let datetimeCell = document.createElement("TD");
    let employeeIdCell = document.createElement("TD");

    programIdCell.innerText = newRow.program_id;
    nameCell.innerText = newRow.name;
    capacityCell.innerText = newRow.capacity;
    locationCell.innerText = newRow.location;
    datetimeCell.innerText = newRow.date_time;
    employeeIdCell.innerText = newRow.employee_id;

    row.appendChild(programIdCell);
    row.appendChild(nameCell);
    row.appendChild(capacityCell);
    row.appendChild(locationCell);
    row.appendChild(datetimeCell);
    row.appendChild(employeeIdCell);

    currentTable.appendChild(row);

};
