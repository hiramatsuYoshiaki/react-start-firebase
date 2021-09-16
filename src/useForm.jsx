import {useState, useCallback} from 'react' 

export const useForm = initialValues => {
    const [values, setValues] = useState(initialValues)

    return [ 
        values, 
        // e => {
        //     setValues({
        //         ...values,
        //         [e.target.name]: e.target.value//インプット項目と値をステートに追加
        //     })
        // }
        useCallback((e)=>{
            setValues({
                ...values,
                [e.target.name]: e.target.value//インプット項目と値をステートに追加
            })
        },[values,setValues])
    ]

} 