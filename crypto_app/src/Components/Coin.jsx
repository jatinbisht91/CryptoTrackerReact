import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { SingleCoin } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import CoinChart from "./CoinChart";
import Button from "react-bootstrap/Button";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";




const Coin = () => {
    const { id } = useParams();
    const [coinInfo, setCoinInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const { currency, symbol, user, watchList } = CryptoState();

    const inWatchList = watchList.includes(coinInfo?.id)
    const getCoinInfo = async () => {

        const { data } = await axios.get(SingleCoin(id));
        setCoinInfo(data)
        setLoading(false);
    }
    useEffect(() => {
        getCoinInfo();
    }, [])

     const addCoinToTheList = async () => {
         const coinRef = doc(db, "coinList", user?.uid);
         try {
             await setDoc(coinRef, {
                 coins: watchList ? [...watchList, coinInfo?.id] : [coinInfo?.id]
             }, { merge: true });
             alert(`${coinInfo?.id} added to the list successfully`)
         } catch (error) {
             alert(`${error.message}`)
        }
     }


     const removeCoinFromList = async() => {
        const coinRef= doc(db,"coinList",user.uid);
         try{
             await setDoc(coinRef,{
                 coins:watchList.filter(watch=>watch!==coinInfo?.id)
             },{merge:true});
             alert("coin remmoved successfully")

         }catch(error){

             console.log(`${error.message}`)
         }
     }
    return (
        <div>
            {loading ? (<h1>loading...</h1>) : (
                <div className="coin-info">
                    <div className="sidebar">
                        <img src={coinInfo?.image.large} alt="coin-image" style={{ width: "100px", height: "100px" }} />
                        <h1>{coinInfo?.name}</h1>
                        <div style={{ width: "80%" }}>
                            <p style={{ textAlign: "center", fontSize: "15px" }}>{coinInfo?.description.en.split(". ")[0]}</p></div>
                        <h5>Rank &nbsp; &nbsp; {coinInfo?.market_cap_rank} </h5>
                        <h4>Current Price: &nbsp; &nbsp;{coinInfo?.market_data.current_price[currency.toLowerCase()]}</h4>
                        {user &&
                            <Button style={{ backgroundColor: inWatchList ? "red" : "blue", width: "100%" }} onClick={inWatchList ? removeCoinFromList : addCoinToTheList}>{inWatchList ? "Remove from the List" : "Add to the watchList"}</Button>}
                    </div>
                    <div className="coin-chart"><CoinChart coinInfo={coinInfo} /></div>
                </div>
            )}

        </div>
    );
};

export default Coin;