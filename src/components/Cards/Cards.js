import React from 'react'
import {Card,CardContent,Typography,Grid} from '@material-ui/core'
import CardStyles from './Cards.module.scss'
import CountUp from 'react-countup'
const Cards = ({data: {cases,active,recovered,deaths,updated},country}) => {
    if(!cases){
        return 'Loading...'
    }
    return (
        <div className={CardStyles.container}>
                <Typography gutterBottom variant="h4">{country==='' ?'Global':country}</Typography>
            <Grid container spacing={4} justify="center">
                <Grid item component={Card} xs={12} md={4} className={`${CardStyles.card} ${CardStyles.confirmed}`}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Confirmed</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={cases} duration={2.5} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">{'Updated '+new Date(updated).toLocaleString()}</Typography>
                        <Typography variant="body2">Number of confirmed cases</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={4} className={`${CardStyles.card} ${CardStyles.active}`}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Active</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={active} duration={2.5} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">{'Updated '+new Date(updated).toLocaleString()}</Typography>
                        <Typography variant="body2">Number of active cases</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={4} className={`${CardStyles.card} ${CardStyles.recovered}`}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5"> 
                            <CountUp start={0} end={recovered} duration={2.5} separator=","/>  
                        </Typography>
                        <Typography color="textSecondary">{'Updated '+new Date(updated).toLocaleString()}</Typography>
                        <Typography variant="body2">Number of recoveries</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={4} className={`${CardStyles.card} ${CardStyles.deaths}`}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={deaths} duration={2.5} separator=","/>  
                        </Typography>
                        <Typography color="textSecondary">{'Updated '+new Date(updated).toLocaleString()}</Typography>
                        <Typography variant="body2">Number of deaths</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards
