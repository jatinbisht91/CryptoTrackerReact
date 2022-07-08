
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AlertMessage from "../AlertMessage";
import { CryptoState } from "../../CryptoContext";

import Button from 'react-bootstrap/Button';
const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAlertMessage } = CryptoState();
    const init = {
        show: false,
        message: "",
        variant: ""

    }

    const handleSubmit = async () => {
        if (!password || !email) {alert(" fill all fields"); return;} 
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            setAlertMessage({ show: true, message: `${response.user.email} successfully signed in`, variant: "success" })
            setTimeout(() => {
                setAlertMessage(init)
            }, 3000)

        } catch (error) {
            setAlertMessage({ show: true, message: `${error.message}`, variant: "danger" })
            setTimeout(()=>{
                setAlertMessage(init)
            },3000) 
        }
    }

    return (
        <div>
            {/* <AlertMessage /> */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
                marginTop: "10px"
            }} >

                <input type="email" placeholder="Email" style={{ width: "60%" }} onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder="Password" style={{ width: "60%" }} onChange={(e) => { setPassword(e.target.value) }} />
                <Button variant="outline-primary" onClick={handleSubmit}>login</Button>{' '}
            </div>
        </div>
    );
};

export default SignIn;