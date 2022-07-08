
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from "react";
import SignUp from '../SignUp';
import SignIn from "./SignIn";
import AlertMessage from '../AlertMessage';
const AuthModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>Login</Button>{' '}
            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header style={{ margin: "auto" }}>
                    <AlertMessage />
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="signIn"
                        id="uncontrolled-tab-example"
                        style={{ display: "flex", width: "80%", justifyContent: "center", padding: "10px" }}>

                        <Tab eventKey="signIn" title="SignIn" ><SignIn /></Tab>
                        <Tab eventKey="signUp" title="SignUp"><SignUp /></Tab>

                    </Tabs>
                </Modal.Body>


                <Modal.Footer>

                </Modal.Footer>


            </Modal>
        </div>
    );
};

export default AuthModal;