import { useState } from 'react';
import SideBar from './SideBar';
import { CryptoState } from '../CryptoContext';

const LoginPage = () => {
    const [display, setDisplay] = useState(false);
    const {user}=CryptoState()
    return (
        <div style={{display:"flex",justifyContent:"content",alignItems:"center",padding:"15px"}}>
            <h5 style={{ position: "relative", cursor: "pointer" }} onClick={() => { setDisplay(!display) }}>{user?.email.slice(0,6).toUpperCase()}</h5>
            <SideBar display={display} />
        </div>
    );
};

export default LoginPage;