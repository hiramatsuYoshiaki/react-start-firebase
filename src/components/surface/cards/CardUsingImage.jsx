import React from 'react'
import { makeStyles } from  '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    card:{
        width:'100%',
        // height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        paddingBottom:'.8rem'
    },
    img:{
        verticalAlign:'bottom',
    },
    title:{
        color:'#64b5f6',
        // border:'1px solid red',
        //material design guid 7.2rem
        // height:'7.2rem',

    },
    subTitle:{
        color:'#2286c3',
        // border:'1px solid red',
        //material design guid 2.8rem
        // height:'2.8rem',
    },
})) 
const CardUsingImage = ({img, title,titleDisplay,subTitle, subTitleDisplay, width,height,maxHeight,objectFit,}) => {
    
    const classes = useStyles()
    const imgStyle = {
        width:width,
        height:height,
        maxHeight:maxHeight,
        objectFit:objectFit
    }
    const titleStyle={
        display: titleDisplay
    }
    const subTitleStyle={
        display: subTitleDisplay
    }
    return (
        <div className={classes.card}>
            <img className={classes.img} 
                 src={img} 
                 style={imgStyle}
                 alt="user avater" />
            <h1 className={classes.title} style={titleStyle}>{title}</h1>
            <h5 className={classes.subTitle} style={subTitleStyle}>{subTitle}</h5>
        </div>
    )
}

export default CardUsingImage 
