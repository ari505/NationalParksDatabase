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
INSERT INTO Programs (name, capacity, location, date_time, Employee_id)
    VALUES 
        (#name, #capacity, #location, #date_time, #Employee_id) --make foreign key into drop downs later

--Reservations
INSERT INTO Reservations (date_created, is_campground, Campground_id, Program_id, 
Employee_id, camping_start_date, camping_end_date) 
    VALUES
        (#date_created, #campground_or_program_from_radio, #Campground_id, #Program_id, #Employee_id_from_dropdown, #camping_start_date, #camping_end_date) --make foreign keys into drop down later

--Reservations has Participants
INSERT INTO Reservations_has_Participants (Reservation_id, Participant_id)
    VALUES 
        (#Reservation_id, Participant_id) --make foreign keys into drop downs later

--All SELECT Queries

--SELECT everything from Employees
SELECT first_name, last_name, phone_number FROM Employees

--SELECT everything from Participants
SELECT first_name, last_name, age, phone_number, email FROM Participants

--SELECT everything from Campgrounds
SELECT campground_name, num_campsites FROM Campgrounds;

--SELECT everything from Programs
SELECT name, capacity, location, date_time, Employee_id FROM Programs 

--SELECT everything from Reservations
SELECT date_created, is_campground, Campground_id, Program_id, 
Employee_id, camping_start_date, camping_end_date FROM Reservations 

--SELECT everything from Reservations_has_Participants
SELECT Reservation_id, Participant_id from Reservations_has_Participants 

--UPDATE and DELETE Queries 

--UPDATE in Reservations_has_Paricipants
UPDATE Reservations_has_Participants SET Reservation_id = #Reservation_id, Participant_id = #Participant_id WHERE Reservation_id = #Reservation_id_of_row_chosen_for_update

--DELETE in Reservations_has_Participants
DELETE FROM Reservations_has_Participants WHERE Reservation_id = #Reservation_id AND Participant_id = #Participant_id
