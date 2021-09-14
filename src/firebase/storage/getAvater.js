import { getStorage, ref, getDownloadURL} from "firebase/storage";

export const getAvater = (photoURL, setPhotoURL,url) => {
    console.log('getAvater')
    console.log(url)
    const storage = getStorage();
        //以下3つの方法で参照を作成できます
        //1.子パス
        // const reference = ref(storage, 'users/undraw_profile_pic_ic5t.png');
        // 2. //URL(gs://)オブジェクトを参照 
        // const reference = ref(storage, 'gs://h-works.appspot.com/users/undraw_profile_pic_ic5t.pngg');
        // 3. //URL(https://)オブジェクトを参照 
        // const reference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/h-works.appspot.com/o/users%2Fundraw_profile_pic_ic5t.png?alt=media&token=356b019e-9542-4b8c-9b40-39fcfb3b0b53g');
       
        const reference = ref(storage, url);
        getDownloadURL(reference)
        .then((url) => {
            console.log('photoURL',url);
            setPhotoURL(url)
        })
        .catch((error) => {
            console.log('storage getDownloadURL error');
            console.log(error);
            setPhotoURL("")
        })
}