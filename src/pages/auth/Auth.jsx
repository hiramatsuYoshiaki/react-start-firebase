import React,{useState,useEffect,useContext} from 'react'
import { Redirect } from 'react-router-dom';
import {UserContext} from '../../UserContext'
import { getAuth,onAuthStateChanged } from "firebase/auth";

const Auth = ({ children }) => {
    const {user, setUser} = useContext(UserContext)
    const [isChecked,setIsChecked] = useState(false)
    console.log('auth')
    // console.log(user);
    useEffect(()=>{
        //ログインチェック---------------------------------------------
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
            //   const uid = user.uid;
              console.log('onAuthStateChanged user logged in', user.uid); 
              setUser(user)
            } else {
              console.log('onAuthStateChanged user logged out');
              setUser(null)
            }
          });
          setIsChecked(true) 
    },[user,setUser])
    // if(isChecked){
        if (!user) {
            return (<Redirect to="/login" />)
        } else {
            return children
        }
    // }else{
        
    // }
    
}

export default Auth
