import React, {useContext} from 'react'
import {UserContext} from '../../UserContext'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

import { getAuth, signOut } from "firebase/auth"; 
import { CardUsignImage } from '../../components/surface/cards';
import loginImage from '../../assets/img/png/undraw_profile_pic_ic5t.png'
import { makeStyles } from  '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    header:{
        width:'100%',
    },
    section:{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'flex-start',
        padding:"1.6rem 0 1.6rem 0",
    }
})) 
const Logout = () => {
    const classes = useStyles()
    const {user,setUser} = useContext(UserContext)
    const history = useHistory()
    const logout = () => {  
        console.log('onSignOut');
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('Sign-out successful')
            setUser(null)
        }).catch((error) => {
            // An error happened.
            console.log('An error happened')
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error code',errorCode);
            console.log('errorMessage',errorMessage);
        });
    }

    if(!user){
        return (<Redirect to="/" />)  
    }else {
        return (
            <div>
                 <header className={classes.header}>
                    <CardUsignImage 
                        img={loginImage} 
                        width="100%"
                        height="auto"
                        maxHeight="39.2rem"
                        objectFit="contain"
                        title={user.displayName } 
                        titleDisplay="block" // none/block
                        subTitle={user.email}
                        subTitleDisplay="block" // none/block　
                    />
                </header>
                <section className={classes.section}>
                    <button onClick={()=>history.push('/edituser')}>
                            ユーザー情報を変更する。
                    </button>
                </section>
                <section className={classes.section}>
                    <button onClick={()=> logout()}> 
                        ログアウトする
                    </button>
                </section>
                <div>
                    {/* <div>uid:{user.uid}</div>
                    <div>e-mail:{user.email}</div>
                    <div>Name:{user.displayName}</div>
                    <div>photoURL:{user.photoURL}</div> */}
                </div>
                
               
                <br />
                
                
               
            </div>
        )
    }
}

export default Logout
