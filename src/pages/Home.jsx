import React,{useContext} from 'react'
import {UserContext} from '../UserContext'

// import React, { useEffect, useState } from 'react'
// import { db } from '../firebase/index'
// import {firebaseConfig} from "./config";
// import { collection, addDoc } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";

const Home = () => {
    const {user, setUser} = useContext(UserContext)
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

    // useEffect(()=> {
    //       console.log('useEffect'); 
    //     //   addDb()
    //     // readDb()
    // },[])
      

    
    return (
        <div style={{backgroundColor:"white"}}>
            {user !== null 
            ? <div>ようこそ、{user.displayName}</div> 
            : <div>Loginしていません。</div>}
            {/* <button onClick={()=> fetchUsers() }>users</button> */}
            {/* {users.map(user=>(
                <div key={user.id}>
                    <span>{user.id}</span>
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                </div>
                
            ))} */}
            
        </div>
    )
}

export default Home 
 