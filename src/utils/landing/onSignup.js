import url from '../env';
import {verifyEmail, verifyPass} from './verify';

const onSignUp = async (email, pass, confirm, setEmailErrs, setPassErrs, setAPIErrs) =>{
    const validEmail = verifyEmail(email);
    const validPass = verifyPass(pass);

    if(!validEmail){
        setEmailErrs('E-Mail is not valid')
    }
    if(!validPass){
        setPassErrs('Password is not valid')
    }
    if(pass !== confirm){
        setPassErrs('Passwords do not match')
    }
    if(validEmail && validPass){
        const resp = await fetch(`${url}/createuser`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "email":email,
                "pass": pass
            })
        });
        const respJSON = await resp.json()
        if(respJSON.error !== undefined){
            if(respJSON.error === 'non_unique_email'){
                setAPIErrs('E-Mail in use\nPlease sign in')
            }else{
                setAPIErrs('Undefined Error')
            }
            return false;
        }
        if (respJSON.status === 'success'){
            return true;
        }
    }
}

export default onSignUp;
