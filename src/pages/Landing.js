import Modal from 'react-modal';
import React, { useState } from 'react';
import '../styles/Landing.css';
import onLogin from '../utils/landing/onLogin';
import onSignUp from '../utils/landing/onSignup';
import { useHistory } from "react-router-dom";

const Landing = () => {
    Modal.setAppElement('body');
    const [lOpen, setLOpen] = useState(false);
    const [sOpen, setSOpen] = useState(false);
    const [emailErrs, setEmailErrs] = useState('');
    const [passErrs, setPassErrs] = useState('');
    const [apiErrs, setAPIErrs] = useState('');
    const history = useHistory();

    const processLogin = async () => {
        clearState();
        const loginSuccess = await onLogin(document.getElementById('loginEmail').value, document.getElementById('loginPass').value, setEmailErrs, setPassErrs, setAPIErrs)
        console.log("VALUE OF loginSuccess is", loginSuccess)
        if (loginSuccess === true){
            console.log("Should be pushing a new route")
            history.push("/home");
        }
    }
    const processSignUp = () => {
        clearState();
        onSignUp(document.getElementById('signUpEmail').value, document.getElementById('signUpPass').value, document.getElementById('signUpConfirm').value, setEmailErrs, setPassErrs, setAPIErrs)
    }
    const setPass = (id) => {
        document.getElementById(id).type = 'password';
    }
    const clearState = () => {
        setEmailErrs('')
        setPassErrs('')
        setAPIErrs('')
    }
    return (
        <div className='Landing'>
            <div className='title'>Command Helper</div>

            <div className='accountButtons'>
                <button id='loginButton' onClick={() => {
                    setLOpen(true)
                }}>Login</button>
                <button id='signUpButton' onClick={() => {
                    setSOpen(true)
                }}>Sign Up</button>
            </div>

            {/* LOGIN MODAL */}
            <Modal
                className='accountModals'
                isOpen={lOpen}
                onRequestClose={() => {
                    setLOpen(false);
                    clearState();
                }}
            >
                <div className='modalTitle'>Login</div>
                <input type='text' placeholder='E-Mail' id='loginEmail' className='modalInput'></input>
                <div className='modalErrors'>{emailErrs}</div>
                <input type='text' placeholder='Password' id='loginPass' onFocus={() => { setPass('loginPass') }} className='modalInput'></input>
                <div className='modalErrors'>{passErrs}</div>
                <div className='modalErrors'>{apiErrs}</div>
                <button className='modalButton' onClick={async()=>{await processLogin()}}>Login</button>
                <div className='modalBottomText'>Don't have an account?</div>
                <button className='modalButton' onClick={() => {
                    clearState();
                    setLOpen(false);
                    setSOpen(true);
                }}>Sign Up</button>
            </Modal>

            {/* SIGN UP MODAL */}
            <Modal
                className='accountModals'
                isOpen={sOpen}
                onRequestClose={() => {
                    clearState();
                    setSOpen(false)
                }}
            >
                <div className='modalTitle'>Sign Up</div>
                <input type='text' placeholder='E-Mail' id='signUpEmail' className='modalInput'></input>
                <div className='modalErrors'>{emailErrs}</div>
                <input type='text' placeholder='Password' id='signUpPass'
                    onFocus={() => { setPass('signUpPass') }} className='modalInput'></input>
                <input type='text' placeholder='Confirm Password' id='signUpConfirm'
                    onFocus={() => { setPass('signUpConfirm') }} className='modalInput'></input>
                <div className='modalErrors'>{passErrs}</div>
                <div className='modalErrors'>{apiErrs}</div>
                <button className='modalButton' onClick={async()=>{await processSignUp()}}>Sign Up</button>
                <div className='modalBottomText'>Already have an account?</div>
                <button className='modalButton' onClick={() => {
                    clearState();
                    setSOpen(false);
                    setLOpen(true);
                }}>Login</button>
            </Modal>
        </div>
    )
}

export default Landing;