import React, {useContext} from 'react'
import {UserContext} from '../../UserContext'
import { Redirect } from 'react-router-dom';


const Logout = () => {
    const {user,setUser} = useContext(UserContext)
    if(!user){
        return (<Redirect to="/login" />) 
    }else {
        return (
            <div>
                <h1>Logout</h1>
                <div>Id:{user.id}</div>
                <div>Name:{user.username}</div>
                <div>e-mail:{user.email}</div>
                <button onClick={()=> setUser(null)}>
                    logout
                </button>
            </div>
        )
    }
}

export default Logout
