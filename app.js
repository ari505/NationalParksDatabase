// Citation for the following functions:
// Date: 5/30/24
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


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
PORT        = 55565;                 // Set a port number at the top so it's easy to change in the future


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
        return res.render('index');       // Render the index.hbs file, and also send the renderer
    }); 

/*
    SELECT Campgrounds
*/
app.get('/campgrounds', function(req, res)
    {  
        let query1 = "SELECT * FROM Campgrounds;";

        db.pool.query(query1, function (error, rows, fields) {
            res.render('campgrounds', {campgrounds: rows});       // Render the campgrounds.hbs file, and also send the renderer 
        })
    }); 
    
/*
    SELECT Reservations
*/
app.get('/reservations', function(req, res)
    {  
        let query1 = "SELECT * FROM Employees;";               // Define our query
        let query2 = "SELECT * FROM Campgrounds;";
        let query3 = "SELECT * FROM Programs;";
        let query4 = "SELECT * FROM Participants;";
        let query5 = "SELECT * FROM Reservations";
        //let query5 = "SELECT reservation_id AS 'Reservation ID', employee_id AS 'Employee ID', date_time_created AS 'Date/Time Created', program_id AS 'Program ID', is_campground AS 'Campground?', campground_id AS 'Campground ID', camping_start_date AS 'Camping Start Date', camping_end_date AS 'Camping End Date' FROM Reservations;";
    
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
                        
                        // Save the Participants
                        let Participants = rows;
                    
                        db.pool.query(query5, (error, rows, fields) => {
                            
                            // Save the Reservations
                            let Reservations = rows;
                            return res.render('reservations', {data: Reservations, employees: Employees, campgrounds: Campgrounds, programs: Programs, participants: Participants});       // Render the reservations.hbs file, and also send the renderer
                        });
                    })
                })                                                                                                          // an object where 'data' is equal to the 'rows' we
            })                                                                                                              // received back from the query
        });                            
    });  

/*
    SELECT Employees
*/
app.get('/employees', function(req, res)
    {  
        let query1 = "SELECT * FROM Employees;"; 
        
        db.pool.query(query1, function(error, rows, fields) {
            res.render('employees', {employees: rows});         // Render the employees.hbs file, and also send the renderer
        }) 
    });
/*
    SELECT Participants
*/
app.get('/participants', function(req, res)
    {  
        let query1 = "SELECT * FROM Participants;"; 
        
        db.pool.query(query1, function(error, rows, fields) {
            res.render('participants', {participants: rows});   // Render the participants.hbs file, and also send the renderer
        }) 
    }); 
/*
    SELECT Programs
*/
app.get('/programs', function(req, res)
    {  
        let query1 = "SELECT * FROM Programs;"; 
        let query2 = "SELECT * FROM Employees;"; 

        db.pool.query(query1, function(error, rows, fields) {
            let programs = rows; 
            db.pool.query(query2, (error, rows, fields) => {
                let employees = rows; 
                res.render('programs', {programs: programs, employees: employees});
            })
        });
    }); 

/*
    SELECT Reservations_has_Participants
*/
app.get('/reservations_has_participants', function(req, res)
{  
    let query1 = "SELECT * FROM Participants;";
    let query2 = "SELECT * FROM Reservations";
    let query3 = `SELECT Reservations_has_Participants.reservation_participant_id, Reservations.reservation_id, Participants.participant_id, 
    Participants.first_name, Participants.last_name, Reservations.program_id, Reservations.campground_id FROM Reservations
INNER JOIN Reservations_has_Participants ON Reservations_has_Participants.reservation_id = Reservations.reservation_id
INNER JOIN Participants ON Participants.participant_id = Reservations_has_Participants.participant_id`;

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields) {           // Execute the query

        // Save the Employees
        let Participants = rows;

        // Run the 2nd query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the Campgrounds
            let Reservations = rows;
            
                //run the 3rd query
                db.pool.query(query3, (error, rows, fields) => {
                    let Reservations_has_Participants = rows;
                    return res.render('reservations_has_participants', {data: Reservations_has_Participants, reservations: Reservations, participants: Participants
                });
            })     
        })
    });                                                                                                        
});                                                                                                             
    
