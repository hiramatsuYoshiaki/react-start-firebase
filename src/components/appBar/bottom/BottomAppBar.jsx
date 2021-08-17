import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from  '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';


const useStyles = makeStyles((theme) =>({
    wraper:{
        display:'flex',
        justifyContent:'space-between',
        color:'#fff'
    },
    icons:{
        width: '2.4rem',
        height: '2.4rem',
        color:'#fff',
        cursor:'pointer',
    }
}))


const BottomAppBar = () => {
    const classes = useStyles()
    return (
        <div className={classes.wraper}>
            <Link to={"/serach"} >
                <SearchIcon className={classes.icons}  />
             </Link>
            <Link to={"/"} >
                <HomeIcon className={classes.icons}  />
             </Link>
            <Link to={"/setting"} >
                <SettingsIcon className={classes.icons}  />
             </Link>
        </div>
    )
}

export default BottomAppBar
