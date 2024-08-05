const axios = require('axios');

const getCoordinatesFromAddress = async (address) => {
    const apiKey = '';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng,
            };
        } else {
            console.error("Geocoding API error: ", response.data.status);
            return null;
        }
    } catch (error) {
        console.error("Geocoding API error: ", error);
        return null;
    }
};


const adjustCoordinatesForProperty = async (property, latitude, longitude, existingCount) => {
    console.log("before adjustment ", latitude, longitude, existingCount);
    const baseAdjustment = 0.0001; // Increased base adjustment value
    const spreadFactor = 0.00005 * existingCount; // Spread markers based on count

    const angle = (360 / (existingCount + 1)) * existingCount;
    const radian = angle * (Math.PI / 180);

    latitude += (baseAdjustment + spreadFactor) * Math.cos(radian);
    longitude += (baseAdjustment + spreadFactor) * Math.sin(radian);

    property.latitude = latitude;
    property.longitude = longitude;

    console.log("after adjustment ", latitude, longitude);
    return property;
};

module.exports = {
    getCoordinatesFromAddress,
    adjustCoordinatesForProperty
}