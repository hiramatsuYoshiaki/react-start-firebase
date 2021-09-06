import React, {useState, useContext} from 'react'
import { UserContext } from '../../UserContext' 
import { useHistory, } from 'react-router-dom'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const addUser = () => {
        console.log('email',email);
        console.log('password',password);
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('user',user);
                // ...
                setUser(user)
                history.push('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error code',errorCode);
                console.log('errorMessage',errorMessage);
                // ..
            });

    }
    return (
        <div>
            <h1>Signin</h1>
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
            <button onClick={()=> addUser()}>add user</button>
        </div>
    )
}

export default Signin
