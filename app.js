// app.js

/*
    SETUP
*/

// Database
var db = require('./database/db-connector')

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Port
PORT        = 56555;                 // Set a port number at the top so it's easy to change in the future


// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/

app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Employees;";               // Define our query
        let query2 = "SELECT * FROM Campgrounds;";
        let query3 = "SELECT * FROM Programs;";
        let query4 = "SELECT * FROM Reservations;";

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields) {           // Execute the query

            // Save the Employees
            let Employees = rows;

            // Run the 2nd query
            db.pool.query(query2, (error, rows, fields) => {

                // Save the Campgrounds
                let Campgrounds = rows;
                
                // Run the 3rd query
                db.pool.query(query3, (error, rows, fields) => {

                    // Save the Programs
                    let Programs = rows;

                    // Run the 4th query
                    db.pool.query(query4, (error, rows, fields) => {
                        
                        // Save the Reservations
                        let Reservations = rows;
                        return res.render('index', {data: Reservations, employees: Employees, campgrounds: Campgrounds, programs: Programs});       // Render the index.hbs file, and also send the renderer
                    })
                })                                                                                                          // an object where 'data' is equal to the 'rows' we
            })                                                                                                              // received back from the query
        })                                
    });                                                                                       

app.post('/add_reservation', function(req, res) {
    // Capture incoming data and parse it back to a JS object
    let data = req.body;

/*    // Capture NULL values
    let employee_id = parseInt(data.employee_id);
    if (isNaN(employee_id)) {
        employee_id = 'NULL'
    }
    
    let program_id = parseInt(data.program_id);
    if (isNaN(program_id)) {
        program_id = 'NULL'
    }

    let campground_id = parseInt(data.campground_id);
    if (isNaN(campground_id)) {
        campground_id = 'NULL'
    } 
*/

    // Create query and run it in database
    query1 = `INSERT INTO Reservations (employee_id, date_time_created, is_campground, campground_id, program_id, camping_start_date, camping_end_date) 
            VALUES
                (${data.employee_id}, '${data.date_time_created}', ${data.is_campground}, ${data.campground_id}, ${data.program_id}, '${data.camping_start_date}', '${data.camping_end_date}')`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Reservations
            query2 = `SELECT * FROM Reservations;`;
            db.pool.query(query2, function(error, rows, fields) {
                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});
/*
    DELETE RESERVATION
*/
app.delete('/delete-reservation-ajax/', function(req, res, next) {
    // Capture incoming data and parse it back to a JS object
    let data = req.body;
    let reservation_id = parseInt(data.reservation_id);
    let delete_reservation = 'DELETE FROM Reservations WHERE reservation_id = ?';
    
    db.pool.query(delete_reservation, [reservation_id], function(error, rows, fields){
        if (error) {
            console.log(error); 
            res.sendStatus(400);
        } else {
            console.log("request recieved"); 
            res.sendStatus(204); 
        }
    })
}); 

/*
    UPDATE RESERVATION
*/
app.put('/put-reservation-ajax', function(req, res, next) {
    let data = req.body;

    let queryUpdateCampingStartDate = `UPDATE Reservations SET camping_start_date = ? WHERE reservation_id = ?`;
    let queryUpdateCampingEndDate = `UPDATE Reservations SET camping_end_date = ? WHERE reservation_id = ?`;

        // Run 1st query
        db.pool.query(queryUpdateCampingStartDate, [reservation_id, camping_start_date], function(error, rows, fields) {
            if(error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the 
            // table on the front-end
            else{
                // Run 2nd query
                db.pool.query()
            }
        })
        

})
/*
    LISTENER
*/

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});