/*
    ADD Reservations
*/
app.post('/add_reservation', function(req, res) {
    // Capture incoming data and parse it back to a JS object
    let data = req.body;

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
            query2 = `SELECT reservation_id, employee_id, date_time_created, IFNULL(program_id, 'N/A'), is_campground, IFNULL(campground_id, 'N/A'), IFNULL(program_id, 'N/A') FROM Reservations;`;
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
    ADD Reservations_has_Participants
*/


app.post('/add-reservation-has-participants', function (req, res) {
    let data = req.body; 
    
    query1=`INSERT into Reservations_has_Participants (reservation_id, participant_id) VALUES (${data.reservation_id}, ${data.participant_id})`; 

    db.pool.query(query1, function (error, row, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            query2 = `SELECT Reservations_has_Participants.reservation_participant_id, Reservations.reservation_id, Participants.participant_id, 
            Participants.first_name, Participants.last_name, Reservations.program_id, Reservations.campground_id FROM Reservations
        INNER JOIN Reservations_has_Participants ON Reservations_has_Participants.reservation_id = Reservations.reservation_id
        INNER JOIN Participants ON Participants.participant_id = Reservations_has_Participants.participant_id`; 
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    DELETE Reservations
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
    UPDATE Reservations
*/
app.put('/put-reservation-ajax', function(req, res, next) {
    let data = req.body;

    let reservationId = parseInt(data.reservationId);
    let campingStartDate = data.campingStartDate;
    let campingEndDate = data.campingEndDate;

    let queryUpdateCampingStartDate = `UPDATE Reservations SET camping_start_date = ? WHERE reservation_id = ?`;
    let queryUpdateCampingEndDate = `UPDATE Reservations SET camping_end_date = ? WHERE reservation_id = ?`;
    let selectChangedReservation = `SELECT * FROM Reservations WHERE reservation_id = ?`
    

        // Run 1st query
        db.pool.query(queryUpdateCampingStartDate, [campingStartDate, reservationId], function(error, rows, fields) {
            
            if(error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query
            else {
                // Run 2nd query
                db.pool.query(queryUpdateCampingEndDate, [campingEndDate, reservationId], function(error, rows, fields) {
                    
                    if(error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating bad request.
                    console.log(error);
                    res.sendStatus(400);
                    }
                    // If there was no error, we run our third query and return that data so we can use it to update the 
                    // table on the front-end
                    else {
                        // Run 3rd query
                        db.pool.query(selectChangedReservation, [reservationId], function (error, rows, fields) {

                            if (error) {
                                console.log(error);
                                res.sendStatus(400);
                            } else {
                                res.send(rows);
                            }
                        })
                    }
                })
            }
        })
});

/*
    ADD Campgrounds
*/
app.post('/add-campground', function (req, res) {
    let data = req.body; 

    //capture null numbers for num campsites

    let num_campsites = parseInt(data.num_campsites);
    if (isNaN(num_campsites))
    {
        num_campsites = 'NULL'
    }

    //create query
    query1 = `INSERT INTO Campgrounds (campground_name, num_campsites) VALUES ('${data.campground_name}', ${data.num_campsites})`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            query2 = `SELECT * FROM Campgrounds;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                } else {
                    res.send(rows); 
                }
            })
        }
    })
}); 

/*
    ADD Employees 
*/
app.post('/add-employee-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create query 1 and run it on the database
    query1 = `INSERT INTO Employees (first_name, last_name, phone_number) VALUES ('${data.first_name}', '${data.last_name}', '${data.phone_number}')`;
    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log error to terminal and send HTTP response 400
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // No error, so perform query 2
            query2 = `SELECT * FROM Employees`;
            db.pool.query(query2, function(error, rows, fields) {
                // If error occurs, send a 400 
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }
                // If all went well, send results of query back
                else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    ADD Participants
*/
app.post('/add-participant-ajax', function(req, res) {
    // Capture incoming data and parse it back to a JS object
    let data = req.body;

    // Create first query and run it on DB
    query1 = `INSERT INTO Participants (first_name, last_name, age, phone_number, email) VALUES ('${data.first_name}', '${data.last_name}', '${data.age}', '${data.phone_number}', '${data.email}')`;
    db.pool.query(query1, function(error, rows, fields) {
        // Check for error
        if (error) {
            // Log error and send 400
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If no error, perform SELECT 
            query2 = `SELECT * FROM Participants;`;
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }
                // If no error, send results of query back
                else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    ADD Programs
*/
app.post('/add-program', function (req, res) {
    let data = req.body; 

    query1 = `INSERT INTO Programs (name, capacity, location, date_time, employee_id) VALUES ('${data.name}', ${data.capacity}, '${data.location}', '${data.date_time}', ${data.employee_id})`;
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            query2 = `SELECT * FROM Programs;`; 
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
}); 


/*
    LISTENER
*/

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});