import React from 'react'
import { useHistory, } from 'react-router-dom'
import TextFieldsIcon from '@material-ui/icons/TextFields';
import RepeatIcon from '@material-ui/icons/Repeat';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    list:{
        // border:'1px solid red',
        // padding:'1.6rem',
    },
    listButton:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        width:'100%',
        height:'4.6rem',
        cursor:'pointer',
        // border:'1px solid green',
    },
    icons:{
        width: '2.4rem',
        height: '2.4rem',
        color:'#000',
        cursor:'pointer',
    },
    iconSpace:{
        margin:'0 1.6rem 0 0'
    },
    line:{
        width:'100%',
        height:'2px',
        backgroundColor:'#212121',
        margin:'.8rem 0',
    }
  }));

const Backdrop = ({isBackdropOpen, setIsBackdropOpen}) => {
    const classes = useStyles()
    const history = useHistory();
    return (
        <div className="f-backdrop">
            <h5>Develop </h5>
            <div className={classes.line}></div>
            <nav className={classes.list}>
                <div className={classes.listButton} onClick={()=>history.push('/fonts')}>
                    <div>
                        <TextFieldsIcon className={classes.icons + " " + classes.iconSpace} />
                    </div>
                    <h5>Fonts</h5>
                </div> 
                <div className={classes.listButton}  onClick={()=>history.push('/transitionPages')}>
                    <RepeatIcon className={classes.icons + " " + classes.iconSpace} />
                    <h5>Transitions</h5>
                </div>
            </nav>
        </div> 
    )
}

export default Backdrop


