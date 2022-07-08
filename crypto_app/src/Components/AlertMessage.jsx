import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { CryptoState } from '../CryptoContext';
const AlertMessage = () => {
   const {alertMessage} = CryptoState();
   const{show,variant,message}=alertMessage;

    return (
        <div>
    {show && <Alert variant={variant}>{message}</Alert>}


        </div>
    );
};

export default AlertMessage;