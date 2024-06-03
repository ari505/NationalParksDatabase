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
        ((SELECT reservation_id FROM Reservations WHERE employee_id = #employee_id and date_time_created = #date_time_created),
            (SELECT participant_id FROM Participants WHERE participant_id = #participant_id));

--All SELECT Queries

--SELECT everything from Employees with aliases
SELECT employee_id AS 'Employee ID', first_name AS 'First Name', last_name AS 'Last Name', phone_number AS 'Phone Number' FROM Employees;

--SELECT everything from Participants with aliases
SELECT participant_id AS 'Participant ID', first_name AS 'First Name', last_name AS 'Last Name', age AS 'Age', phone_number AS 'Phone Number', email AS 'Email' FROM Participants;

--SELECT everything from Campgrounds with aliases
SELECT campground_id AS 'Campground ID', campground_name AS 'Campground Name', num_campsites AS 'Number of Campsites' FROM Campgrounds;

--SELECT everything from Programs with aliases and 
SELECT program_id AS 'Program ID', name AS 'Name', capacity AS 'Capacity', location AS 'Location', date_time AS 'Date/Time', employee_id AS 'Employee ID' FROM Programs;

--SELECT everything from Reservations with aliases
SELECT reservation_id AS 'Reservation ID', employee_id AS 'Employee ID', date_time_created AS 'Date/Time Created', program_id AS 'Program ID', is_campground AS 'Campground?', campground_id AS 'Campground ID', camping_start_date AS 'Camping Start Date', camping_end_date AS 'Camping End Date' FROM Reservations; 

--JOINS Reservations, Participants, Reservations_has_Participants to display relevant information in Reservations_has_Participants browse table
SELECT Reservations_has_Participants.reservation_participant_id AS 'Reservation-Participant ID', Reservations.reservation_id AS 'Reservation ID', Participants.participant_id AS 'Participant ID', 
    Participants.first_name AS 'Participant First Name', Participants.last_name AS 'Participant Last Name', Reservations.program_id AS 'Program ID', Reservations.campground_id AS 'Campground ID' FROM Reservations
INNER JOIN Reservations_has_Participants ON Reservations_has_Participants.reservation_id = Reservations.reservation_id
INNER JOIN Participants ON Participants.participant_id = Reservations_has_Participants.participant_id
ORDER BY Participants.participant_id`;

--UPDATE and DELETE Queries 

--UPDATE in Reservations_has_Paricipants
UPDATE Reservations_has_Participants SET reservation_id = #reservation_id, participant_id = #participant_id WHERE reservation_id = #reservation_id_of_row_chosen_for_update

--DELETE in Reservations_has_Participants
DELETE FROM Reservations_has_Participants WHERE reservation_id = #reservation_id AND participant_id = #participant_id
