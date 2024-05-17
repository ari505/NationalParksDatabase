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
        (#reservation_id_from_input, #participant_id_from_input)

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

--JOINS Reservations, Participants, Reservations_has_Participants to display relevant information in Reservations_has_Participants browse table
SELECT Reservations.reservation_id, Participants.participant_id, Participants.first_name, Participants.last_name, Reservations.program_id, Reservations.campground_id FROM Reservations
    INNER JOIN Reservations_has_Participants ON Reservations_has_Participants.reservation_id = Reservations.reservation_id
    INNER JOIN Participants ON Participants.participant_id = Reservations_has_Participants.participant_id
        WHERE Participants.first_name = 'Andrew' and last_name = 'Kent' and phone_number = '564-798-0908';

--UPDATE and DELETE Queries 

--UPDATE in Reservations_has_Paricipants
UPDATE Reservations_has_Participants SET reservation_id = #reservation_id, participant_id = #participant_id WHERE reservation_id = #reservation_id_of_row_chosen_for_update

--DELETE in Reservations_has_Participants
DELETE FROM Reservations_has_Participants WHERE reservation_id = #reservation_id AND participant_id = #participant_id
