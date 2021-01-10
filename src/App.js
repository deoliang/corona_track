import React, {useEffect, useState} from 'react'
import { Cards, Chart, CountryPicker } from './components'
import AppStyles from './App.module.scss'
import axios from 'axios'
const url = 'https://disease.sh/v3/covid-19/all'
const App = () => {
    const [data,setData] = useState({})
    const [country,setCountry]=useState('')
    const fetchData = async(country)=>{
        let buildUrl =  url
        if(country){
            if(country==='global'){
                buildUrl = url
                setCountry('')
            }else{
                buildUrl = `https://disease.sh/v3/covid-19/countries/${country}`
                setCountry(country)
            }        
        }
        try{
            console.log(buildUrl)
            const {data :{cases,active,recovered,deaths,updated}} = await axios.get(buildUrl) 
         
            setData({cases,active,recovered,deaths,updated})
        }catch(error){
            console.log(error)
        }
    }

    const handleCountryChange = async (country)=>{
        fetchData(country)
    }

    useEffect( ()=>{
       fetchData()
    },[])

    return (
        <div className={AppStyles.container}>
            <h2 className={AppStyles.title}>Covid-19 Tracker</h2>
            <Cards data={data}/>
            <CountryPicker handleCountryChange={handleCountryChange} />
            <Chart data={data} country={country}/>
            <p>Data retrieved from disease.sh</p>
        </div>
    )
}

export default App




