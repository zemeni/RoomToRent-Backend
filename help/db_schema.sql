CREATE TABLE users(
    UserId    SERIAL PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName  VARCHAR(50),
    Email     VARCHAR(100) UNIQUE NOT NULL,
    Password  VARCHAR(255)        NOT NULL,
    active    BOOLEAN DEFAULT TRUE,
    Phone     VARCHAR(15),
    state VARCHAR(100)
);


insert into users (firstname, lastname, email, password, phone) VALUES ('a','b','ddddd','p','0uu');


CREATE TABLE units (
                       id SERIAL PRIMARY KEY,
                       address VARCHAR(255),
                       price DECIMAL,
                       bondPrice DECIMAL,
                       rooms INTEGER,
                       description TEXT,
                       bathrooms INTEGER,
                       parkings INTEGER,
                       startDate TIMESTAMP,
                       endDate TIMESTAMP,
                       phone1 VARCHAR(20),
                       phone2 VARCHAR(20),
                       latitude DOUBLE PRECISION,
                       longitude DOUBLE PRECISION,
                       images TEXT[],
                       userID INTEGER,
                       unitNumber INTEGER,
                       state VARCHAR(20),
                       postcode VARCHAR(20)
);

CREATE TABLE rooms (
                       id SERIAL PRIMARY KEY,
                       address VARCHAR(255),
                       price DECIMAL,
                       including BOOLEAN,
                       roomType VARCHAR(50),
                       furnished BOOLEAN,
                       description TEXT,
                       bathrooms INTEGER,
                       parkings INTEGER,
                       startDate TIMESTAMP,
                       endDate TIMESTAMP,
                       images TEXT[],
                       userId INTEGER,
                       roomNumber INTEGER,
                       latitude DOUBLE PRECISION,
                       longitude DOUBLE PRECISION,
                       gender VARCHAR(20),
                       phone1 VARCHAR(20),
                       phone2 VARCHAR(20),
                       state VARCHAR(20),
                       postcode VARCHAR(20)
);