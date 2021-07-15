import React, {useRef, useState, useContext, useEffect } from 'react';
import './button.css';
import { AppContext } from '../AppContextProvider';

const Button = () => {
    const { states,createState, statesLoading, updateState} = useContext(AppContext);
    const [isButtonPushed, setButtonIsPushed] = useState(false);
   
    const buttonRef = useRef();

    // Dynamic Button Style
    const pushedShadowStyle = '0px 0px 2px 0px rgba(0,0,0,0.45)';
    const pushedTransformStyle = 'translate(3px, 3px)';

    const unpushedShadowStyle = '3px 3px 9px 0px rgba(0,0,0,0.45)';
    const unpushedTransformStyle = 'translate(0, 0)';

    //when state from database is updated, update button status
    useEffect(() => {
        if(states[0]) {
            setButtonIsPushed(states[0].state);
        } else {
            setButtonIsPushed(false);
        }
    }, [states[0], isButtonPushed]);

    //when button status is updated, update it's style
    useEffect(() => {
        toggleButton();
    }, [isButtonPushed]);

    //update button's style
    function toggleButton() {
        if(isButtonPushed) {         
            buttonRef.current.style.boxShadow = pushedShadowStyle;
            buttonRef.current.style.transform = pushedTransformStyle;
        } else {
            buttonRef.current.style.boxShadow = unpushedShadowStyle;
            buttonRef.current.style.transform = unpushedTransformStyle;
        }
    }

    //when button is pushed, change it's status
    function handleUpdate() {
         if(states[0]){
             const state = !(isButtonPushed);
             updateState({...states[0],state});
             setButtonIsPushed(!(isButtonPushed));
         } else{
            createState({
                state: true
            });
            setButtonIsPushed(true);
        }
    }


    return(
        <div className="btn-wrapper">
            {
                isButtonPushed ? <img className="bulb" src="/on.PNG"/>
                : <img className="bulb" src="/off.PNG"/>
            }
            {statesLoading ? (
                <h1>Loading...</h1>
            ):
            //function call
            <button ref={buttonRef} className="btn" onClick={handleUpdate}>
                Button
            </button>
            }
            {statesLoading ? (
                <p></p>
            ):
            <p className="description">Button is {isButtonPushed ? "Pressed" : "Unpressed"}</p>
            }
           
        </div>
    );
};

export default Button;