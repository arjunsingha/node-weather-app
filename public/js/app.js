console.log('Cliend side js file')

const getWeather = async (address)=>{
    let response = await fetch('http://localhost:3000/weather?address='+address);           //api for the get request
    return await response.json();
    
}
const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit',async (event)=>{
    event.preventDefault()
    document.getElementById('forecastLoading').hidden = false;
    const locationInput = weatherForm.querySelector('input');
    let forecast = await getWeather(locationInput.value)
    console.log(forecast)
    if(!forecast.error){
        document.getElementById('forecastLoading').hidden = true;
        document.getElementById('forecastLocation').innerHTML = forecast.location
        document.getElementById('forecastDetails').innerHTML = forecast.forecast
        document.getElementById('forecastError').innerHTML = '';
    }else{
        document.getElementById('forecastLoading').hidden = true;
        document.getElementById('forecastLocation').innerHTML = ''
        document.getElementById('forecastDetails').innerHTML = ''
        document.getElementById('forecastError').innerHTML = forecast.error.info || "Unexpected error!! Please try again";
    }
})