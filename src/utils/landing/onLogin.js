import url from '../env';
import {verifyEmail, verifyPass} from './verify';


const onLogin = async (email, pass, setEmailErrs, setPassErrs, setAPIErrs) =>{
    const validEmail = verifyEmail(email);
    const validPass = verifyPass(pass);

    if(!validEmail){
        setEmailErrs('E-Mail is not valid')
    }
    if(!validPass){
        setPassErrs('Password is not valid')
    }
    if(validEmail && validPass){
        const resp = await fetch(`${url}/login`, {
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
        if (respJSON.error !== undefined){
            if(respJSON.error === 'no_existing_email'){
                setAPIErrs('E-Mail does not exist');
            }else if(respJSON.error === 'wrong_pass'){
                setAPIErrs('Wrong Password');
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

export default onLogin;