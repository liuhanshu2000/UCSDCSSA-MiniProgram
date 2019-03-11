var auth = require('flightXMLAuth')
let username = auth.username;
let apiKey = auth.APIKey;
const fxml_url = `http://${username}:${apiKey}@flightxml.flightaware.com/json/FlightXML2/FlightInfoEx`;
module.exports = {
    getFlightInfo(flightNumber){
        return new Promise((resolve, reject) => {
            wx.request({
                url: fxml_url, 
                data: {
                    ident:flightNumber, 
                    howMany: 1
                },
                success({data: { FlightInfoExResult: { flights } }}){
                    resolve(flights)
                }, fail(err){
                    reject(err)
                }
            })
        })
    }
}

