import React,{useState, useMemo, useRef} from 'react'
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from  '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    container:{
        width:'100%',
        // height:'9.9rem',
        color:'#212121',
        padding:'.8rem 0 .8rem 0',
    },
    inputArea:{
        backgroundColor:'#efefef',
        paddingTop:'.8rem',
        borderRadius:'.8rem .8rem 0 0',
    },
    
    label:{
        transform: 'scale(1,1.5) translate(0, 1.2rem)',
        transformOrigin: 'top left',
    },
    LabelText:{
        height:'2rem',
        width:'65%',
        padding:'0 1.6rem',
        color:'#8d8d8d',
        fontSize:'1.25rem',//size-6
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: '-0.0075em',
    },
    
    input:{
        width:'100%',
        height:'2.8rem',
        padding:'0 1.6rem',
        backgroundColor:'inherit', 
        border:'none',
        color:'#212121',
        outline: 'none',
        fontSize:'1.5rem',//size-5
        fontWeight: 400,
        lineHeight: 1.334,
        letterSpacing: '0em',
        "&::placeholder": {
            color: "#212121",
            fontSize:"1.2em",
            fontStyle: "italic",
            opacity:.5,
          }
    },
    // ActivationIndicator
    ActivationIndicator:{
        position:'relative',
        overflow:'hidden',
        width:'100%',
        height:'2px',
        backgroundColor:'#8aacc8',  
    },
    AIFocus:{
        width:'100%',
        height:'2px',
        backgroundColor:'#0069c0',
        position:'absolute',
        top:0,
        left:0,
    },
    AIBlur:{
        width:'100%',
        height:'2px',
        backgroundColor:'#8aacc8',       
    },
    HelperText:{
        display:'inline-block',
        height:'2.8rem',
        padding:'0 1.6rem',
        color:'#0069c0',
        fontSize:'1.25rem',//size-6
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: '-0.0075em',
        // border:"3px solid black"
    },
    errors:{
        display:'inline-block',
        height:'2.8rem',
        padding:'0 1.6rem',
        color: '#b0003a',
        fontSize:'1.25rem',//size-6
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: '-0.0075em',
    },
    
    
   
// 1. Container
// 2. Leading icon (optional)
// 3. Label text
// 4. Input text
// 5. Trailing icon (optional)
// 6. Activation indicator
// 7. Helper text (optional)
})) 

const Textfields = ({type, value,placeholder,label,helpers,setValue,errors }) => {
    const classes = useStyles()
    console.log('Textfields');
    const [isFocus, setIsFocus] = useState(false)
    const inputRef = useRef()
    console.log(helpers);
    console.log(errors);
    console.log(errors[0])
    errors.map(error=>
        // console.log(error)
        console.log(error.id)
    )
    // console.log(errors[0].id);
    return (
        <div className={classes.container}>
            <div className={classes.inputArea}>
                <div className={classes.label}  onClick={()=>inputRef.current.focus()}>
                    <CSSTransition in={isFocus || value ? true : false } timeout={250} classNames="LabelFocus">
                        <div className={classes.LabelText } onClick={()=>inputRef.current.focus()}>{label}</div>
                    </CSSTransition>
                </div>

                <div className={classes.inputWraper}>
                    <input  type={type}
                            value={value} 
                            onChange={(e) => setValue(e)}
                            placeholder={isFocus ?  placeholder : ""}
                            className={classes.input }
                            ref={inputRef} 
                            onFocus={()=>setIsFocus(true)}
                            onBlur={()=>setIsFocus(false)}
                    />
                </div>
                <div className={classes.ActivationIndicator}>
                    <CSSTransition in={!isFocus} timeout={250} classNames="AIFocusLeft">
                        <div className={classes.AIFocus}></div>
                    </CSSTransition>
                    <CSSTransition in={!isFocus} timeout={250} classNames="AIFocusRight">
                        <div className={classes.AIFocus}></div>
                    </CSSTransition>
                </div>
                
            </div>
            
            <div className={classes.HelperText }>{helpers}</div>
                {
                    errors.map(error=>
                        // console.log(error)
                        // console.log(error.id)
                        <div className={classes.errors }>
                            {error.msg}
                        </div>
                    )
                }
            
            {/* <div>
                {errors[0].msg}
            </div> */}
            {/* <div className={classes.HelperText }>
               {helpers.map(helper=> (
                   <div>{helper.msg}</div>
                   ))}
            </div> */}
        {/* <input  type="email" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="E-mail"
        /> */}
        </div>
    )
}

export default Textfields
