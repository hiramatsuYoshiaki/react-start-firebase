import React from 'react'
import moment from 'moment';

import { makeStyles } from  '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    header:{
        padding:"1.6rem"
    },
    avater:{
        width:"20rem",
        height:"auto",
    },
    displayNone:{
        display:'none'
    },
    
})) 

const DisplayArea = ({user, selectUsers, photoURL}) => {
    const classes = useStyles()
    return (
        <div>
            <div className={"c-displayArea-header " + classes.header} >
                <div>
                    <img src={photoURL} alt="avater" className={classes.avater} />
                </div>
                <div>
                     <div>アカウント名:{user.displayName}</div>
                     <div>メールアドレス:{user.email}</div>
                </div>
            </div>
            <div className={classes.section}>
                <div>ユーザー情報</div>
                 
                {/* <br />
                <div>メールアドレス:{user.email}</div>
                <br />
                <div>アカウント名:{user.displayName}</div>
                 <br />
                <div>uid:{user.uid}</div> */}
               
                {/* <br />
                <div>--------------------------------------------------------</div> */}
                {selectUsers.map(selectUser => 
                <div key={selectUser.id}> 
                    <div>id:{selectUser.id}</div>
                    <div>email:{selectUser.email}</div>
                    <div>name:{selectUser.name}</div>
                    <div>name kanji:{selectUser.nameKanji}</div>
                    <div>name katakana:{selectUser.nameKatakana}</div>
                    <div>birthday:{selectUser.birthday}</div>
                    <div>sex:{selectUser.sex}</div>
                    <div>post:{selectUser.post}</div>
                    <div>pref:{selectUser.pref}</div>
                    <div>address:{selectUser.address}</div>
                    <div>tel:{selectUser.tel}</div>
                    <div>create date:{moment(selectUser.create_at.toDate()).format('YYYY/MM/DD HH:mm')}</div>
                    <div>update date:{moment(selectUser.create_at.toDate()).format()}</div>
                </div>)}
                <br />
                <div>名前（漢字）：</div>
                <div>名前（漢字）：</div>
                <div>名前（カタカナ）：</div>
                <div>誕生日：</div>
                <div>性別：</div> 
                <div>郵便番号：</div>
                <div>県：</div>
                <div>住所：</div>
                <div>電話番号：</div>
                <br />
                {/* <div>
                    <button>ユーザー情報を修正</button>
                </div>
                <br />
                <div>
                    <button>アカウントを削除</button>
                </div> */}
            </div>
                
        </div>
    )
}

export default DisplayArea
