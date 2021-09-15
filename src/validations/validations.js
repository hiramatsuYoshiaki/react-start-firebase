export const requiredCheck = (field,fieldName) => {
    
    if(field === ''){
        const msg = {id:'001',msg:'アカウント名は必須です',field:'displayName'}
        return msg
    }else {
        return null
    }
    
}