import { getAuth, onAuthStateChanged } from "@firebase/auth"
export const listenAuth = ( user, setUser,isLoginCheck, setIsLoginCheck) => {
    const auth = getAuth();
    setIsLoginCheck(true)
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log('listenAuth onAuthStateChanged user logged in', user.uid);
          setUser(user)
        } else {
          // console.log('listenAuth onAuthStateChanged user logged out');
          setUser(null)
        }
        setIsLoginCheck(false)
      });
}