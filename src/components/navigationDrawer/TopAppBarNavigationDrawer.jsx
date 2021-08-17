import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from  '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    header:{
        position:'fixed',
        width:'100%',
        height:'5.6rem',
        top:0,
        left:0,
        padding:'1.6rem',
        backgroundColor:'#0069c0',
    },
    wraper:{
        display:'flex',
        justifyContent:'flex-end',
        
    },
    icons:{
        width: '2.4rem',
        height: '2.4rem',
        color:'#fff',
        cursor:'pointer',
    }
}))

const TopAppBarNavigationDrawer = ({isNavigationDrawerOpen,setIsNavigationDrawer}) => {
    const classes = useStyles()
    return (
        <div className={classes.header}>
            <div className={classes.wraper}>
                <CloseIcon 
                    className={classes.icons} 
                    onClick={() => setIsNavigationDrawer(false)}/>
            </div>
        </div>
    )
}

export default TopAppBarNavigationDrawer
