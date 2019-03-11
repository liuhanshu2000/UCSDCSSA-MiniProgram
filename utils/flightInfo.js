var restclient = require('restler');
var auth = require('./flightXMLAuth.json')

const fxml_url = 'http://flightxml.flightaware.com/json/FlightXML2/';
var username = auth.username;
var apiKey = auth.APIKey;

const getFlightInfo = (flightNumber, callback, err) => {
    restclient.get(fxml_url + 'FlightInfoEx', {
        username: username,
        password: apiKey,
        query: {ident:flightNumber,howMany: 1}
    }).on('success', function(result, response) {
        if(response.statusCode === 200){
            callback(result.FlightInfoExResult.flights)
        } else{
            err(404, "Specified flight number not found")
        }
    });
}

module.exports = {
    getFlightInfo: getFlightInfo
}
