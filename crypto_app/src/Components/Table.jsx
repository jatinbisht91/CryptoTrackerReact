import axios from "axios";
import { CoinList } from "../Config/api";
import { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import{useNavigate} from "react-router-dom"
const Table = () => {

   //  const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("")
    const navigate=useNavigate()
    const { currency, symbol,coins,setCoins } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        //console.log(data);
        setCoins(data);
        setLoading(false);
    }
    useEffect(() => {
        fetchCoins()
    }, [currency])

    const handleSearch = () => {
        return coins.filter(coin => coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search))
      }

    return (
        <div>
            <input type="text" placeholder="Search your favourite crypto" value={search} onChange={e => setSearch(e.target.value)} />
            {loading ? (<h1>loading....</h1>) :
                (<table >
                    {handleSearch().map((coin) => {
                        const profit = (coin.price_change_percentage_24h > 0)
                        return (
                         
                          <tr key={coin.id} onClick={()=>{navigate(`/coin/${coin.id}`)}}>
                          <td>
                              <div style={{ display: "flex", alignItems: "center", padding: "16px" }}>
                                  <div style={{ height: "50px", borderRadius: "50%", marginRight: "15px" }}><img src={coin.image} alt="" style={{ objectFit: "cover", height: "100%" }} /></div>
                                  <div className="content">
                                      <h1>{coin.symbol.toUpperCase()}</h1>
                                      <h2>{coin.name}</h2>
                                  </div>
                              </div>
                          </td>
                          <td style={{ textAlign: "center", fontSize: "20px" }}>{symbol} {coin.current_price}</td>
                          <td style={{ textAlign: "center", color: profit > 0 ? "green" : "red", fontSize: "20px" }}>{coin.price_change_percentage_24h}</td>
                          <td style={{ textAlign: "center", fontSize: "20px" }}>{symbol} {coin.market_cap}</td>
                      </tr>
                          
                            
                          
                        )
                    })}
                </table>



                )}
        </div>
    );
};

export default Table;