import React from 'react'
import { makeStyles } from  '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    button:{
        minWidth:'6.4rem',
        height:'3.6rem',
        padding:'0 1.6rem',
        marginBottom:'1.6rem',
        // border:'1px solid #002171',
        // backgroundColor:'#002171',
        // color:'#fff',
        borderRadius:"6px",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        cursor:'pointer',
    },
    // icons:{
    //     width: '2.4rem',
    //     height: '2.4rem',
    //     color:'#fff',
    //     cursor:'pointer',
    // },
    // iconsSpace:{
    //     marginLeft:'1.6rem',
    // }
})) 

const Btn = ({text, variant, color, href, type}) => {
    const classes = useStyles()
    // const style = {}
    const setValiant = () => {
        const type = variant
        let valiantStyle = {}
        switch(type) {
            case "text":
                valiantStyle = {
                    border:'none',
                    backgroundColor:'none',
                    color:'#212121',
                }
                break
            case "outline":
                valiantStyle = {
                    border:'1px solid #212121',
                    backgroundColor:'#ffffff',
                    color:'#212121',
                }
                break
            case "contained":
                valiantStyle = {
                    border:'none',
                    backgroundColor:'#0069c0',
                    color:'#fff',
                }
                break
            default:
        }
        return valiantStyle
    }
    // const style = setValiant()
    
    return (
        // <input type="button" className={classes.button} style={setValiant()}>
        //     {text}
        // </input >
        // <div type="button" className={classes.button} style={setValiant()}>
        //     {text}
        // </div >
        <input type={type} value={text} className={classes.button} style={setValiant()}/>
        
    )
}

export default Btn
