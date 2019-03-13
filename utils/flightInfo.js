var auth = require('flightXMLAuth')
let app = getApp()
let username = auth.username;
let apiKey = auth.APIKey;
const fxml_url = `http://${username}:${apiKey}@flightxml.flightaware.com/json/FlightXML2/FlightInfoEx`;
module.exports = {
    getFlightInfo(flightNumber){
        return new Promise((resolve, reject) => {
          app.requestGet(fxml_url, {
            ident: flightNumber,
            howMany: 1
          }).then(res => {
            resolve(res)
          })
        })
    }
}

