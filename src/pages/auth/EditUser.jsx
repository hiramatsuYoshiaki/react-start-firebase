import React,{useState,useContext,useEffect,useCallback} from 'react'
import { useHistory } from 'react-router-dom'
import {UserContext} from '../../UserContext'

import { getFirestore, collection, doc, addDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes ,getDownloadURL} from "firebase/storage";

import { listenAuth } from '../../firebase/auth/listenAuth';
import { getSelectUsers } from '../../firebase/firestore/getSelectUsers';
import { getAvater } from '../../firebase/storage/getAvater';
import { DisplayArea, InputArea,  } from '../../components/user/index';

import { makeStyles } from  '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    avater:{
        width:"20rem",
        height:"auto",
    },
    displayNone:{
        display:'none'
    },
    sectionCenter:{
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'column'
    },
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

const EditUser = () => {
    console.log('EditUser--------------');
    const classes = useStyles()
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)//auth
    const [selectUsers,setSelectUsers] = useState([])//firestore
    const [photoURL,setPhotoURL] = useState('')//storage
    const [isLoginCheck, setIsLoginCheck] = useState(false)// loading image
    const [isInput, setIsInput] = useState(false) //修正画面表示
    const [editUser, setEditUser] = useState({
        email:'email@gmail.com',
        displayName:'displayName',
        photoURL:'http://photo.filename',
        nameKanji:'kanji name',
        nameKatakana:'katakana name',
        birthday:'19630817',
        sex:'mail',
        post:'700111',
        pref:'岡山',
        address:'南区大福111',
        tel:'090111222'
    })//Edit data

    const [avater,setAvater] = useState(null)
    
    
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
                // await setDoc(doc(db, "users", user.uid), {
                //       id: user.uid,
                //       name: displayName,
                //       email: user.email
                // });
                //2.setDoc set() merge:true---------------------------
                // ドキュメントが存在するかどうかわからない場合は、新しいデータを既存のドキュメントに統合するオプションを渡し、
                // ドキュメント全体が上書きされないようにしま・・・・
                // const userRef = doc(db, "users", user.uid);
                // setDoc(userRef, { 
                //    tel:'000-1234-56789' //既存データはそのままこの項目が追加される。
                // }, { merge: true });
                //3.addDoc ---------------------------------------------
                //  idをD を自動的に生成
                await addDoc(collection(db, "users"), {
                  id: user.uid,
                  name: displayName,
                  email: user.email
                }); 

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
        const storageRef = ref(storage, 'users/' + fileName);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log(fileName);
            console.log('Uploaded a blob or file!');

            //URL取得    
            const starsRef = ref(storage, 'users/' + fileName);
            getDownloadURL(starsRef)
                .then((URL) => {
                    console.log(URL);
                    setPhotoURL(URL)
                    //firestoregeにURLを登録する
                    //.....
                })
                .catch((e)=>{
                    console.log('firestore eror',  e) 
                })

        });

    }
    //ログインチェック
    useEffect(()=>{
         listenAuth(user, setUser, isLoginCheck, setIsLoginCheck)
    },[user])
    //ログインユーザーのfirestoreにあるユーザー情報を取得
    useEffect(()=>{
        if(user){
         getSelectUsers(selectUsers, setSelectUsers, user.uid,)
        }
    },[user])
    //ログインユーザーのstorageにあるアバター画像を取得
    useEffect(()=>{
        if(user){
            getAvater(photoURL, setPhotoURL, user.photoURL,)
        }
   },[user])

    // useEffect(()=>{
    //     //ログインチェック

    //     //fistoreからユーザー情報を取得する
    //     console.log('ファイアストアを取得する');

    //     //storegeからアバター画像を取得する
    //     console.log('ストレージファイルを取得する');

    //     const storage = getStorage();
    //     //参照を作成する
    //     //参照は、ストレージ ルートに子パスを付加して作成することも、
    //     //Cloud Storage のオブジェクトを参照する既存の gs:// 
    //     //または https:// URL から作成することもできます。
        
    //     //子パス
    //     const pathReference = ref(storage, 'users/undraw_profile_pic_ic5t.png');
    //     //URL(gs://)オブジェクトを参照 
    //     const gsReference = ref(storage, 'gs://h-works.appspot.com/users/undraw_profile_pic_ic5t.pngg');
    //     //URL(https://)オブジェクトを参照
    //     const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/h-works.appspot.com/o/users%2Fundraw_profile_pic_ic5t.png?alt=media&token=356b019e-9542-4b8c-9b40-39fcfb3b0b53g');
       
    //     getDownloadURL(pathReference)
    //     .then((url) => {
    //         console.log('photoURL',url); 
    //         setAvater(url)
    //         setPhotoURL(url)
    //     })
    //     .catch((error) => {
    //         console.log('storage getDownloadURL error');
    //         console.log(error);
    //     })

    // },[user.photoURL])

     return (
        <div  className="f-fexed-container">
            {user !== null 
            ?
            <div>
                <div>
                    {isInput ? <InputArea 
                                user={user} setUser={setUser} 
                                selectUsers={selectUsers} setSelectUsers={setSelectUsers} 
                                photoURL={photoURL} setPhotoURL={setPhotoURL}/>
                             : <DisplayArea user={user} selectUsers={selectUsers} photoURL={photoURL}/>
                    }
                    
                    <button onClick={()=> setIsInput(!isInput)}> 
                        {isInput ? '戻る'
                                : '修正'
                        }
                    </button>
                    <br />
                    <br />
                    <br />
                    
                </div>

                {/* <div>ユーザー情報</div>
                 <img src={photoURL} alt="avater" className={classes.avater} />
                <br />
                <div>メールアドレス:{user.email}</div>
                <br />
                <div>アカウント名:{user.displayName}</div>
               
                <br /> */}
                {/* <div>--------------------------------------------------------</div> */}
                {/* <br />
                <div>名前（漢字）：</div>
                <div>名前（カタカナ）：</div>
                <div>誕生日：</div>
                <div>性別：</div>
                <div>郵便番号：</div>
                <div>県：</div>
                <div>住所：</div>
                <div>電話番号：</div>
                <div>
                    <button>ユーザー情報を修正</button>
                </div>
                <br />
                <div>
                    <button>アカウントを削除</button>
                </div> */}
                {/* <div>--------------------------------------------------------</div> */}
                {/* <div>firebase auth-----------</div>
                <div>uid:{user.uid}</div>
                <div>email:{user.email}</div>
                <div>displayName:{user.displayName}</div>
                <div>photoURL:{user.photoURL}</div>
                <br /> */}
                {/* {selectUsers.map(selectUser => 
                <div>
                    <div>id:{selectUser.id}</div>
                    <div>email:{selectUser.email}</div>
                    <div>name:{selectUser.name}</div>
                    <div>photoURL:{selectUser.photoURL}</div>
                </div>)} */}
                {/* <div>{photoURL}</div>
                <img src={photoURL} alt="avater" className={classes.avater} /> */}
                    
            </div>
            :
            <div>
                <div>
                    ユーザー情報を確認するには、ログインが必要です。
                </div>
                 <button onClick={()=> history.push('/logoin')}>ログイン画面へ</button>
            </div>
            }
            {/* <h3>アバターを変更する</h3> */}
            {/* <div>
                <label　htmlFor="avter"> 
                        アバターイメージを変更する
                        <input className={classes.displayNone}
                            type="file"
                            id="avter"
                            accept={"image/jpeg, image/png"}
                            onChange={e => uploadImage(e)}
                        />
                </label>
            </div> */}
           
            {/* <img src={photoURL} alt="avater" className={classes.avater} />
            <div>{photoURL}</div> */}
            {/* <h3>ユーザー情報を変更する</h3> 
            <div>uid:{user.uid}</div> 
            <div>e-mail:{user.email}</div>
            <div>displayName:{user.displayName}</div>
            <div>photoURL:{user.photoURL}</div> */}


            <br />
            {/* <h3>ユーザー名を登録する</h3> */}
            {/* <label htmlFor="displayName">
                Name: 
                <input type="text" id="dispalyName" name="dispalyName" value={displayName} onChange={e=>setDispalyName(e.target.value)}  />
            </label>
            <br />
            <button onClick={()=>addUser()}>登録する</button> */}
            {/* <h3>追加情報を登録する。</h3> */}
            {/* <form onSubmit={e=>{
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
            </form> */}
            
            {/* <button onClick={()=> history.push('/logout')}>前の画面へ戻る</button> */}
            <div className={isLoginCheck ? classes.checkNow : classes.checked}>Login check! Now......</div>
        </div>
    )
}

export default EditUser
