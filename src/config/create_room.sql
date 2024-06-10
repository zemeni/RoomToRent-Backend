CREATE OR REPLACE FUNCTION add_property_with_rooms(
    p_email TEXT,
    p_fulladdress TEXT,
    p_suburb TEXT,
    p_state TEXT,
    p_postcode INT,
    p_country TEXT,
    p_rooms JSONB
)
RETURNS VOID AS $$
DECLARE
    room RECORD;
    v_ownerid INT;
    v_addressid INT;
    v_propertyid INT;
BEGIN

SELECT userid INTO v_ownerid
FROM users
WHERE email = p_email;

-- Insert address and get address ID
INSERT INTO address (fulladdress, suburb, state, postcode, country)
VALUES (p_fulladdress, p_suburb, p_state, p_postcode, p_country)
    RETURNING addressid INTO v_addressid;

-- Insert property and get property ID
INSERT INTO properties (ownerid, addressid, description, numberofrooms, numberofbathroom, numberofparking, price, priceperiod)
VALUES (v_ownerid, v_addressid, '', 0, 0, 0, 0, 'weekly')
    RETURNING propertyid INTO v_propertyid;

-- Loop through each room and insert
FOR room IN SELECT * FROM jsonb_to_recordset(p_rooms) AS r(
                                                           description TEXT,
                                                           furnished BOOLEAN,
                                                           roomtypeid INT,
                                                           price NUMERIC,
                                                           priceperiod TEXT,
                                                           availablefrom DATE,
                                                           availableto DATE
    )
    LOOP
            INSERT INTO rooms (propertyid, description, furnished, roomtypeid, price, priceperiod, availablefrom, availableto)
            VALUES (v_propertyid, room.description, room.furnished, room.roomtypeid, room.price, room.priceperiod, room.availablefrom, room.availableto);
END LOOP;
END;
$$ LANGUAGE plpgsql;
