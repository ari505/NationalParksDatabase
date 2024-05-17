-- Arianna Valencia and Viviana McIntyre
-- Group 62
-- CS340 Project - Natural Parks Database
-- DDL SQL


SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


-- Create Employees table
CREATE OR REPLACE TABLE Employees (
    employee_id int(11) NOT NULL AUTO_INCREMENT, 
    first_name varchar(145) NOT NULL,
    last_name varchar(145) NOT NULL, 
    phone_number varchar(45) NOT NULL, 
    PRIMARY KEY(employee_id)
);

-- Create Participants table
CREATE OR REPLACE TABLE Participants (
    participant_id int(11) NOT NULL AUTO_INCREMENT, 
    first_name varchar(145) NOT NULL,
    last_name varchar(145) NOT NULL, 
    age int(11) NOT NULL, 
    phone_number varchar(45) NOT NULL, 
    email varchar(45) NOT NULL, 
    PRIMARY KEY (participant_id)
);

-- Create Programs table
CREATE OR REPLACE TABLE Programs(
    program_id int(11) NOT NULL AUTO_INCREMENT, 
    name varchar(145) NOT NULL, 
    capacity int(11) NOT NULL, 
    location varchar(145) NOT NULL, 
    date_time datetime NOT NULL,  
    employee_id int, 
    PRIMARY KEY (program_id), 
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
    ON DELETE CASCADE
); 

-- Create Campgrounds table
CREATE OR REPLACE TABLE Campgrounds (
    campground_id int(11) NOT NULL AUTO_INCREMENT,
    campground_name varchar(145),
    num_campsites int(11),
    PRIMARY KEY (campground_id)
);

-- Create Reservations table
CREATE OR REPLACE TABLE Reservations (
    reservation_id int(11) NOT NULL AUTO_INCREMENT,
    employee_id int(11) NOT NULL,
    date_time_created datetime NOT NULL,
    program_id int(11),
    is_campground tinyint(1) NOT NULL,
    campground_id int(11),
    camping_start_date date,
    camping_end_date date,
    PRIMARY KEY (reservation_id),
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id),
    FOREIGN KEY (campground_id) REFERENCES Campgrounds(campground_id),
    FOREIGN KEY (program_id) REFERENCES Programs(program_id)
);

