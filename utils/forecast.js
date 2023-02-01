const request = require('postman-request')

const getCurrentWeather = ({latitude, longitude}, callback)=>{
    let baseURL = 'http://api.weatherstack.com/current?access_key=57965ba540f97e64be06857042a1cb61&query='+latitude+','+longitude+'&units=m'
    request.get({url: baseURL, json: true},(error, response)=>{
        const data = response.body;
        error = error || data.error
        if(!error){
            callback(null, data.current)
        }else{
            callback(error, null)
        }
        
    })
}

module.exports = {
    getCurrentWeather
}