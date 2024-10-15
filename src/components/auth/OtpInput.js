import React, { useCallback, useEffect, useRef, useState } from 'react';
import { verifyOtp } from '../../services/signup';

/**
* Component to input and verify otp for email or mobile
*/
function OtpVerify(props) {
    const { setCallBack, valid } = props;
    const [otp, setOtp] = useState('');

    // Individual otp digit states
    const [num_1, setNum_1] = useState('');
    const [num_2, setNum_2] = useState('');
    const [num_3, setNum_3] = useState('');
    const [num_4, setNum_4] = useState('');

    // Input refs for otp digit inputs
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);

    const [seconds, setSeconds] = useState(10);

    const [errorFlash, setErrorFlash] = useState('');

    // Bring focus to first input on render
    useEffect(() => {
        input1Ref.current.focus();
    }, []);

    /**
    * Validates the input upon clicking next button in the Signup parent page
    * and sets the values of valid as true or false.
    * If timed out, sends false regardless of input. 
    */
    const callBack = useCallback(async (setValid) => {
        if (seconds > 0) {
            setValid(await verifyOtp({ "otp": otp }, setErrorFlash));
            if (valid === false||setErrorFlash!=='') {
                reset();
            }
        } else {
            setValid(false);
        }
    }, [otp, seconds, valid]);



    /**
    * Sets the full 4 digit otp by concatenating the individual digit inputs
    */
    useEffect(() => {
        setOtp(num_1 + num_2 + num_3 + num_4);
    }, [num_1, num_2, num_3, num_4]);

    /**
    * Timer for otp input
    */
    useEffect(() => {
        // Counter for the OTP timer
        if (seconds > 0) {
            const timer = setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
            return () => clearTimeout(timer); // Cleanup the timer
        } else {
            // Timer has reached 0, show timeout message
            setErrorFlash('Timeout');
        }
    }, [seconds]);

    const handleChange = (e, setNum, nextInputRef) => {
        const value = e.target.value;
        if (value.length === 1) {
            setNum(value); // Set the value for the current input
            if (nextInputRef) {
                nextInputRef.current.focus(); // Shift focus to the next input
            }
        }
    };

    /**
    * Sets the callBack() as the setCallBack function in parent userType page 
    */
    useEffect(() => {
        setCallBack(() => callBack);
    }, [callBack, setCallBack]);

    /**
    * Resets the timer and input values and focus when resending otp
    */
    const resendOtp = () => {
        // Reset the OTP function
        setSeconds(10);
        setErrorFlash('');
        reset();

    };
    /**
     * Resets the otp values and returns focus to first input
     */
    const reset = () => {
        setNum_1('');
        setNum_2('');
        setNum_3('');
        setNum_4('');
        input1Ref.current.value = '';
        input2Ref.current.value = '';
        input3Ref.current.value = '';
        input4Ref.current.value = '';
        input1Ref.current.focus();
        // Focus back to the first input
    }
    return (
        <div>
            <input
                maxLength="1"
                ref={input1Ref}
                type="tel"
                onChange={(e) => handleChange(e, setNum_1, input2Ref)}
                placeholder="0"
            />
            <input
                maxLength="1"
                ref={input2Ref}
                type="tel"
                onChange={(e) => handleChange(e, setNum_2, input3Ref)}
                placeholder="0"
            />
            <input
                maxLength="1"
                ref={input3Ref}
                type="tel"
                onChange={(e) => handleChange(e, setNum_3, input4Ref)}
                placeholder="0"
            />
            <input
                maxLength="1"
                ref={input4Ref}
                type="tel"
                onChange={(e) => handleChange(e, setNum_4)}
                placeholder="0"
            />
            <p>Dev note: 1234</p>
            <p>Time left: {seconds} seconds</p>
            <button onClick={resendOtp} disabled={seconds !== 0}>Resend</button>
            <p>{errorFlash}</p>

        </div>
    );
}
export default OtpVerify;