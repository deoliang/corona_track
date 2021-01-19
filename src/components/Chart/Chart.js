import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { specialCases } from '../../helpers'
import { Line, Bar } from 'react-chartjs-2'
import ChartStyles from './Chart.module.scss'
const Chart = ({ data: { cases, active, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState({})
    const [vaxData, setVaxData] = useState({})
    const [flag, setFlag] = useState(true)
    const[vaxFlag,setVaxFlag]=useState(true)

    const fetchDailyData = async (country) => {
        setFlag(true)
        setVaxFlag(true)
        let build = 'all'
        let vaxBuild = ''

        if (country) {
            country = specialCases(country)
            build = country
            vaxBuild = `/countries/${country}`
        }
        try {
            const { data } = await axios.get(`https://disease.sh/v3/covid-19/historical/${build}?lastdays=all`)

            if (country) {
                setDailyData({
                    confirmed: Object.values(data.timeline.cases),
                    recovered: Object.values(data.timeline.recovered),
                    deaths: Object.values(data.timeline.deaths),
                    date: Object.keys(data.timeline.cases)
                })
            } else {
                setDailyData({
                    confirmed: Object.values(data.cases),
                    recovered: Object.values(data.recovered),
                    deaths: Object.values(data.deaths),
                    date: Object.keys(data.cases)
                })
            }
        } catch (error) {
            setFlag(false)
        }
        try {
            const { data: vax } = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage${vaxBuild}?lastdays=all`)
            
            if(country){
                setVaxData({
                    date: Object.keys(vax.timeline),
                    doses: Object.values(vax.timeline)
                })
            }else{
                setVaxData({
                    date: Object.keys(vax),
                    doses: Object.values(vax)
                })
            }
        } catch (error) {
            setVaxFlag(false)
        }
    }

    useEffect(() => {
        fetchDailyData(country)
    }, [country])

    const lineChart = (
        dailyData.length !== 0
            ? (<Line
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: (value) => { if (value % 1 === 0) { return value; } }
                            }
                        }],
                    }
                }}
                data={{
                    labels: dailyData.date,
                    datasets: [{
                        data: dailyData.confirmed,
                        label: 'Confirmed',
                        borderColor: '#87CEEB',
                        fill: true,
                    }
                        , {
                        data: dailyData.deaths,
                        label: 'Deaths',
                        borderColor: '#DC143C',
                        fill: true,
                    }, {
                        data: dailyData.recovered,
                        label: 'Recovered',
                        borderColor: '#7FFF00',
                        fill: true,
                    }]
                }}
            />) : null
    )

    const vaxChart = (
        vaxData.length !== 0
            ? (<Line
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: (value) => { if (value % 1 === 0) { return value; } }
                            }
                        }],
                    }
                }}
                data={{
                    labels:vaxData.date,
                    datasets:[{
                        data:vaxData.doses,
                        label: 'Vaccination Doses',
                        borderColor: '#87CEEB',
                    }]
                }}
            />) : null
    )

    const barChart = (
        cases
            ? (
                <Bar
                    data={{
                        labels: ['Confirmed', 'Active', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                '#87CEEB',
                                '#FFA500',
                                '#7FFF00',
                                '#DC143C'
                            ],
                            data: [cases, active, recovered, deaths]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    callback: function (value) { if (value % 1 === 0) { return value; } }
                                }
                            }]
                        }
                    }}
                />
            ) : null
    )

    return (
        <div className={ChartStyles.container}>
            {flag && lineChart}
            {country && barChart}
            {vaxFlag && vaxChart}
        </div>
    )
}

export default Chart
