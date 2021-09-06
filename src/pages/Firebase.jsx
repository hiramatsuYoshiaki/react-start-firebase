import React,{useState} from 'react'
import { initializeApp } from 'firebase/app';
import {firebaseConfig} from "../firebase/config";
import { getAuth, onAuthStateChanged, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut  } from 'firebase/auth';


const Firebase = () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const [user, setUser] = useState(null)
    const [displayName, setDisplayName] = useState("")
    const [photoURL, setPhotoURL] = useState("")
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const getOnAuthStateChanged = () =>{
        const auth = getAuth();
        // const user = auth.currentUser;
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                // const uid = user.uid;
                // const displayName = user.displayName;
                // const email = user.email;
                // const photoURL = user.photoURL;
                // const emailVerified = user.emailVerified;
                // ...
                console.log('login now');
                console.log('uid',user.uid); 
                console.log('email',user.email); 
                console.log('dispalyname',user.displayName); 
                console.log('photoURL',user.photoURL); 
                console.log('emailVerified',user.emailVerified); 
                setUser(user)
            } else {
                // User is signed out
                // ...
                console.log('logout now');
                setUser(null)
            }
        }); 
    } 
    
    const changeUpdateProfile = (displayName,photoURL) => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: displayName, 
            photoURL: photoURL
        }).then(() => {
            // Profile updated!
            // ...
            console.log('Profile updated!');
            console.log('displayName',displayName);
            console.log('photoURL',photoURL);
        }).catch((error) => {
            // An error occurred
            // ...
            // const errorCode = error.code;
            // const errorMessage = error.message;
            console.log('errorCode',error.code);
            console.log('errorMessage',error.message);
        });
    }
    const onCeateUserWithEmailAndPassword = () =>{
        console.log('onCeateUserWithEmailAndPassword');
        console.log('email',email);
        console.log('password',password);
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            setUser(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log('errorCode',error.code);
            console.log('errorMessage',error.message);
        });
    }
    const onSignInWithEmailAndPassword = () =>{
        console.log('onSignInWithEmailAndPassword');
        console.log('email',email);
        console.log('password',password);

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                setUser(user)
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.log('errorCode',error.code);
                console.log('errorMessage',error.message);
                setUser(null)
            });
    }
    const onSignOut = () =>{
        console.log('onSignOut');
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign-out successful')
        }).catch((error) => {
        // An error happened.
        console.log('An error happened')

        });
    }
    

    return (
        <div>
            <div>
                <h3>Firebase でユーザーを管理する</h3> 
                <div>
                    <p>1.現在ログインしているユーザーを取得する</p>
                    <button　onClick={()=>getOnAuthStateChanged()}>ユーザー取得</button>
                    {
                        user !== null ? 
                            <div>
                                <div>ログインしています。</div>
                                <div>uid:{user.uid}</div>
                            </div>
                            :
                            <div>
                                <div>ログアウトしています。</div>
                            </div>
                    }
                </div>
                <div>
                    <p>2.ユーザーのプロフィールを取得する</p>
                    <button　onClick={()=>getOnAuthStateChanged()}>ユーザー情報取得</button>
                    {
                        user !== null && 
                            <div>
                                <div>uid:{user.uid}</div>
                                <div>email:{user.email}</div>
                                <div>displayName:{user.displayName}</div>
                                <div>photoURL:{user.photoURL}</div>
                                <div>emailVerrified:{user.emailVerified}</div>
                            </div>
                    }
                </div>
                <div>
                    <p>3.ユーザーのプロフィールを更新する</p>
                    <div>
                        <label htmlFor="displayName">
                            DisplayName: 
                            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} name="displayName"/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="photoURL">
                            photoURL: 
                            <input id="photoURL" type="text" value={photoURL} onChange={e => setPhotoURL(e.target.value)} />
                        </label>
                    </div>
                    <button　onClick={()=>changeUpdateProfile(displayName,photoURL)}>プロフィールを更新</button>
                </div>
            </div>
            <h3>パスワード認証</h3>
            <div>
                <p>1.パスワード ベースのアカウントを作成する</p>
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
                <button　onClick={()=>onCeateUserWithEmailAndPassword()}>カウントを作成</button>
            </div>
            <div>
                <p>1.メールアドレスとパスワードを使用してユーザーのログインを行う</p>
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
                <button　onClick={()=>onSignInWithEmailAndPassword()}>ログイン</button>
            </div>
            <div>
                <p>3.ユーザーのログアウト</p>
                <button　onClick={()=>onSignOut()}>ログアウト</button>
            </div>
        </div>
    )
}

export default Firebase
