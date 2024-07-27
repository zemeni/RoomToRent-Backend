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

CREATE TABLE propertyTypes(
                              PropertyTypeId SERIAL PRIMARY KEY ,
                              TypeName VARCHAR(50) NOT NULL
);

INSERT INTO propertyTypes (TypeName) VALUES ('House'), ('Townhouse'), ('Apartment');

CREATE TABLE properties(
  PropertyId SERIAL PRIMARY KEY,
  OwnerId INT REFERENCES users(UserId),
  PropertyTypeId INT REFERENCES propertyTypes(propertytypeid),
  AddressId INT REFERENCES address(addressid),
  Description TEXT,
  NumberOfRooms INT,
  NumberOfBathroom INT,
  NumberOfParking INT,
  Price DECIMAL(10,2),
  PricePeriod VARCHAR(50),
  AvailableFrom DATE,
  AvailableTo DATE
);

CREATE TABLE rooms(
    RoomId SERIAL PRIMARY KEY,
    PropertyId INT REFERENCES properties(PropertyId),
    OwnerId INT REFERENCES users(userid),
    AddressId INT REFERENCES address(addressid),
    RoomNumber INTEGER,
    Furnished BOOLEAN,
    RoomTypeId INT REFERENCES roomType(RoomTypeId),
    Price DECIMAL(10,2),
    PricePeriod VARCHAR(50),
    AvailableFrom DATE,
    AvailableTo DATE,
    Description TEXT
);

CREATE TABLE  roomType(
  RoomTypeId SERIAL PRIMARY KEY,
  RoomType VARCHAR(15) -- SINGLE, DOUBLE
);

insert into users values (1, 'Baburam', 'Neupane', 'neupanebabu828@gmail.com', 'abc123', '0452445***',1);
insert into users values (2, 'Subodh', 'Tiwari', 'subodh.tiwari@gmail.com', 'abc123', '0452445***',1);
insert into users values (3, 'Gaurav', 'Neupane', 'gaurav.neupane@gmail.com', 'abc123', '0452445***',2);
insert into users values (4, 'Roman', 'Paudel', 'roman.paudel@gmail.com', 'abc123', '0452445***',2);

select * from users;

insert into properties (ownerid, description, numberofrooms, numberofbathroom, numberofparking, price, availablefrom, availableto) values
                       (1, 'very good 1 room available', 3, 1, 1, 0, '2025-04-29', '2029-04-30');
insert into properties (ownerid, description, numberofrooms, numberofbathroom, numberofparking, price, availablefrom, availableto) values
                       (2, 'very good 1 room available', 3, 1, 1, 0, '2025-04-29', '2029-04-30');
insert into properties (ownerid, description, numberofrooms, numberofbathroom, numberofparking, price, availablefrom, availableto) values
                       (3, 'very good 1 room available', 3, 1, 1, 0, '2025-04-29', '2029-04-30');
select * from properties;


insert into rooms(propertyid, roomnumber, furnished, roomtypeid, price, availablefrom, availableto, description) values
                  (1, 1, true, 1, 320, '2024-05-24', '2029-05-09', 'furnished single room available in marion');
insert into rooms(propertyid, roomnumber, furnished, roomtypeid, price, availablefrom, availableto, description) values
                  (1, 2, true, 1, 230, '2024-05-24', '2029-05-09', 'furnished single room available in marion');
insert into rooms(propertyid, roomnumber, furnished, roomtypeid, price, availablefrom, availableto, description) values
                  (2, 1, true, 1, 320, '2024-05-24', '2029-05-09', 'furnished single room available in marion');
insert into rooms(propertyid, roomnumber, furnished, roomtypeid, price, availablefrom, availableto, description) values
                  (2, 2, true, 1, 320, '2024-05-24', '2029-05-09', 'furnished single room available in marion');


CREATE TABLE address(
                        AddressId SERIAL PRIMARY KEY,
                        FullAddress VARCHAR(255) NOT NULL,
                        Suburb VARCHAR(100) NOT NULL ,
                        State VARCHAR(3) NOT NULL ,
                        Postcode INTEGER NOT NULL ,
                        Country VARCHAR(50) NOT NULL
);

alter table address
alter column postcode type int;

select * from address;
