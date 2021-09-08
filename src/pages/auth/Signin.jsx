import React, {useState, useContext} from 'react'
import { UserContext } from '../../UserContext' 
import { useHistory, } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile, updateCurrentUser } from "firebase/auth";

const Signin = () => {
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('') 
    const [displayName,setDisplayName] = useState('Pending') 
    const [photoURL,setPhotoURL] = useState('gs://h-works.appspot.com/users/undraw_profile_pic_ic5t.png')
    
    const setUpdateProfile = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            // const displayName = user.displayName;
            // const email = user.email;
            // const photoURL = user.photoURL;
            // const emailVerified = user.emailVerified;
            // const uid = user.uid;
            setUser(user)
            history.push('/') 
          } else{
            history.push('/login')  
          }

    }
    const updateUser = () => {
        console.log('updateUser');
        const auth = getAuth();
        updateProfile(auth.currentUser, {
        displayName: displayName, photoURL: photoURL
        }).then(() => {
            console.log('Profile update');
            setUpdateProfile()
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error code',errorCode);
            console.log('errorMessage',errorMessage);
        });
        
    }
    const addUser = () => {
        console.log('email',email);
        console.log('password',password);
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('createUserWithEmailAndPassword user',user);
                console.log(' user',user.uid);
                console.log(' email',user.email);
                console.log(' displayName',user.displayName);
                console.log(' photoURL',user.photoURL);
                // ...
                // setUser(user)
                
                updateUser()
                // history.push('/') 

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
