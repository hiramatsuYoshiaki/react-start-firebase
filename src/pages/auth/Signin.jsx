import React, {useState, useContext} from 'react'
import { UserContext } from '../../UserContext' 
import { useHistory, } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile, updateCurrentUser } from "firebase/auth";
import { getFirestore, collection, setDoc,addDoc,serverTimestamp } from "firebase/firestore";

const Signin = () => {
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)
    const [uid, setUid] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('') 
    const [displayName,setDisplayName] = useState('Pending User') 
    const [photoURL,setPhotoURL] = useState('gs://h-works.appspot.com/users/undraw_profile_pic_ic5t.png')
    
    const setFirestore = async(authCurrentUser) => {
        console.log('firestore add doc');
        const db = getFirestore();
        // const timestamp = serverTimestamp.now()
        // const timestamp = new Date(serverTimestamp)
        // console.log(serverTimestamp());
        // const sts = serverTimestamp()
        // const timestamp =  new Date(sts).getTime();
        // console.log(timestamp);
        try{
            //  idをD を自動的に生成
            await addDoc(collection(db, "users"), {
              id: authCurrentUser.uid,
              email: authCurrentUser.email,
              name: authCurrentUser.displayName,
              photoURL: authCurrentUser.photoURL,
              nameKanji:'',
              nameKana:'',
              birthday:'',
              sex:'',
              post:'',
              pref:'',
              address:'',
              tel:'',
              create_at:serverTimestamp(),
              update_at:serverTimestamp(),

            });
            //1.setDoc set()---------------------------
                // を使用してドキュメントを作成する場合、作成するドキュメントの ID を指定する必要があります。
                // ドキュメントが存在しない場合は、ドキュメントが新規に作成されます。ドキュメントが存在する場合、
                // 新しく提供されたデータでコンテンツが上書(すべて)きされます。
            //     const uid = authCurrentUser.uid
            //     console.log('authCurrentUser.uid',authCurrentUser.uid);
            //     console.log('uid',uid);
            //     await setDoc(collection(db, "users", 'aaa123456'), {
            //       id: authCurrentUser.uid,
            //       email: authCurrentUser.email,
            //       name: authCurrentUser.displayName,
            //       photoURL: authCurrentUser.photoURL,
            //   }); 
        }
        catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error code',errorCode);
            console.log('errorMessage',errorMessage);
        }
        history.push('/') 
    }
    // const setUpdateProfile = () => {
    //     const auth = getAuth();
    //     const user = auth.currentUser;
    //     if (user !== null) {
    //         setUser(user)
    //         setFirestore()//firestoreに登録
    //         history.push('/') 
    //       } else{
    //         history.push('/login')   
    //       }
    // }
    const updateUser = () => {
        //ディスプレイネームとアバター写真URLを作成する
        console.log('updateUser');
        const auth = getAuth();
        updateProfile(auth.currentUser, {
        displayName: displayName, photoURL: photoURL
        }).then(() => {
            console.log('Profile update');
            // setUpdateProfile()
            setFirestore(auth.currentUser)
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
        //メールとパスワードでユーザーアカウントを作成する
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('createUserWithEmailAndPassword user',user);
                console.log(' user',user.uid);
                console.log(' email',user.email);
                console.log(' displayName',user.displayName);
                console.log(' photoURL',user.photoURL);
                // setUid(user.uid)
                // console.log(uid);
                // setEmail(user.email)
                // console.log(email);

                updateUser()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error code',errorCode);
                console.log('errorMessage',errorMessage);
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
