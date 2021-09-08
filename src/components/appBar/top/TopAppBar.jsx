import React,{useContext} from 'react'
import { UserContext } from '../../../UserContext' 

import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TitleIcon from '@material-ui/icons/Title';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { makeStyles } from  '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    wraper:{
        display:'flex',
        justifyContent:'space-between',
        color:'#fff'
    },
    brangLogo:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        border:'dotted 1px grey',
        cursor:'pointer',
        color:'#fff',
    },
    icons:{
        width: '2.4rem',
        height: '2.4rem',
        color:'#fff',
        cursor:'pointer',
    },
    iconsSpace:{
        marginLeft:'1.6rem',
    }
}))

const TopAppBar = ({ isNavigationDrawerOpen, 
                     setIsNavigationDrawer, 
                     isBackdropOpen,
                     setIsBackdropOpen
                    }) => {
    const classes = useStyles()
    const {user, setUser} = useContext(UserContext)
    return (
        <div className={classes.wraper}>
            <MenuIcon 
                className={classes.icons}  
                onClick={()=> setIsNavigationDrawer(true)} 
            />
            <div >
                <Link to={"/"} >
                    <div className={classes.brangLogo}>
                    < TitleIcon className={classes.icons}  />
                    Brand Title
                    </div>
                </Link>
            </div>
            <div>
                {user === null 
                ? 
                    <Link to={"/login"} > 
                        <PersonOutlineIcon className={classes.icons + " " + classes.iconsSpace}  />
                    </Link>
                : 
                    <Link to={"/logout"} > 
                        <PersonIcon className={classes.icons + " " + classes.iconsSpace}  />
                    </Link>
                }
                <Link to={"/cart"} >
                    <ShoppingBasketIcon className={classes.icons  + " " + classes.iconsSpace}  
                    />
                </Link>
                <MoreVertIcon className={classes.icons  + " " + classes.iconsSpace}  
                                onClick={()=> setIsBackdropOpen(true)}
                />
            </div>
           
        </div>
    )
}

export default TopAppBar
