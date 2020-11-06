import React, { useEffect, useState } from 'react'
import './weatherinfo.css'
import axios from 'axios'
import warm from './warm.jpg'
import cold from './cold.jpg'
const WeatherInfo = () => {
    const [kaupunki, setKaupunki] = useState('')
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [temp, setTemp] = useState("")
    const [nimi, setNimi] = useState('')
    const [picture, setPicture] = useState('')
    let datetime = new Date()
    const urlTime = `${datetime.getFullYear()}-${datetime.getMonth() + 1}-${datetime.getDate()}`
    const hours = () => {
        return datetime.getHours()
    }
    useEffect(() => {
        setDate(`${datetime.getDate()}.${datetime.getMonth() + 1}.${datetime.getFullYear()}`)
        setTime(datetime.getHours())

    }, [])
    const getTemperature = (event) => {
        let isError = false
        event.preventDefault()
        axios.get(`http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::timevaluepair&place=${kaupunki}&parameters=Temperature&starttime=${urlTime}T00:00:00Z&endtime=${urlTime}T23:59:59Z&`, {
            "Content-Type": "application/xml; charset=utf-8"
        }).then(response => {
            console.log(urlTime)
            const parser = new DOMParser();
            const apiResponse = response.data
            const parsedData = parser.parseFromString(apiResponse, 'text/xml')
            if ([0, 1, 2, 3, 4, 5].includes(datetime.getHours())) {
                setTemp("Available after 6")
            } else {
                let rawTemp = (parsedData.getElementsByTagName("wml2:MeasurementTVP")[hours() - 1].childNodes[3].innerHTML)
                if (rawTemp.split(".")[0] === "-0") {
                    setTemp("0 °C")
                } else {
                    if (parseInt(rawTemp.split(".")[0]) < 7) {
                        setPicture(<img src={cold} />)
                    } else {
                        setPicture(<img src={warm} />)
                    }
                    setTemp(`${rawTemp.split(".")[0]} °C`)
                }
            }
        }).catch((error) => {
            console.log(error.message)
            isError = true
        }).finally(() => {
            if (!isError) {
                setNimi(kaupunki)
            }
        })

        isError = false
    }
    return (
        <div id="mainWeatherDiv">
            <form type="submit" onSubmit={getTemperature}>
                <input
                    type="text"
                    value={kaupunki}
                    onChange={({ target }) => setKaupunki(target.value)}
                />
                <br />
            </form>
            <div id="picture">{picture}</div>
            <div className="cityWeatherDiv">
                <p className="cities">{nimi}</p>
                {temp}
            </div>
        </div>
    )
}
export default WeatherInfo