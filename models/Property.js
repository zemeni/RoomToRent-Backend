// models/Property.js
class Property {
    constructor(ownerId, description, numberOfRooms, numberOfBathrooms, numberOfParkings, price, availableFrom, availableTo) {
        this.ownerid = ownerId;
        this.description = description;
        this.numberofrooms = numberOfRooms;
        this.numberofbathroom = numberOfBathrooms;
        this.numberofparking = numberOfParkings;
        this.price = price;
        this.availablefrom = availableFrom;
        this.availableto = availableTo;
    }
}

module.exports = Property;
