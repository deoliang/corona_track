import React,{useState,useEffect} from 'react'
import axios from 'axios'
//import {fetchDailyData} from '../../api'
import {Line, Bar} from 'react-chartjs-2'
import ChartStyles from './Chart.module.scss'
const Chart = ({data:{cases,active,recovered,deaths},country}) => {
    const [dailyData,setDailyData] = useState({})
    const [flag,setFlag] = useState(true)
    
    const fetchDailyData = async(country)=>{
        setFlag(true)
        let build = 'all'
        if(country){
            build = country
        }
        try{
            const {data} = await axios.get(`https://disease.sh/v3/covid-19/historical/${build}?lastdays=all`)
            if(country){
                setDailyData({
                    confirmed:Object.values(data.timeline.cases),
                    recovered:Object.values(data.timeline.recovered),
                    deaths:Object.values(data.timeline.deaths),
                    date: Object.keys(data.timeline.cases)
                })
            }else{
                setDailyData({
                    confirmed:Object.values(data.cases),
                    recovered:Object.values(data.recovered),
                    deaths:Object.values(data.deaths),
                    date: Object.keys(data.cases)
                })
            }
        }catch(error){
            setFlag(false)
        }
    }

    useEffect(()=>{
        fetchDailyData(country)
    },[country])
   
    const lineChart = (
        dailyData.length!==0
        ? (<Line 
        data = {{
            labels: dailyData.date,
            datasets: [{
                data: dailyData.confirmed,
                label: 'Confirmed',
                borderColor: '#87CEEB',
                fill: true,
            }
            ,{
                data: dailyData.deaths,
                label: 'Deaths',
                borderColor: '#DC143C',
                fill: true,
            },{
                data: dailyData.recovered,
                label: 'Recovered',
                borderColor: '#7FFF00',
                fill: true,
            }]
        }}
        />) : null
    )
   
    const barChart = (
        cases
        ? (
            <Bar 
                data={{
                    labels:['Confirmed','Active','Recovered','Deaths'],
                    datasets:[{
                        label:'People',
                        backgroundColor:[
                            '#87CEEB',
                            '#FFA500',
                            '#7FFF00',
                            '#DC143C'
                        ],
                        data:[cases,active,recovered,deaths]
                    }]
                }}
                options={{
                    legend:{display:false},
                    title:{display:true,text:`Current state in ${country}`}
                }}
            />
        ) : null
    )

    return (
        <div className={ChartStyles.container}>
            {flag && lineChart}
            {country && barChart }
        </div>
    )
}

export default Chart
