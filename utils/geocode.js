const request = require('postman-request')

const geoCode = (address, callback) => {
    let geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoiYXJqdW5zaW5naGEiLCJhIjoiY2xjejR4eXBxMDEzdjNvbzBzaGJhOXF3eCJ9.NZIixZcKyMHdpQv-pDnjlA&limit=1'
    request.get({url: geocodeurl, json: true},(error, response)=>{
        if(error){
            console.log("ERROR:", error)
            callback(error, null)
            return;
        }
        let data = {
            latitude: response.body.features[0]?.geometry.coordinates[1],
            longitude: response.body.features[0]?.geometry.coordinates[0],
            location: response.body.features[0]?.place_name
        }
        callback(null, data)
    });
}

module.exports = {
    geoCode
}