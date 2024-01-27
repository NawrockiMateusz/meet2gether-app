CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Username VARCHAR(100) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE Categories (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Image VARCHAR(100)
);

CREATE TABLE Events (
    Id SERIAL PRIMARY KEY,
    Category INT REFERENCES Categories(Id) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Location VARCHAR(100),
	EventDate DATE NOT NULL,
	Description 
);

CREATE TABLE UserEvents (
    Id SERIAL PRIMARY KEY,
    UserId INT REFERENCES Users(Id) NOT NULL,
    EventId INT REFERENCES Events(Id) NOT NULL
);