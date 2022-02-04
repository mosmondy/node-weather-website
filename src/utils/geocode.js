const request = require('request');


const geoLocation = (location, geoCall) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoia2FpMTciLCJhIjoiY2t5Y2xtam9jMHFpaDJub2QzaGxrZWI0ciJ9.kH-LBJEswkPh8yPfNFHjhw&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            geoCall('unable to connect to location services')
        } else if (body.features.length === 0) {
            geoCall('enter a valid search location dude');
        } else {
            const geoData = body.features[0].center;
            const location = body.features[0].place_name
            const latitude = geoData[0];
            const longitude = geoData[1];
            const locationObj = { location, latitude, longitude };
            geoCall(undefined, locationObj)

        }

    })
}

module.exports = geoLocation 
