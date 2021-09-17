import React,{useState,useCallback, useEffect} from 'react'
// import moment from 'moment';
import { useForm } from '../../useForm'
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
    const fields = [
        {id:'01',name:'displayName',type:'text',label:"アカウント名", helpers:"必須"},
        {id:'02',name:'email',type:'email',label:"メールアドレス", helpers:"必須"},
        {id:'03',name:'photoURL',type:'text',label:"アバター", helpers:"必須"},
    ]
    

    const [values,handleChange] = useForm({
        email:user.email,
        displayName:user.displayName,
        photoURL:user.photoURL,
        nameKanji:'',
        nameKana:'',
        birthday:'',
        sex:'',
        post:'',
        pref:'',
        address:'',
        tel:'',


        //auth
        // uid:'',
        // email:'',
        // displayName:'',
        // photoURL:'',
        //firestore
        // id: authCurrentUser.uid,
        // email: authCurrentUser.email,
        // name: authCurrentUser.displayName,
        // photoURL: authCurrentUser.photoURL,
        // nameKanji:'',
        // nameKana:'',
        // birthday:'',
        // sex:'',
        // post:'',
        // pref:'',
        // address:'',
        // tel:'',
        // create_at:serverTimestamp(),
        // update_at:serverTimestamp(),

        //storeage
    })
    // const [userInfo, setUserInfo] = useState({
    //     firstName:'fname',
    //     lastName:'lname',
    //     birthday:'birth',
    //     sex:'mail/femail',
    //     post:'700111',
    //     pref:'岡山',
    //     address:'南区大福111',
    //     tel:'090111222'
    // })

    const inputHandleChange = useCallback(e=>{
        handleChange(e)
    },[handleChange])

    const [displayName,setDisplayName] = useState(user.displayName)
    const inputDisplayName = useCallback((e) => {
        setDisplayName(e.target.value)
    },[setDisplayName])
    

    const [email,setEmail] = useState(user.email)
    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[setEmail])

    // const [userInfo, setUserInfo] = useState({
    //     firstName:'fname',
    //     lastName:'lname',
    //     birthday:'birth',
    //     sex:'mail/femail',
    //     post:'700111',
    //     pref:'岡山',
    //     address:'南区大福111',
    //     tel:'090111222'
    // })
    // const setMoreInfo = (e) => {
    //     console.log('setMoreInfo');
    //     setUserInfo({
    //         ...userInfo,
    //         [e.target.name]: e.target.value
    //       });
    // }


    const [errors,setErrors] = useState([])
    console.log('errors',errors);

    const validations = () => {
        console.log('2.validation');
        const msg = []
        if(requiredCheck(values.displayName,'displayName')){
            msg.push(requiredCheck(values.displayName,'displayName'))
        }
        if(requiredCheck(values.email,'email')){
            msg.push(requiredCheck(values.email,'email'))
        }
        setErrors(msg)
        console.log('validation end');
    }
    const updateUser =  () => {
        console.log('1.updateUser');
        // alert('update User--> displayName: ' + values.displayName + '  email: ' + values.email )
        // console.log(isValidated);
    }
    useEffect(()=>{
        // validations()
        console.log(values.displayName);
        console.log(values.email);
    },[values])

    return (
        <div>
            <h5>修正</h5>
            <form 
                onSubmit={e=>{
                    e.preventDefault()
                    if(errors.length === 0 ){
                        updateUser()
                        // alert('update User!!')
                    }
                }}
            >
                <div>
                    { fields.map((field)=>(
                        <TextFields 
                            key={field.id}
                            type={field.type}
                            // value={displayName}
                            value={values[field.name]}
                            placeholder="" 
                            label={field.label}
                            helpers={field.helpers}
                            // setValue={setDisplayName} //useState
                            // setValue={inputDisplayName} //useCallback
                            //setValue={handleChange} //useForm
                            setValue={inputHandleChange} //useForm+useCallback
                            errors={errors}
                            fieldName={field.name}
                        />
                    ) )}
                    {/* <div>
                        <TextFields 
                            type="text"
                            // value={displayName}
                            value={values.displayName}
                            placeholder="" 
                            label="アカウント名"
                            helpers="必須"
                            // setValue={setDisplayName} //useState
                            // setValue={inputDisplayName} //useCallback
                            setValue={handleChange} //useForm
                            errors={errors}
                            fieldName="displayName"
                        />
                    </div> */}
                    {/* <div>
                        <TextFields 
                            type="text"
                            // value={email}
                            value={values.email}
                            placeholder=""
                            label="メールアドレス"
                            helpers=""
                            // setValue={inputEmail}
                            setValue={handleChange}
                            errors={errors}
                            fieldName="email"
                        />
                    </div> */}
                </div>
                <input type="submit" value="変更する" />
            </form>
            <br />
        </div>
    )
}

export default InputArea
