class Property {
    constructor(ownerId, addressId, propertyTypeId, description, numberOfRooms, numberOfBathroom, numberOfParking, price, pricePeriod, availableFrom, availableTo) {
        this.ownerId = ownerId;
        this.addressId = addressId;
        this.propertyTypeId = propertyTypeId;
        this.description = description;
        this.numberOfRooms = numberOfRooms;
        this.numberOfBathroom = numberOfBathroom;
        this.numberOfParking = numberOfParking;
        this.price = price;
        this.pricePeriod = pricePeriod;
        this.availableFrom = availableFrom;
        this.availableTo = availableTo;
    }
}

module.exports = Property;
