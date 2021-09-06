import React, {useContext} from 'react'
import {UserContext} from '../../UserContext'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
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
        return (<Redirect to="/login" />) 
    }else {
        return (
            <div>
                <h1>Hello！{user.displayName}</h1>
                <div>uid:{user.uid}</div>
                <div>e-mail:{user.email}</div>
                <div>Name:{user.displayName}</div>
                <div>photoURL:{user.photoURL}</div>
                <button onClick={()=>history.push('/edituser')}>
                        Firestoreにユーザーを登録する
                </button>
                <br />
                <h3>Logout</h3>
                <button onClick={()=> logout()}>
                    logout
                </button>
               
            </div>
        )
    }
}

export default Logout
