import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../UserContext'
import { getAuth,onAuthStateChanged } from "firebase/auth";

// import React, { useEffect, useState } from 'react'
// import { db } from '../firebase/index'
// import {firebaseConfig} from "./config";
// import { collection, addDoc } from "firebase/firestore";
import { getFirestore, collection, getDocs, query, where  } from "firebase/firestore";
import { getStorage, ref, refFromURL, refFromUR, getDownloadURL} from "firebase/storage";
import { makeStyles } from  '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    checkNow:{
        position:'fixed',
        top:0,
        left:0,
        zIndex:9999,
        width:'100vw',
        height:'100vh', 
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black',
        color:'white',
        opacity:1,
    },
    checked:{
        display:'none',
    },
    avater:{
        width:"20rem",
        height:"auto", 
    },
})) 

const Home = () => {
    const classes = useStyles()
    const {user, setUser} = useContext(UserContext)
    const [users,setUsers] = useState([])
    const [selectUsers,setSelectUsers] = useState([])
    const [avater,setAvater] = useState(null)
    const [isLoginCheck, setIsLoginCheck] = useState(false)
    // Cloud Firestore ルール　
    //すべて許可-----------------------------
    // rules_version = '2';
    // service cloud.firestore {
    //   match /databases/{database}/documents {
    //    match /{document=**} {
    //       allow read, write: if true;
    //     }
    //   }
    // }
    //ログインユーザーは許可-----------------------------
    // rules_version = '2';
    // service cloud.firestore {
    //   match /databases/{database}/documents {
    //    match /users/{id} {
    //     allow read;
    //     allow write: if request.auth.uid != null;
    //    }
    //   }
    // }
    // Cloud Firestore のインスタンスを初期化します。
    // const firebaseApp = initializeApp({
    //     apiKey: 'AIzaSyBSpwkJv2MrWnhW0vwu-UsyKqWsjmLE40U',
    //     authDomain: 'h-works.firebaseapp.com',
    //     projectId: 'h-works' 
    // });
    // const db = getFirestore();
    // const [users, setUsers] = useState([])

 
    //データの追加
    // const addDb = async() => {
    //     console.log('addDb');
    //     try {
    //         const docRef = await addDoc(collection(db, "users"), {
    //           id: "003",
    //           name: "Luser3",
    //           email: "user3@gmail.com"
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //       } catch (e) {
    //         console.error("Error adding document: ", e);
    //       }
    // }

    // データ全件を読み取る
    const getUsers = async() => {
        // console.log('getUser All');
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = []
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            const user = doc.data()
            users.push(user)
        });
        setUsers(users)
    }
    //該当ユーザーを選択する
    const getSelectUser = async(uid) => {
        // console.log('getSelectUser');
        // console.log(uid);
        const selectUsers = []

        const db = getFirestore();
        const citiesRef = collection(db, "users");
        const q = query(citiesRef, where("id", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const user = doc.data()
        selectUsers.push(user)
        });
        setSelectUsers(selectUsers)
        // getAvater()
    }
    //storageのアバターを取得する
    const getAvater = (url) => {
        console.log('get Avater');
        console.log(url);
        const storage = getStorage();
        //以下3つの方法で参照を作成できます
        //1.子パス
        // const reference = ref(storage, 'users/undraw_profile_pic_ic5t.png');
        // 2. //URL(gs://)オブジェクトを参照 
        // const reference = ref(storage, 'gs://h-works.appspot.com/users/undraw_profile_pic_ic5t.pngg');
        // 3. //URL(https://)オブジェクトを参照 
        // const reference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/h-works.appspot.com/o/users%2Fundraw_profile_pic_ic5t.png?alt=media&token=356b019e-9542-4b8c-9b40-39fcfb3b0b53g');
       
        const reference = ref(storage, url);
        getDownloadURL(reference)
        .then((url) => {
            console.log('photoURL',url);
            setAvater(url)
        })
        .catch((error) => {
            console.log('storage getDownloadURL error');
            console.log(error);
        })
       
    }
    

    useEffect(()=>{
        //ログインチェック---------------------------------------------
        setIsLoginCheck(true)
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            // setIsLoginCheck(false)
            if (user) {
            //   const uid = user.uid;
            //   console.log('home onAuthStateChanged user logged in', user.uid);
              setUser(user)
              getUsers()
              getSelectUser(user.uid)
              getAvater(user.photoURL)
            } else {
            //   console.log('home onAuthStateChanged user logged out');
              setUser(null)
            }
            setIsLoginCheck(false)
          });
    },[user,setUser])

   

    return (
        <div style={{backgroundColor:"white"}}>
            {user !== null 
            ?
                <div>
                    <div>私は、{user.displayName}です。よろしくね！</div>
                    <div>firebase auth-----------</div>
                    <div>uid:{user.uid}</div>
                    <div>email:{user.email}</div>
                    <div>displayName:{user.displayName}</div>
                    <div>photoURL:{user.photoURL}</div>
                    <br />
                    <div>
                        {/* <div>Firebase data all------</div>
                        {users.map(user=>(user.email))} */}
                        <div>firestore login user------</div>
                        {selectUsers.map(selectUser=> (
                            <div key={selectUser.id}>
                                <div>{selectUser.id}</div>
                                <div>{selectUser.email}</div>
                                <div>{selectUser.name}</div>
                                <div>{selectUser.photoURL}</div>
                            </div>
                        ))}
                    </div>
                    <br />
                    <div>
                        <div>avater</div>
                        <img src={avater} alt="avater" className={classes.avater} />
                    </div>
                </div> 
            : 
                <div>
                    <div>Loginしていません。</div>
                    <div>サインインしてあなたのキャリアを作成しましょう！</div>
                    <div>３つのステップを完了してください。</div>
                    <div>Step1  あなたの基本情報</div>
                    <div>Step2　あなたの作品</div>
                    <div>Step3　あなたの仕事内容</div>
                </div>}
                
            <div className={isLoginCheck ? classes.checkNow : classes.checked}>Login check! Now......</div>
            
        </div>
    )
}

export default Home 
 