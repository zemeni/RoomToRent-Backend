CREATE TABLE users(
    UserId    SERIAL PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName  VARCHAR(50),
    Email     VARCHAR(100) UNIQUE NOT NULL,
    Password  VARCHAR(255)        NOT NULL,
    active    BOOLEAN DEFAULT TRUE,
    Phone     VARCHAR(15),
    Country   VARCHAR(250) NOT NULL,
    state     VARCHAR(100) NOT NULL,
);

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