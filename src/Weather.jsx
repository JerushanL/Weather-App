import React, { useState } from 'react'
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import humidity_icon from "./Image 2/humidity2.png"
import wind_icon from "./Image 2/wind.png"
import brokenCloudsD from "./Image 2/brokenCloudsD.png"
import brokenCloudsn from "./Image 2/brokenCloudsN.png"
import clearD from "./Image 2/clearD.png"
import clearN from "./Image 2/ClearN.png"
import fewCloudsD from "./Image 2/FewcloudsD.png"
import fewCloudsN from "./Image 2/FewcloudsN.png"
import mistD from "./Image 2/mistD.png"
import mistN from "./Image 2/mistN.png"
import rainD from "./Image 2/rainD.png"
import rainN from "./Image 2/rainN.png"
import scattredD from "./Image 2/scatteredCloudsD.png"
import scattredN from "./Image 2/scatteredCloudsN.png"
import showerD from "./Image 2/showerRainD.png"
import showerN from "./Image 2/showerRainN.png"
import snowD from "./Image 2/snowD.png"
import snowN from "./Image 2/snowN.png"
import thunderD from "./Image 2/thundrstormD.png"
import thundern from "./Image 2/thunderstormN.png"

import axios from 'axios'

const Weather = () => {

    const[city,setCity]= useState("Laval")
    const[weather,setWeather] = useState(false)
    const allIcons ={
        "01d": clearD,
        "01n": clearN,
        "02d": fewCloudsD,
        "02n": fewCloudsN,
        "03d": scattredD,
        "03n": scattredN,
        "04d": brokenCloudsD,
        "04n": brokenCloudsn,
        "09d": showerD,
        "09n": showerN,
        "10d": rainD,
        "10n": rainN,
        "11d": thunderD,
        "11n": thundern,
        "13d": snowD,
        "13n": snowN,
        "50d": mistD,
        "50n": mistN

    }
    const capitalizeFirsrLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    function inputCity(event){
        setCity(event.target.value)
    }

    function getWeather(event) {
        if(event.type === "click" || (event.type === "keydown" && event.key === "Enter")){
            if (city === ""){
                alert("Please Enter a City Name.")
            }
            var weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=94c40770116e29c4dc537b2b2522c514`)
            weatherData.then((result) => {
                console.log(result.data)
                const weatherIcon = allIcons[result.data.weather[0].icon]
                
               
                setWeather({
                    humidity:  result.data.main.humidity,
                    wind :  result.data.wind.speed,
                    location: result.data.name,
                    temperature: Math.floor(result.data.main.temp),
                    feels_like: Math.floor(result.data.main.feels_like),
                    icon: weatherIcon,
                    description: capitalizeFirsrLetter(result.data.weather[0].description)
    
                })
    
                console.log(weather)
            }).catch((err) => {
                console.log(err)
                setWeather(false)
                alert("Please Enter Correct City Name!")
            })
        }

    }
    // #227bf4,#ebf5bf  bg-gradient-to-t from-[#ebf5bf] to-[#227bf4]
    return (
        <div className="p-10  bg-gradient-to-br from-[#f7e6cf] to-[#fdb569] border rounded-md  border-none" > 

            <div className="flex items-center ">
                <input type="text" placeholder='Search' className="border border-none pl-3 outline-none rounded-[200px] p-2" onKeyDown={getWeather} onChange={inputCity} />
                <button onClick={getWeather}><FontAwesomeIcon className="text-gray-600 ml-3 p-3 bg-white rounded-full " icon={faMagnifyingGlass}></FontAwesomeIcon></button>
            </div>
            {weather ? <div>
                <div className="text-center">
                <img src={weather.icon} alt="" className="w-32 mx-auto my-3" />
                <p className="text-2xl text-orange-800 -mt-6 mb-4">{weather.description}</p>
                <p className="text-6xl text-orange-500 ">{weather.temperature}°C</p>
                <p className="text-2xl text-orange-800
                 my-3">Feels Like {weather.feels_like}°C</p>
                
                <p className="text-orange-800 text-5xl font-semibold mt-2">{weather.location}</p>

                <div className="flex items-center justify-between gap-12 mt-12">
                    <div className="flex items-center gap-2">
                        <img src={humidity_icon} alt="" className="w-8" />
                        <div>
                            <p className="text-blue-500">{weather.humidity}%</p>
                            <p className="text-blue-500">Humidity</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={wind_icon}   alt="" className="w-8" />
                        <div>
                            <p className="text-blue-500">{weather.wind} Km/h</p>
                            <p className="text-blue-400">Wind Speed</p>
                        </div>

                    </div>
                </div>

            </div>
            </div> : <div></div> }
            

        </div>
    )
}

export default Weather