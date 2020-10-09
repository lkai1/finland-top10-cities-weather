import React, { useEffect, useState } from 'react'
import './weatherinfo.css'
import axios from 'axios'
const WeatherInfo = () => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    let datetime = new Date()
    const hours = () => {
        return datetime.getHours()
    }
    useEffect(() => {
        setDate(`${datetime.getDate()}.${datetime.getMonth() + 1}.${datetime.getFullYear()}`)
        setTime(datetime.getHours())
    }, [])
    const GetTemperature = ({ city }) => {
        const [temp, setTemp] = useState("")
        useEffect(() => {
            console.log("hi")
            axios.get(`http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::timevaluepair&place=${city}&parameters=Temperature&starttime=2020-10-9T00:00:00Z&endtime=2020-10-9T23:59:59Z&`, {
                "Content-Type": "application/xml; charset=utf-8"
            }).then(response => {
                const parser = new DOMParser();
                const apiResponse = response.data
                const parsedData = parser.parseFromString(apiResponse, 'text/xml')
                let rawTemp = (parsedData.getElementsByTagName("wml2:MeasurementTVP")[hours() - 1].childNodes[3].innerHTML)
                setTemp(rawTemp.split("."))
            })
        }, [])
        return (
            <p>{temp[0] + " °C"}</p>
        )
    }
    return (
        <div id="mainWeatherDiv">
            <div id="weatherWrapper">
                <div className="cityWeatherDiv">
                    Helsinki
                    <GetTemperature city={"Helsinki"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    Espoo
                    <GetTemperature city={"Espoo"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    Tampere
                    <GetTemperature city={"Tampere"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    Vantaa
                    <GetTemperature city={"Vantaa"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    Oulu
                    <GetTemperature city={"Oulu"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    Turku
                    <GetTemperature city={"Turku"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    Jyväskylä
                    <GetTemperature city={"Jyväskylä"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    Lahti
                    <GetTemperature city={"Lahti"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    Kuopio
                    <GetTemperature city={"Kuopio"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    Pori
                    <GetTemperature city={"Pori"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
            </div>
        </div>
    )
}
export default WeatherInfo