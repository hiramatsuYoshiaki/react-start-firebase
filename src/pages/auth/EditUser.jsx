import React,{useState,useContext} from 'react'
import { useHistory } from 'react-router-dom'
import {UserContext} from '../../UserContext'
import { collection, doc, addDoc, setDoc } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
// import {firebaseConfig} from "./config";
import { getFirestore } from "firebase/firestore"
// import { getStorage, ref, uploadBytes } from "firebase/storage";
// import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { getStorage, ref, uploadBytes ,getDownloadURL} from "firebase/storage";




const EditUser = () => {
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)
    const [displayName, setDispalyName] = useState('')
    const [userInfo, setUserInfo] = useState({
        firstName:'fname',
        lastName:'lname',
        birthday:'birth',
        sex:'mail/femail',
        post:'700111',
        pref:'岡山',
        address:'南区大福111',
        tel:'090111222'
    })
    console.log(userInfo);
    const setMoreInfo = (e) => {
        console.log('setMoreInfo');
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
          });
    }
    const addUser = async () => { 
        const db = getFirestore();
        console.log('add user');
            try {
                //1.setDoc set()---------------------------
                // を使用してドキュメントを作成する場合、作成するドキュメントの ID を指定する必要があります。
                // ドキュメントが存在しない場合は、ドキュメントが新規に作成されます。ドキュメントが存在する場合、
                // 新しく提供されたデータでコンテンツが上書(すべて)きされます。
                await setDoc(doc(db, "users", user.uid), {
                      id: user.uid,
                      name: displayName,
                      email: user.email
                });
                //2.setDoc set() merge:true---------------------------
                // ドキュメントが存在するかどうかわからない場合は、新しいデータを既存のドキュメントに統合するオプションを渡し、
                // ドキュメント全体が上書きされないようにしま・・・・
                // const userRef = doc(db, "users", user.uid);
                // setDoc(userRef, { 
                //    tel:'000-1234-56789' //既存データはそのままこの項目が追加される。
                // }, { merge: true });
                //3.addDoc ---------------------------------------------
                //  idをD を自動的に生成
                // const docRef = await addDoc(collection(db, "users"), {
                //   id: user.uid,
                //   name: displayName,
                //   email: user.email
                // }); 

                // 4. doc setDoc -------------------------------------------- 
                // 自動生成された ID を持つドキュメント参照を作成して、後で参照を使用
                // const newUsersRef = doc(collection(db, "users"));
                // console.log(newUsersRef);//自動生成された ID
                // await setDoc(newUsersRef, {
                //     id: user.uid,
                //     name: displayName,
                //     email: user.email
                // });
                
              } catch (e) {
                console.error("Error adding document: ", e);
              }

    }
    const addMoreInfo = async() => {
        console.log('addMoreInfo');
        const db = getFirestore();
        try{
            const userRef = doc(db, "users", user.uid);
            setDoc(userRef, { 
               firstName:userInfo.firstName, //既存データはそのままこの項目が追加される。
               lastName:userInfo.lastName,
            }, { merge: true });
            console.log('update user');
        }
        catch(e){
            console.error("Error adding document: ", e);
        }

    }
    const [images, setImages] = useState([])
    const uploadImage = (e) => {
        console.log('uploadImag');
        // const storage = getStorage()
        // const storageRef = storage.ref();
        // const usersCollection = ref(storage, "images/example.png");

        const file = e.target.files;
        //アップロードするにはBlogオブジェクトに変換する必要がある
        //image type: "image/jpeg" video type: "video/mp4"
        let blob = new Blob(file, { type: "image/jpeg" });

        // Generate random 16 digits strings 
        // クラウドストレージにアップするためにファイ名が重複しないように１６桁のファイル名をランダム生成する
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')
        console.log('fileName',fileName);
         


        //firebase storageのimageフォルダーにアップロードする
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + fileName);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log(fileName);
            console.log('Uploaded a blob or file!');
            
            const starsRef = ref(storage, 'images/' + fileName);
            getDownloadURL(starsRef)
            .then((URL) => {
                console.log(URL);
            })
            .catch((e)=>{
                console.log('firestore eror',  e)
            })

        });

        

        // const uploadRef = storage.ref('images').child(fileName);
        // const uploadTask = uploadRef.put(blob);

        // //firebase storegeの画像ファイルのURLを取得する
        // uploadTask.then(() => {
        //     // Handle successful uploads on complete
        //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        //         // dispatch(hideLoadingAction())
        //         const newImage = { id: fileName, path: downloadURL, description: '', instagram:'', twitter:'' };
        //         // if (props.Multiple) {
        //         //     props.setImages((prevState => [...prevState, newImage])) //追加する場合の書き方
        //         // } else {
        //         //     props.setImages([newImage])
        //         // }
        //         setImages((prevState => [...prevState, newImage])) //追加する場合の書き方
        //     });
        // }).catch((e) => { 
        //     // dispatch(hideLoadingAction())
        //     console.log(e)

        // });
    
    
    
    }


    


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
    
     return (
        <div>
            <h3>Firestoreにユーザー情報を登録する</h3> 
            <div>uid:{user.uid}</div> 
            <div>e-mail:{user.email}</div>
            <div>name:{displayName}</div>
            {/* <div>Name:{user.displayName}</div>
            <div>photoURL:{user.photoURL}</div> */}
            <br />
            <h3>ユーザー名を登録する</h3>
            <label htmlFor="displayName">
                Name: 
                <input type="text" id="dispalyName" name="dispalyName" value={displayName} onChange={e=>setDispalyName(e.target.value)}  />
            </label>
            <br />
            <button onClick={()=>addUser()}>登録する</button>
            <br />
            <br />
            <br />
            <h3>追加情報を登録する。</h3>
            <form onSubmit={e=>{
                e.preventDefault()//デフォルトの動作(ページがリロード)をキャンセル
                console.log('onsubmit');
                addMoreInfo()
            }}>
                <div>
                    <label htmlFor="firstName">
                        firstName:
                        <input type="text" id="firstName" name="firstName"  value={userInfo.firstName} onChange={setMoreInfo}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="lastName">
                        lastName:
                        <input type="text" id="lastName" name="lastName"  value={userInfo.lastName} onChange={setMoreInfo}/>
                    </label>
                </div>
                
                
                <br />
                <br />
                <input type="submit" value="追加情報を登録"></input>
            </form>
            
            <br />
            <br />
            <br />
            <h3>アバターを登録する</h3>
            <div>
                <label　htmlFor="avter">
                        アバターイメージ
                        <input className="u-display-none"
                            type="file"
                            id="avter"
                            accept={"image/jpeg"}
                            onChange={e => uploadImage(e)}
                        />
                </label>
            </div>

            <br />
            <br />
            <br />
            <button onClick={()=> history.push('/logout')}>戻る</button>
        </div>
    )
}

export default EditUser
