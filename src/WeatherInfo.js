import React, { useEffect, useState } from 'react'
import './weatherinfo.css'
import axios from 'axios'
import raining from './raining.png'
import sunny from './sunny.png'
import snowing from './snowing.png'
import cloudy from './cloudy.png'
import kevat from './kevat.jpg'
import kesa from './kesa.jpg'
import syksy from './syksy.jpg'
import talvi from './talvi.jpg'

const WeatherInfo = () => {
    const [kaupunki, setKaupunki] = useState('')
    const [temp, setTemp] = useState('')
    const [knimi, setKnimi] = useState('')
    const [weatherImg, setWeatherImg] = useState('')
    let datetime = new Date()
    const timeOfTheYearBackground = () => {
        let backgroundPic = ''
        if (datetime.getMonth() + 1 > 2 && datetime.getMonth() + 1 < 6) {
            backgroundPic = kevat
        } else if (datetime.getMonth() + 1 > 5 && datetime.getMonth() + 1 < 9) {
            backgroundPic = kesa
        } else if (datetime.getMonth() + 1 > 8 && datetime.getMonth() + 1 < 12) {
            backgroundPic = syksy
        } else {
            backgroundPic = talvi
        }
        return backgroundPic
    }
    const urlTime = `${datetime.getFullYear()}-${datetime.getMonth() + 1}-${datetime.getDate()}`
    const hours = () => {
        return datetime.getHours()
    }
    const getTemperature = (event) => {

        let isError = false
        event.preventDefault()
        axios.get(`http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::timevaluepair&place=${kaupunki}&parameters=Temperature&starttime=${urlTime}T00:00:00Z&endtime=${urlTime}T23:59:59Z`, {
            "Content-Type": "application/xml; charset=utf-8"
        }).then(response => {
            console.log(urlTime)
            const parser = new DOMParser();
            const apiResponse = response.data
            const parsedData = parser.parseFromString(apiResponse, 'text/xml')
            if ([0, 1, 2, 3, 4, 5].includes(datetime.getHours())) {
                setTemp("Lämpötila on näkyvissä kello 6 jälkeen.")
            } else {
                let rawTemp = (parsedData.getElementsByTagName("wml2:MeasurementTVP")[hours() - 1].childNodes[3].innerHTML)
                if (rawTemp.split(".")[0] === "-0") {
                    setTemp("0 °C")
                } else {
                    setTemp(`${rawTemp.split(".")[0]} °C`)
                }
            }
        }).catch((error) => {
            console.log(error.message)
            isError = true
        }).finally(() => {
            if (!isError) {
                const firstLetter = kaupunki.charAt(0).toUpperCase()
                const restOfLetters = kaupunki.slice(1, kaupunki.length)
                setKnimi(firstLetter + restOfLetters)
            }
        })
        if (!isError) {
            axios.get(`http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::timevaluepair&place=${kaupunki}&parameters=WeatherSymbol3&starttime=${urlTime}T00:00:00Z&endtime=${urlTime}T23:59:59Z`, {
                "Content-Type": "application/xml; charset=utf-8"
            }).then(response => {
                const parser = new DOMParser();
                const apiResponse = response.data
                const parsedData = parser.parseFromString(apiResponse, 'text/xml')
                const rawWeatherStyle = (parsedData.getElementsByTagName("wml2:MeasurementTVP")[hours() - 1].childNodes[3].innerHTML)
                const weatherStyle = parseInt(rawWeatherStyle.split('.')[0])
                if (weatherStyle === 41 || weatherStyle === 42 || weatherStyle === 43 || weatherStyle === 51 || weatherStyle === 52 || weatherStyle === 53) {
                    setWeatherImg(<img className="picture" src={snowing} />)
                } else if (weatherStyle === 21 || weatherStyle === 22 || weatherStyle === 23 || weatherStyle === 31 || weatherStyle === 32 || weatherStyle === 33 || weatherStyle === 71 || weatherStyle === 72 || weatherStyle === 73 || weatherStyle === 81 || weatherStyle === 82 || weatherStyle === 83) {
                    setWeatherImg(<img className="picture" src={raining} />)
                } else if (weatherStyle === 2 || weatherStyle === 3) {
                    console.log("here")
                    setWeatherImg(<img className="picture" src={cloudy} />)
                } else {
                    setWeatherImg(<img className="picture" src={sunny} />)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        isError = false
    }
    return (
        <div style={{ backgroundImage: `url(${timeOfTheYearBackground()})`, backgroundSize: "cover", height: "100vh", width: "100wh" }}>
            <div id="mainWeatherDiv">
                <form type="submit" onSubmit={getTemperature} id="inputForm">
                    <input
                        type="text"
                        value={kaupunki}
                        onChange={({ target }) => setKaupunki(target.value)}
                    />
                    <br />
                </form>
                {knimi === '' ? null :
                    <div id="cityWeatherDiv">
                        <p id="city">{knimi}</p>
                        <p id="temp">{temp}</p>
                    </div>
                }
                <div>{weatherImg}</div>
            </div>
        </div>
    )
}
export default WeatherInfo