import React,{useContext} from 'react'
import { Redirect } from 'react-router-dom';
import {UserContext} from '../../UserContext'


const Auth = ({ children }) => {

    const user = useContext(UserContext)
    console.log('auth user', user);

    if (!user.user) {
        return (<Redirect to="/login" />)
    } else {
        return children
    }
}

export default Auth
