-- Arianna Valencia and Viviana McIntyre
-- Group 62
-- CS340 Project - Natural Parks Database
-- DDL SQL


SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


CREATE OR REPLACE TABLE Employees (
    employee_id int(11) NOT NULL AUTO_INCREMENT, 
    first_name varchar(145) NOT NULL,
    last_name varchar(145) NOT NULL, 
    phone_number varchar(45) NOT NULL, 
    PRIMARY KEY(employee_id)
);

CREATE OR REPLACE TABLE Participants (
    participant_id int(11) NOT NULL AUTO_INCREMENT, 
    first_name varchar(145) NOT NULL,
    last_name varchar(145) NOT NULL, 
    age int(11) NOT NULL, 
    phone_number varchar(45) NOT NULL, 
    email varchar(45) NOT NULL, 
    PRIMARY KEY (participant_id)
);

CREATE OR REPLACE TABLE Programs(
    program_id int(11) NOT NULL AUTO_INCREMENT, 
    name varchar(145) NOT NULL, 
    capacity int(11) NOT NULL, 
    location varchar(145) NOT NULL, 
    date_time datetime NOT NULL,  
    Employee_id int, 
    PRIMARY KEY (program_id), 
    FOREIGN KEY (Employee_id) REFERENCES Employees(employee_id)
    ON DELETE CASCADE
); 

CREATE OR REPLACE TABLE Campgrounds (
    campground_id int(11) NOT NULL AUTO_INCREMENT,
    campground_name varchar(145),
    num_campsites int(11),
    PRIMARY KEY (campground_id)
);

CREATE OR REPLACE TABLE Reservations (
    reservation_id int(11) NOT NULL AUTO_INCREMENT,
    Employee_id int(11) NOT NULL,
    date_created date NOT NULL,
    Program_id int(11),
    is_campground tinyint(1) NOT NULL,
    Campground_id int(11),
    camping_start_date date,
    camping_end_date date,
    PRIMARY KEY (reservation_id),
    FOREIGN KEY (Employee_id) REFERENCES Employees(employee_id),
    FOREIGN KEY (Campground_id) REFERENCES Campgrounds(campground_id),
    FOREIGN KEY (Program_id) REFERENCES Programs(program_id)
    ON DELETE CASCADE
);

CREATE OR REPLACE TABLE Reservations_has_Participants(
    Reservation_id int(11) NOT NULL,
    Participant_id int(11) NOT NULL,
    CONSTRAINT PRIMARY KEY (Reservation_id, Participant_id),
    CONSTRAINT FOREIGN KEY (Reservation_id) REFERENCES Reservations (reservation_id),
    CONSTRAINT FOREIGN KEY (Participant_id) REFERENCES Participants (participant_id)
    ON DELETE CASCADE
);

INSERT INTO Employees (first_name, last_name, phone_number)
    VALUES
    ('Viviana', 'McIntyre', '505-987-6543'),
    ('Noel', 'Freeze', '505-876-5467'),
    ('Jake', 'Santana', '505-716-8975');

-- Campground data retrieived from: https://www.nps.gov/yose/planyourvisit/campgrounds.htm

INSERT INTO Participants (first_name, last_name, age, phone_number, email)
    VALUES 
        ('Andrew', 'Kent', 23, '564-798-0908', 'andrew_kent@gmail.com'),
        ('Sharon', 'Myers', 45, '961-893-0000', 'm_sharon@yahoo.com'),
        ('Becky', 'Hendon', 19, '351-098-3289', 'bhendon@outlook.com');

INSERT INTO Campgrounds (campground_name, num_campsites)
    VALUES
    ('Upper Pines', 238),
    ('Lower Pines', 60),
    ('North Pines', 81);

INSERT INTO Programs(name, capacity, location, date_time, Employee_id)
    VALUES 
        ('Outdoor Restorative Yoga', 25,'Lower Pines', '2024-05-03 12:00:00', (SELECT employee_id FROM Employees WHERE first_name = 'Viviana' and last_name = 'McIntyre')), 
        ('Community hike', 17, 'North Pines', '2024-05-15 09:00:00', (SELECT employee_id FROM Employees WHERE first_name = 'Noel' and last_name = 'Freeze')), 
        ('Park Tour', 30, "Upper Pines", '2024-06-01 10:00:00', (SELECT employee_id FROM Employees WHERE first_name = 'Jake' and last_name = 'Santana')); 

INSERT INTO Reservations (date_created, is_campground, Campground_id, Program_id, 
Employee_id, camping_start_date, camping_end_date)
    VALUES
    ("2023-10-15", 1, 
        NULL, (SELECT program_id FROM Programs WHERE name = 'Outdoor Restorative Yoga'), 
        (SELECT employee_id FROM Employees WHERE first_name = 'Viviana' and last_name = 'McIntyre'),
        NULL, NULL),
    ("2023-12-06", 1,
        (SELECT campground_id FROM Campgrounds WHERE campground_name = 'Lower Pines'), NULL,
        (SELECT employee_id FROM Employees WHERE first_name = 'Jake' and last_name = 'Santana'),
        "2024-05-04", "2024-05-11"),
    ("2024-03-18", 1,
        NULL, (SELECT program_id FROM Programs WHERE name = 'Park Tour'),
        (SELECT employee_id FROM Employees WHERE first_name = 'Noel' and last_name = 'Freeze'),
        NULL, NULL),
    ("2024-02-03", 1,
        (SELECT campground_id FROM Campgrounds WHERE campground_name = 'North Pines'), NULL,
        (SELECT employee_id FROM Employees WHERE first_name = 'Noel' and last_name = 'Freeze'),
        "2024-07-25", "2024-07-28");

INSERT INTO Reservations_has_Participants (Reservation_id, Participant_id)
    VALUES 
        ((SELECT reservation_id FROM Reservations
            WHERE camping_start_date = '2024-05-04' and camping_end_date = '2024-05-11'),
        (SELECT participant_id FROM Participants 
            WHERE first_name = 'Andrew' and last_name = 'Kent' and phone_number = '564-798-0908'));


-- Print Tables with Sample Data:
SELECT * FROM Employees;
SELECT * FROM Participants;
SELECT * FROM Reservations;
SELECT * FROM Campgrounds;
SELECT * FROM Programs;


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

