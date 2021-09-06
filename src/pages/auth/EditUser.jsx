import React,{useState,useContext} from 'react'
import { useHistory } from 'react-router-dom'
import {UserContext} from '../../UserContext'

const EditUser = () => {
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)
    const [dispalyName, setDispalyName] = useState('')
    return (
        <div>
            <h3>Firestoreにユーザー情報を登録する</h3> 
            <div>uid:{user.uid}</div>
            <div>e-mail:{user.email}</div>
            {/* <div>Name:{user.displayName}</div>
            <div>photoURL:{user.photoURL}</div> */}
            <br />
            {/* <label htmlFor="displayName">
                DisplayName 
                <input type="text" id="dispalyName" name="dispalyName" value={dispalyName} onChange={e=>setDispalyName(e.target.value)}  />
            </label> */}
            <br />
            <button onClick={()=> history.push('/logout')}>戻る</button>
        </div>
    )
}

export default EditUser
