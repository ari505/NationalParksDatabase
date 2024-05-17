--All INSERT Queries

--Employees 
INSERT INTO Employees (first_name, last_name, phone_number)
    VALUES 
        (#first_name, #last_name, #phone_number);

--Participants
INSERT INTO Participants (first_name, last_name, age, phone_number, email)
    VALUES 
        (#first_name, #last_name, #age, #phone_number, #email); 

--Campgrounds
INSERT INTO Campgrounds (campground_name, num_campsites)
    VALUES
        (campground_name, num_campsites); 

--Programs
INSERT INTO Programs (name, capacity, location, date_time, employee_id)
    VALUES 
        (#name, #capacity, #location, #date_time, #employee_id) --make foreign key into drop downs later

--Reservations
INSERT INTO Reservations (date_created, is_campground, campground_id, program_id, 
employee_id, camping_start_date, camping_end_date) 
    VALUES
        (#date_created, #campground_or_program_from_radio, #campground_id, #program_id, #employee_id_from_dropdown, #camping_start_date, #camping_end_date) --make foreign keys into drop down later

--Reservations has Participants
INSERT INTO Reservations_has_Participants (reservation_id, participant_id)
    VALUES 
        (#reservation_id, participant_id) --make foreign keys into drop downs later

--All SELECT Queries

--SELECT everything from Employees
SELECT first_name, last_name, phone_number FROM Employees

--SELECT everything from Participants
SELECT first_name, last_name, age, phone_number, email FROM Participants

--SELECT everything from Campgrounds
SELECT campground_name, num_campsites FROM Campgrounds;

--SELECT everything from Programs
SELECT name, capacity, location, date_time, employee_id FROM Programs 

--SELECT everything from Reservations
SELECT date_created, is_campground, campground_id, program_id, 
employee_id, camping_start_date, camping_end_date FROM Reservations 

--SELECT everything from Reservations_has_Participants
SELECT reservation_id, participant_id from Reservations_has_Participants 

--UPDATE and DELETE Queries 

--UPDATE in Reservations
UPDATE Reservations SET reservation_id = #reservation_id WHERE reservation_id = #reservation_id_of_row_chosen_for_update

--DELETE in Reservations
DELETE FROM Reservations WHERE reservation_id = #reservation_id_of_row_chosen_for_delete
