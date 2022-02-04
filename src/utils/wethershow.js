
const request = require('request')



const weatherShow = (lat, long, codeCall) => {
    const url = `http://api.weatherstack.com/current?access_key=234f4755ca58d2445b9b418398e4edc1&query=${lat},%20${long}`


    request({ url: url, json: true }, (err, res) => {
        if (err) {
            codeCall('check if ur connected to the internet, could not access the API.');
        } else if (res.body.err) {
            codeCall('check ur API link');
        } else {
            const data = res.body.current
            console.log(data);
            codeCall(undefined, data?.weather_descriptions[0] + '. It is currently ' + data?.temperature + ' degrees out.It feels like ' + data?.feelslike + ' degrees out. '+'Humidity is at '+ data?.humidity+'%. Chance of rain is '+data.precip+'.');
        }
    });
}

module.exports = weatherShow;