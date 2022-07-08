import { CryptoState } from "../CryptoContext";
import Button from "react-bootstrap/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AiFillDelete } from "react-icons/ai";
import { db } from "../firebase";
import { setDoc,doc } from 'firebase/firestore';


const SideBar = ({ display }) => {
    const { user, coins, watchList, symbol } = CryptoState();
    const removeCoinFromList = async (coin) => {
        const coinRef = doc(db, "coinList", user.uid);
        try {
            await setDoc(coinRef, {
                coins: watchList.filter(watch => watch !== coin)
            }, { merge: true });
            alert("coin remmoved successfully")

        } catch (error) {

            console.log(`${error.message}`)
        }
    }
    return (
        <div>
            {display && (<div className='Sidebar'>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" style={{ height: "150px", }} />
                    {user.email}
                    <div style={{height:"50%",overflow:"auto",width:"100%",textAlign:"center"}}>
                        <span>WATCHLIST</span>
                        {coins?.map(coin => {
                            if (watchList.includes(coin?.id)) {
                                return (<div key={coin.id} style={{ display: "flex", flexDirection: "column", overflow: "auto",margin:"10px" }}>
                                    <span>{coin?.name}</span>
                                    <span style={{ display: "flex", gap:8,justifyContent:"center",alignItems:"center" }}>{symbol}{""}{coin?.current_price.toFixed(2)}
                                        <AiFillDelete onClick={()=>{removeCoinFromList(coin.id)}} style={{ size: "18px" }} />
                                    </span>
                                </div>)
                            } else {
                                return <></>;
                            }
                        })}

                    </div>

                </div>
                <Button size="lg" onClick={() => { signOut(auth) }}>Log Out</Button>
            </div>)}
        </div>
    );
};

export default SideBar;