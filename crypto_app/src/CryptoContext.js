import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { onSnapshot, doc } from "firebase/firestore";
const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);

  const [alertMessage, setAlertMessage] = useState({ show: false, message: "", variant: '' });
  const [watchList, setWatchList] = useState("")
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log(user)
      }
      else setUser(null)
    })
  }, [])


  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "coinList", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchList(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);


  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, user, setAlertMessage, alertMessage, watchList, coins, setCoins }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
