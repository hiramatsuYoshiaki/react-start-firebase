import { getFirestore, collection, getDocs, query, where  } from "firebase/firestore";

export const getSelectUsers = async (selectUsers,setSelectUsers,uid) => {
    console.log('getSelectUsers')
    console.log('uid',uid)
    
    if(uid){
        const selectUsers = []

        const db = getFirestore();
        const citiesRef = collection(db, "users");
        const q = query(citiesRef, where("id", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const user = doc.data()
        selectUsers.push(user)
        });
        setSelectUsers(selectUsers)
    }else{
        setSelectUsers([])
    }
}