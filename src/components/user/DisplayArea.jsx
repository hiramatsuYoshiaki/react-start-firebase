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
                    {/* <div>id:{selectUser.id}</div>
                    <div>メールアドレス:{selectUser.email}</div>
                    <div>アカウント名:{selectUser.name}</div> */}
                    <div>名前（漢字）:{selectUser.nameKanji}</div>
                    <div>名前（カナ）:{selectUser.nameKatakana}</div>
                    <div>生年月日:{selectUser.birthday}</div>
                    <div>性別:{selectUser.sex}</div>
                    <div>郵便番号:{selectUser.post}</div>
                    <div>都道府県:{selectUser.pref}</div>
                    <div>住所:{selectUser.address}</div>
                    <div>ＴＥＬ:{selectUser.tel}</div>
                    {/* <div>作成日:{moment(selectUser.create_at.toDate()).format('YYYY/MM/DD HH:mm')}</div>
                    <div>更新日:{moment(selectUser.create_at.toDate()).format('YYYY/MM/DD HH:mm')}</div> */}
                </div>)}
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
