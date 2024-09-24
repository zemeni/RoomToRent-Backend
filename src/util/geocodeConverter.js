const axios = require('axios');

const getCoordinatesFromAddress = async (address) => {
    const apiKey = 'AIzaSyCUD4zx3oDyTCAISXtANyF-j8s2ayPHfSs';
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


const getPlaceDetails = async (address) => {
    const apiKey = 'AIzaSyCUD4zx3oDyTCAISXtANyF-j8s2ayPHfSs';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    // Mapping of full state names to abbreviations
    const stateAbbreviations = {
        'New South Wales': 'NSW',
        'Victoria': 'VIC',
        'Queensland': 'QLD',
        'South Australia': 'SA',
        'Western Australia': 'WA',
        'Tasmania': 'TAS',
        'Northern Territory': 'NT',
        'Australian Capital Territory': 'ACT'
    };

    try {
        const response = await axios.get(url);
        if (response.data.results.length === 0) {
            throw new Error('No results found for the given address');
        }

        const addressComponents = response.data.results[0].address_components;

        let state = 'AIzaSyCUD4zx3oDyTCAISXtANyF-j8s2ayPHfSs';
        let postcode = '';

        addressComponents.forEach(component => {
            if (component.types.includes('administrative_area_level_1')) {
                const fullStateName = component.long_name;
                state = stateAbbreviations[fullStateName] || fullStateName;
            }
            if (component.types.includes('postal_code')) {
                postcode = component.long_name;
            }
        });

        return { state, postcode };
    } catch (error) {
        console.error('Error fetching geocode details:', error);
        return null;
    }
}

module.exports = {
    getCoordinatesFromAddress,
    adjustCoordinatesForProperty,
    getPlaceDetails
}
