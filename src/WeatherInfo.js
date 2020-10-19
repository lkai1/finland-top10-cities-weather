import React, { useEffect, useState } from 'react'
import './weatherinfo.css'
import axios from 'axios'
const WeatherInfo = () => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    let datetime = new Date()
    const urlTime = `${datetime.getFullYear()}-${datetime.getMonth() + 1}-${datetime.getDate()}`
    const hours = () => {
        return datetime.getHours()
    }
    useEffect(() => {
        setDate(`${datetime.getDate()}.${datetime.getMonth() + 1}.${datetime.getFullYear()}`)
        setTime(datetime.getHours())

    }, [])
    const GetTemperature = ({ city }) => {
        let mounted = true
        const [temp, setTemp] = useState("")
        useEffect(() => {
            axios.get(`http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::timevaluepair&place=${city}&parameters=Temperature&starttime=${urlTime}T00:00:00Z&endtime=${urlTime}T23:59:59Z&`, {
                "Content-Type": "application/xml; charset=utf-8"
            }).then(response => {
                if (mounted) {
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
                            setTemp(`${rawTemp.split(".")[0]} °C`)
                        }
                    }
                }
            })
            return () => mounted = false;
        }, [])
        return (
            <p>{temp}</p>
        )
    }

    return (
        <div id="mainWeatherDiv">
            <div id="weatherWrapper">
                <div className="cityWeatherDiv">
                    <p className="cities">Helsinki</p>
                    <GetTemperature city={"Helsinki"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    <p className="cities">Espoo</p>
                    <GetTemperature city={"Espoo"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    <p className="cities">Tampere</p>
                    <GetTemperature city={"Tampere"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    <p className="cities">Vantaa</p>
                    <GetTemperature city={"Vantaa"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    <p className="cities">Oulu</p>
                    <GetTemperature city={"Oulu"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    <p className="cities">Turku</p>
                    <GetTemperature city={"Turku"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    <p className="cities">Jyväskylä</p>
                    <GetTemperature city={"Jyväskylä"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    <p className="cities">Lahti</p>
                    <GetTemperature city={"Lahti"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    <p className="cities">Kuopio</p>
                    <GetTemperature city={"Kuopio"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
                <div className="cityWeatherDiv">
                    <p className="cities">Pori</p>
                    <GetTemperature city={"Pori"} />
                    <p>{"Kello " + time}</p>
                    <p>{date}</p>
                </div>
            </div>
        </div>
    )
}
export default WeatherInfo