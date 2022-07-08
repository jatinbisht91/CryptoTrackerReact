import { useState } from "react";
import { CryptoState } from "../CryptoContext";
import Button from "react-bootstrap/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AlertMessage from "./AlertMessage";
const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const {  setAlertMessage } = CryptoState();
    const init={
        show:false,
        message:"",
        variant:""

    }

    const handleSubmit = async () => {
        if (!email || !password || !confirmPass) {alert("please fill all the enteries"); return;}
        else if (password !== confirmPass) {alert("password does not match"); return;}
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            setAlertMessage({ show: true, message:`${result.user.email} successfully rergistered`,variant:"success" })
            setTimeout(()=>{
                setAlertMessage(init)
            },3000) 

            console.log(result)
        }
        catch (error) {
            console.log(error.message)
            setAlertMessage({ show: true, message: `${error.message}`, variant: "danger" })
            setTimeout(()=>{
                setAlertMessage(init)
            },3000) 
        }
    }


    return (
        <div >
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
                <input type="password" placeholder="Confirm Password" style={{ width: "60%" }} onChange={(e) => setConfirmPass(e.target.value)} />
                <Button variant="outline-primary" onClick={handleSubmit}>Register User</Button>{' '}
            </div>


        </div>
    );
};

export default SignUp;