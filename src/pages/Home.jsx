import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../UserContext'
import { getAuth,onAuthStateChanged } from "firebase/auth";

// import React, { useEffect, useState } from 'react'
// import { db } from '../firebase/index'
// import {firebaseConfig} from "./config";
// import { collection, addDoc } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
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
})) 

const Home = () => {
    const classes = useStyles()
    const {user, setUser} = useContext(UserContext)
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


    // データを読み取る
    // const readDb = async() => {
        
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     const users = []
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //         const user = doc.data()
    //         users.push(user)
    //     });
    //     if(users.length > 0 ){
    //         setUsers(users)
    //     }
    // }

    useEffect(()=>{
        //ログインチェック---------------------------------------------
        setIsLoginCheck(true)
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            // setIsLoginCheck(false)
            if (user) {
            //   const uid = user.uid;
              console.log('onAuthStateChanged user logged in', user.uid);
              setUser(user)
            } else {
              console.log('onAuthStateChanged user logged out');
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
                    <div>uid:{user.uid}</div>
                    <div>email:{user.email}</div>
                    <div>displayName:{user.displayName}</div>
                    <div>photoURL:{user.photoURL}</div>
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
 