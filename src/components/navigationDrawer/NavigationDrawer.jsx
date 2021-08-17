import React from 'react'
import {
    TopAppBarNavigationDrawer,
    MenuNavigationDrawer 
    } from './index'
import { makeStyles } from  '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    wraper:{
        width:'100%',
        height:'100%',
        // display:'flex',
        // alignItems:'center',
        // flexDirection:'column',
        // justifyContent:'center',
        // marginTop:'5.6rem',
        // paddingTop:'1.6rem',
        border:'1px solid green'
    },
}))



const NavigationDrawer = ({isNavigationDrawerOpen,setIsNavigationDrawer}) => {
    const classes = useStyles()
    return (
        <div className={classes.wraper}>
            <div>
                <TopAppBarNavigationDrawer 
                    isNavigationDrawerOpen={isNavigationDrawerOpen} 
                    setIsNavigationDrawer={setIsNavigationDrawer}/>
            </div>
            <div>
                <MenuNavigationDrawer 
                    isNavigationDrawerOpen={isNavigationDrawerOpen} 
                    setIsNavigationDrawer={setIsNavigationDrawer}/>
            </div>
            navigation drawe
        </div>
    )
}

export default NavigationDrawer
