// import React, {useState, useContext, useReducer, } from 'react'
import React, {useState, useContext,} from 'react'
import { UserContext } from '../../UserContext' 
import { Redirect } from 'react-router-dom';
// import { LoginData } from '../../util/LoginData'
import { useHistory, } from 'react-router-dom'
import { CardUsignImage } from '../../components/surface/cards';
import loginImage from '../../assets/img/png/undraw_profile_pic_ic5t.png'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    const {user, setUser} = useContext(UserContext)
    const [email,setEmail] = useState('user3@gmail.com')//addUser1@gmail.com ,user2@gmail.com, userX,hiramatsu1157@gmail.com
    const [password,setPassword] = useState('pass3333')//addUser1Pass1234,password1234,passXXXX,pass1111

    
    const login = () => {
        console.log('signInWithEmailAndPassword');  
        const auth = getAuth();
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log('login user:', user );
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error code',errorCode);
                console.log('errorMessage',errorMessage); 
            });
    }

    if(user){ 
        return (<Redirect to="/" />)  
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
                    <div>
                        <label htmlFor="email">
                            Email:
                            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password: 
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <button onClick={()=> login()}>login</button>
                    <br></br>
                    <br></br>
                    <div className={classes.createAccount} onClick={()=>history.push('/resetpass')}>
                        Forgot Password?
                    </div>
                    <br></br>
                    <div className={classes.createAccount} onClick={()=>history.push('/signin')}>
                        Create Account
                    </div>

                </div>
            </div>
        )
    }
}

export default Login
