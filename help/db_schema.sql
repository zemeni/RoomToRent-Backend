CREATE TABLE countries (
    country_key VARCHAR(10) PRIMARY KEY,    -- 3-character country code (e.g., 'AUS', 'CAN', 'USA')
    label VARCHAR(100) NOT NULL         -- Country name (e.g., 'Australia', 'Canada')
);

CREATE TABLE states (
    state_key VARCHAR(10) PRIMARY KEY,
    country_key VARCHAR(10) REFERENCES countries(country_key) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    latitude DECIMAL(8, 5),
    longitude DECIMAL(8, 5)
);

CREATE TABLE users(
    UserId    SERIAL PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName  VARCHAR(50),
    Email     VARCHAR(100) UNIQUE NOT NULL,
    Password  VARCHAR(255)        NOT NULL,
    active    BOOLEAN DEFAULT TRUE,
    Phone     VARCHAR(15),
    Country   VARCHAR(10) REFERENCES countries(country_key),
    state     VARCHAR(10) REFERENCES states(state_key)
);
curl -X POST http://localhost:4000/api/signup -d '{"firstname":"zon", "lastname":"shrestha", "email":"zon@gmail.com", "password":"admins", "phone":"0452445806", "country":"AUS", "state":"NSW"}' -H 'Content-Type: application/json'

CREATE TABLE socials(
    socialid SERIAL PRIMARY KEY,
    title VARCHAR(200),
    imageUrl VARCHAR(250),
    description VARCHAR(500),
    facebookLink VARCHAR(200),
    state VARCHAR(50)
);

insert into socials(title, imageUrl, description, facebooklink,state)
values ('Teej Program', 'https://room-to-rent.s3.ap-southeast-2.amazonaws.com/teej.jpeg', 'Please come to celebrate teej!', 'https://www.ipaddressguide.com/cidr', 'NSW');

insert into socials(title, imageUrl, description, facebooklink,state)
values ('Bhaitiak Program', 'https://room-to-rent.s3.ap-southeast-2.amazonaws.com/teej.jpeg', 'Please come to celebrate bhaitika!', 'https://www.ipaddressguide.com/cidr', 'NSW');


CREATE TABLE sports(
    SportsId SERIAL PRIMARY KEY,
    title VARCHAR(200),
    imageUrl VARCHAR(250),
    description VARCHAR(500),
    facebookLink VARCHAR(200)
)

CREATE TABLE latest (
    latestId SERIAL PRIMARY KEY,
    description VARCHAR(500),
    videourl VARCHAR(1000),
    state VARCHAR(50),
    type VARCHAR(100),
    postedon TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



alter table sports add column state varchar(50);

insert into sports(title, imageUrl, description, facebooklink)
values ('Cricket Club', 'https://room-to-rent.s3.ap-southeast-2.amazonaws.com/boomerang_cup.jpg', 'Please join our local football club and enjoy weekend matches! Join our local football club and enjoy weekend matches!', 'https://www.facebook.com/redrhinoscc');

insert into sports(title, imageUrl, description, facebooklink)
values ('Football Club', 'https://room-to-rent.s3.ap-southeast-2.amazonaws.com/8848_football', 'Please join our local football club and enjoy weekend matches! Join our local football club and enjoy weekend matches!', 'https://www.facebook.com/8848RoyalsFC');




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

CREATE TABLE countries (
    country_key VARCHAR(10) PRIMARY KEY,    -- 3-character country code (e.g., 'AUS', 'CAN', 'USA')
    label VARCHAR(100) NOT NULL         -- Country name (e.g., 'Australia', 'Canada')
);

CREATE TABLE states (
    state_key VARCHAR(10) PRIMARY KEY,      -- 3-character state code (e.g., 'NSW', 'CA')
    country_key VARCHAR(10) REFERENCES countries(country_key) ON DELETE CASCADE,  -- Foreign key to countries table
    label VARCHAR(100) NOT NULL,        -- State name (e.g., 'New South Wales', 'California')
    latitude DECIMAL(8, 5),             -- Latitude coordinate
    longitude DECIMAL(8, 5)             -- Longitude coordinate
);

-- Insert countries
INSERT INTO countries (country_key, label) VALUES
    ('AUS', 'Australia'),
    ('CAN', 'Canada'),
    ('USA', 'United States');

-- Insert states for Australia
INSERT INTO states (state_key, country_key, label, latitude, longitude) VALUES
    ('NSW', 'AUS', 'New South Wales', -33.8688, 151.2093),
    ('VIC', 'AUS', 'Victoria', -37.8136, 144.9631),
    ('QLD', 'AUS', 'Queensland', -27.4698, 153.0251),
    ('SA', 'AUS', 'South Australia', -34.9285, 138.6007),
    ('WA', 'AUS', 'Western Australia', -31.9505, 115.8605),
    ('TAS', 'AUS', 'Tasmania', -42.8821, 147.3272),
    ('NT', 'AUS', 'Northern Territory', -12.4634, 130.8456),
    ('ACT', 'AUS', 'Australian Capital Territory', -35.2809, 149.1300);

-- Insert states for Canada
INSERT INTO states (state_key, country_key, label, latitude, longitude) VALUES
    ('ON', 'CAN', 'Ontario', 51.2538, -85.3232),




