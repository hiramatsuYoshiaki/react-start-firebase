// import React, {useState, useContext, useReducer, } from 'react'
import React, {useState, useContext, useCallback} from 'react'
import { UserContext } from '../../UserContext' 
import { Redirect } from 'react-router-dom';
import { LoginData } from '../../util/LoginData'
import { useHistory, } from 'react-router-dom'
import { CardUsignImage } from '../../components/surface/cards';
import loginImage from '../../assets/img/png/undraw_profile_pic_ic5t.png'
import {Btn} from '../../components/inputs/button/index'
import {TextFields } from '../../components/inputs/textFields/index'

import { makeStyles } from  '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    header:{
        width:'100%',
    },
    content:{
        width:'100%',
        // height:'30rem',
        backgroundColor:'#44ccff',
        padding:'.8rem  1.8rem',
        // display:'flex',
        // alignItems:'center',
        // flexDirection:'column',
        // justifyContent:'flex-start',
    },
    createAccount:{
        clor:'#0069c0'
    },
})) 
const Login = () => {
    console.log('login');
    const classes = useStyles()
    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const inputSetEmail = useCallback((e) => setEmail(e.target.value),[setEmail])
    const inputSetPassword = useCallback((e) => setPassword(e.target.value),[setPassword])

    // const [errors,setErrors] = useState({email:[{mas:""}],password:[{mas:""}]})
    // const [errors,setErrors] = useState({email:"",password:""})
    const [emailMsg,setEmailMsg] = useState([
        {id:0,msg:"メールアドレスを入力してください。＊必須"},
        {id:1,msg:"メールアドレスは必須です。"},
        {id:2,msg:"メールアドレスは２０文字以内です。"}
    ])
    console.log('emailMsg',emailMsg);
    // const [errorMessages, setErrors] = useState([])
    const validations = () => {
        console.log('validations');
        // setErrors(prevErrors=> {...prevErrors,})
        // setErrors(...errors,{name:'password', message:'パスワードは必須です。'})
        // setErrors(prevErrors=> )
        // console.log(...errors)
        // console.log('validation errors', errors)
        // setErrors(prevErrors => ({
        //     ...prevErrors,
        //     email:"メールあどれすは必須",
        //     passwors:"パスワードは必須",
        // }))
        // console.log(email.length);
        
       
        if(email === "" || email.length === 0 || email === null){
            setEmailMsg(prevEmeilMsg => ([
                ...prevEmeilMsg,
                {id:1,msg:"メールアドレスは必須です。"},
                ])
            )
        }
        if(email.length > 20 ){
            setEmailMsg(prevEmeilMsg => ([
                ...prevEmeilMsg,
                {id:2,msg:"メールアドレスは２０文字以内です。"}
                ])
            )
        }
        
        
       
       
        // const [{count1,count2}, setCountMulti] = useState({count1:10, count2:20})
        // (currentState => ({
        //     ...currentState, 
        //     cosetCountMultiunt1 : currentState.count1 + 1, 
        //     count2 : currentState.count2 + 1,
        //   })
        // console.log(errors);
        
        // return [emailMsg]
    }

    // const inputEmail = useCallback((e)=> setEmail(e),[setEmail])
    

    // const reducer = (state,action) => {
    //     console.log('reducer');
    //     switch(action.type){
    //         case "login":
    //             return action.email
    //             // return [...state,action.email]
    //             // return {
    //             //   email:[...state, action.email],
    //             //   password:[...state.password, {password:action.password}],
    //             // };
    //         default: 
    //           return state;
    //       }
    // }
    // const [userEmail,dispatch] = useReducer(reducer,null)
    const {user, setUser} = useContext(UserContext)
    if(user){
        return (<Redirect to="/logout" />) 
    }else {
        return (
            <div>
                <div className={classes.header}>
                    <CardUsignImage 
                        img={loginImage} 
                        width="100%"
                        height="auto"
                        maxHeight="39.2rem"
                        objectFit="contain"
                        title="Login" 
                        titleDisplay="block" // none block
                        subTitle="Login below to manage your Activities"
                        subTitleDisplay="block" // none block
                    />
                </div>
                <div className={classes.content}>
                    <form onSubmit={e=>{
                        e.preventDefault()
                        // const userValue = {
                        //     id:1,
                        //     email:email,
                        //     username:"hiramatsu"
                        // }
                    }}>
                        <TextFields 
                            type="email"
                            value={email}
                            setValue={inputSetEmail}
                            placeholder="メールアドレス"
                            label="E-mail*" 
                            helpers="メールアドレスを入力してください。＊必須"  
                            errors={[
                                {id:0,msg:"メールアドレスを入力してください。＊必須"},
                                {id:1,msg:"メールアドレスは必須です。"},
                                {id:2,msg:"メールアドレスは２０文字以内です。"}
                            ]}
                            // errors={emailMsg}
                        />
                        <TextFields 
                            type="password"
                            value={password}
                            setValue={inputSetPassword}
                            placeholder="パスワード"
                            label="Password*" 
                            helpers="パスワードを入力してください。＊必須"  
                            errors={[]}
                        />
                        <Btn 
                            text="Login" 
                            // variant="text" // Text,Outlined,conteined 
                            // variant="outline" // Text,Outlined,conteined
                            variant="contained" // Text,Outlined,conteined
                            color="primary" 
                            href="#contained-buttons" 
                            type="submit"
                        />
                    </form>
                    <div className={classes.createAccount} onClick={()=>history.push('/signin')}>
                        Create Account
                    </div>
                    
                    
                    {/* <div className={classes.Login}>
                        <div onClick={async () => {
                                const user = await LoginData()
                                setUser(user)
                            }}>
                            <Btn 
                                text="Login" 
                                // variant="text" // Text,Outlined,conteined
                                // variant="outline" // Text,Outlined,conteined
                                variant="contained" // Text,Outlined,conteined
                                color="primary" 
                                href="#contained-buttons" 
                                type="button"
                            />
                        </div>
                        <div className={classes.createAccount} onClick={()=>history.push('/signin')}>
                            Create Account
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Login
