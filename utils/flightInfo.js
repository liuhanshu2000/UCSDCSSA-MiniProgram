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
          })
            // wx.request({
            //     url: fxml_url, 
            //     data: {
            //         ident:flightNumber, 
            //         howMany: 1
            //     },
            //     success({ data }){
            //         !!data.error ? () =>{
            //           resolve({error: "Error getting flight info"})
            //         } : () => {
            //           let { FlightInfoExResult: { flights } }= data;
            //           resolve(flights);
            //         }
            //     }, fail(err){
            //       //TODO: Reject on network error
            //         reject(err)
            //     }
            // })
        })
    }
}