-- Create Reservations_has_Participants table
CREATE OR REPLACE TABLE Reservations_has_Participants (
    reservation_participant_id int(11) NOT NULL AUTO_INCREMENT,
    reservation_id int(11) NOT NULL,
    participant_id int(11) NOT NULL,
    PRIMARY KEY (reservation_participant_id),
    FOREIGN KEY (reservation_id) REFERENCES Reservations (reservation_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (participant_id) REFERENCES Participants (participant_id)
);


-- Insert sample data for Employees
INSERT INTO Employees (first_name, last_name, phone_number)
    VALUES
    ('Viviana', 'McIntyre', '505-987-6543'),
    ('Noel', 'Freeze', '505-876-5467'),
    ('Jake', 'Santana', '505-716-8975');

-- Insert sample data for Participants
INSERT INTO Participants (first_name, last_name, age, phone_number, email)
    VALUES 
        ('Andrew', 'Kent', 23, '564-798-0908', 'andrew_kent@gmail.com'),
        ('Sharon', 'Myers', 45, '961-893-0000', 'm_sharon@yahoo.com'),
        ('Becky', 'Hendon', 19, '351-098-3289', 'bhendon@outlook.com');

-- Insert sample data for Campgrounds
-- Campground data retrieived from: https://www.nps.gov/yose/planyourvisit/campgrounds.htm
INSERT INTO Campgrounds (campground_name, num_campsites)
    VALUES
    ('Upper Pines', 238),
    ('Lower Pines', 60),
    ('North Pines', 81);

-- Insert sample data for Programs
INSERT INTO Programs(name, capacity, location, date_time, employee_id)
    VALUES 
        ('Outdoor Restorative Yoga', 25,'Lower Pines', '2024-05-03 12:00:00', (SELECT employee_id FROM Employees WHERE first_name = 'Viviana' and last_name = 'McIntyre')), 
        ('Community hike', 17, 'North Pines', '2024-05-15 09:00:00', (SELECT employee_id FROM Employees WHERE first_name = 'Noel' and last_name = 'Freeze')), 
        ('Park Tour', 30, "Upper Pines", '2024-06-01 10:00:00', (SELECT employee_id FROM Employees WHERE first_name = 'Jake' and last_name = 'Santana')); 

-- Insert sample data for Reservations
INSERT INTO Reservations (date_time_created, is_campground, campground_id, program_id, 
employee_id, camping_start_date, camping_end_date)
    VALUES
    ('2023-10-15 09:09:09', 1, 
        NULL, (SELECT program_id FROM Programs WHERE name = 'Outdoor Restorative Yoga'), 
        (SELECT employee_id FROM Employees WHERE first_name = 'Viviana' and last_name = 'McIntyre'),
        NULL, NULL),
    ('2023-12-06 08:07:06', 1,
        (SELECT campground_id FROM Campgrounds WHERE campground_name = 'Lower Pines'), NULL,
        (SELECT employee_id FROM Employees WHERE first_name = 'Jake' and last_name = 'Santana'),
        "2024-05-04", "2024-05-11"),
    ('2024-03-18 10:05:02', 1,
        NULL, (SELECT program_id FROM Programs WHERE name = 'Park Tour'),
        (SELECT employee_id FROM Employees WHERE first_name = 'Noel' and last_name = 'Freeze'),
        NULL, NULL),
    ('2024-02-03 03:03:03', 1,
        (SELECT campground_id FROM Campgrounds WHERE campground_name = 'North Pines'), NULL,
        (SELECT employee_id FROM Employees WHERE first_name = 'Noel' and last_name = 'Freeze'),
        "2024-07-25", "2024-07-28");

-- Insert sample data for Reservations_has_Participants
INSERT INTO Reservations_has_Participants (reservation_id, participant_id)
    VALUES 
        ((SELECT reservation_id FROM Reservations
            WHERE employee_id = 3 and date_time_created = '2023-12-06 08:07:06'),
            (SELECT participant_id FROM Participants 
                WHERE first_name = 'Andrew' and last_name = 'Kent' and phone_number = '564-798-0908')),
        ((SELECT reservation_id FROM Reservations
            WHERE employee_id = 1 and date_time_created = '2023-10-15 09:09:09'),
            (SELECT participant_id FROM Participants 
                WHERE first_name = 'Sharon' and last_name = 'Myers' and phone_number = '961-893-0000')),
        ((SELECT reservation_id FROM Reservations
            WHERE employee_id = 2 and date_time_created = '2024-03-18 10:05:02'),
            (SELECT participant_id FROM Participants 
                WHERE first_name = 'Becky' and last_name = 'Hendon' and phone_number = '351-098-3289')),
        ((SELECT reservation_id FROM Reservations
            WHERE employee_id = 2 and date_time_created = '2024-02-03 03:03:03'),
            (SELECT participant_id FROM Participants 
                WHERE first_name = 'Becky' and last_name = 'Hendon' and phone_number = '351-098-3289')),
        ((SELECT reservation_id FROM Reservations
            WHERE employee_id = 2 and date_time_created = '2024-02-03 03:03:03'),
            (SELECT participant_id FROM Participants 
                WHERE first_name = 'Andrew' and last_name = 'Kent' and phone_number = '564-798-0908'));


-- Print Tables with Sample Data:
SELECT * FROM Employees;
SELECT * FROM Participants;
SELECT * FROM Campgrounds;
SELECT * FROM Programs;
SELECT * FROM Reservations;
SELECT * FROM Reservations_has_Participants;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

