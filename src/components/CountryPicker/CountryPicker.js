import React, {useState, useEffect}from 'react'
import {NativeSelect,FormControl} from '@material-ui/core'
import CountryPickerStyles from './CountryPicker.module.scss'
import axios from 'axios'

const CountryPicker = ({handleCountryChange}) => {
    const [fetchedCountries,setFetchedCountries]=useState([])

    const fetchCountries = async ()=>{
        try{
            const {data} = await axios.get('https://disease.sh/v3/covid-19/countries')
            const mod = data.map((c)=>c.country)
            setFetchedCountries(mod)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchCountries()
    },[setFetchedCountries])
    return (
        <FormControl className={CountryPickerStyles.formControl}> 
            <NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
                <option value="global">Global</option>
                {fetchedCountries.map((country, i)=><option key={i} value = {country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
