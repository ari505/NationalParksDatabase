//send data to javascript object
function delete_reservation(reservation_id){
    let data = {
        reservation_id: reservation_id
    };

    //Set up AJAX request
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("DELETE", "/delete-reservation-ajax", true); 
    xhttp.setRequestHeader("Content-type", "application/json"); 

    //tell our AJAC request to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            //remove the data from the table
            deleteRow(reservation_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    //send the request
    xhttp.send(JSON.stringify(data)); 
}

function deleteRow(reservation_id){
    let table = document.getElementById("reservations-table"); 
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == reservation_id){
            table.deleteRow(i); 
            break; 
        }
    }
}
