import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { TrendingCoins } from "../Config/api";
import axios from "axios";
import { Link } from "react-router-dom";

const Carousal = () => {
    const [trendingCoins, setTrendingCoins] = useState([]);
    const { currency, symbol } = CryptoState();

    const getTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrendingCoins(data);
    }
    useEffect(() => {
        getTrendingCoins();
    }, [currency])
    return (


        <div className="carousal"
            style={
                {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "150px"
                }
            }>
            {
                trendingCoins.map((trending) => {
                    return (
                        <Link to={`/coin/${trending.id}`} >   
                         <div key={
                            trending.id
                        }
                            style={
                                {
                                    height: "97px",
                                    width: "174px"
                                }
                            }><img src={
                                trending.image
                            }
                                alt="" /></div>
                        </Link>
                    )
                })
            } </div>


    );
};

export default Carousal;
