import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const ResetPass = () => {
    const history = useHistory()
    const [email,setEmail] = useState('')
    const resetPass = () => {
        console.log('reastPass');
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Password reset email sent!');
            // Password reset email sent!
            // ..
            history.push('/login')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error code',errorCode);
            console.log('errorMessage',errorMessage);
            // ..
        });
    }
    return (
        <div>
            <h3>パスワードを再設定します。</h3>
            <div>
            <p>パスワードをリセットしたいメールアドレスを入力してください。</p>
            <label htmlFor="email">
                E-mail 
                <input type="email" id="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} />
            </label>
            </div>
            <br />
            <button onClick={() => resetPass()}>Rest Password</button>
        </div>
    )
}

export default ResetPass
