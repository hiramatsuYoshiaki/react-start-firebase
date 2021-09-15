import React,{useState} from 'react'
// import moment from 'moment';
import { TextFields } from '../inputs/textFields/index'
import { requiredCheck } from '../../validations/validations'
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

const InputArea = ({user,setUser, selectUsers,setSelectUsers, photoURL, setPhotoURL}) => {
    const classes = useStyles()
    const [displayName,setDisplayName] = useState(user.displayName)
    const [email,setEmail] = useState(user.email)
    const [errors,setErrors] = useState([])
    console.log('errors',errors);

    const validation = () => {
        console.log('validation');
        const msg = []
        // if(displayName === ''){
        //     msg.push({id:'001',msg:'アカウント名は必須です',field:'displayName'})
        // }
        // if(email === ''){
        //     msg.push({id:'003',msg:'メールアドレスは必須です',field:'email'})
        // }
        // const msg = [
        //     {id:'001',msg:'アカウント名は必須です',field:'displayName'},
        //     {id:'002',msg:'10文字以内',field:'displayName'},
        //     {id:'003',msg:'メールアドレスは必須です',field:'email'},
        //     {id:'004',msg:'メールアドレスの形式が無効です',field:'email'},
        // ]
        if(requiredCheck(displayName,'displayName')){
            msg.push(requiredCheck(displayName,'displayName'))
        }
        setErrors(msg)
    }
    const updateUser = () => {
        console.log('updateUser');
    }
    
    return (
        <div>
            <h5>修正</h5>
            <form 
                onSubmit={e=>{
                    e.preventDefault()
                    validation()
                    if(errors.length === 0){
                        updateUser()
                    }
                }}
            >
                <div>
                    <div>
                        <TextFields 
                            type="text"
                            value={displayName}
                            placeholder=""
                            label="アカウント名"
                            helpers="必須"
                            setValue={setDisplayName}
                            errors={errors}
                            fieldName="displayName"

                        />
                    </div>
                    <div>
                        <TextFields 
                            type="text"
                            value={email}
                            placeholder=""
                            label="メールアドレス"
                            helpers=""
                            setValue={setEmail}
                            errors={errors}
                            fieldName="email"
                        />
                    </div>
                </div>
                <input type="submit" value="変更する" />
            </form>
            <br />
        </div>
    )
}

export default InputArea
