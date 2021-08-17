import React from 'react'

import HomeIcon from '@material-ui/icons/Home';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
// import CachedIcon from '@material-ui/icons/Cached';
import ShopIcon from '@material-ui/icons/Shop';
// import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom'

import { makeStyles } from  '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    wraper:{
        width:'100vw',
        height:'100vh',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        // marginTop:'5.6rem',
        // padding:'-1.6rem',
    },
    elementWraper:{
        width:'36rem',
        height:'4.8rem',
        border:'1px solid yellow',
        cursor:'pointer',
        textAlign:'center'
        
    },
    element:{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',
        width:'18rem',
        height:'4.8rem',
        cursor:'pointer',
    },
    
    icons:{
        width: '2.4rem',
        height: '2.4rem',
        color:'#212121',
        cursor:'pointer',
        marginRight:'1.6rem',
    }
}))

const MenuNavigationDrawer = ({isNavigationDrawerOpen,setIsNavigationDrawer}) => {
    const classes = useStyles()
    const history = useHistory()
    const handleClick = (path) => {
        history.push(path)
        setIsNavigationDrawer(false)
    }
    return (
        <div className={classes.wraper}>  
            <div className={classes.element} onClick={() => handleClick("/")}>
                <HomeIcon className={classes.icons} />
                    Home
            </div>
            <div className={classes.element} onClick={() => handleClick("/todo")}>
                <PlaylistAddCheckIcon className={classes.icons} />
                    Todo
            </div>
            <div className={classes.element} onClick={() => handleClick("/gallery")}>
                <PhotoLibraryIcon className={classes.icons} />
                        Gallery
            </div>
            <div className={classes.element} onClick={() => handleClick("/chat")}>
                <ChatBubbleOutlineIcon className={classes.icons} />
                        Chat
            </div>
            <div className={classes.element} onClick={() => handleClick("/shopping")}>
                <ShopIcon className={classes.icons} />
                        shopping
            </div>
           
        </div>
    )
}

export default MenuNavigationDrawer
