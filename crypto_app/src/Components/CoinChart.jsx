import { useEffect, useState } from "react";
import { HistoricalChart } from "../Config/api";
import { Line } from "react-chartjs-2";
import { CryptoState } from "../CryptoContext";
import { chartDays } from "../Config/data";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ coinInfo }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coinInfo.id, days, currency));

    console.log(data)
    setHistoricData(data.prices);

  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);
  return (
    <div style={{width:"90%"}}>
      <Line
        data={{
          labels: historicData.map(data => {
            let date = new Date(data[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {

              data: historicData.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
            }
          ]
        }}
      />

      <div style={{ display: "flex",justifyContent:"space-around" }}>{chartDays.map(btn => (<button onClick={() => { setDays(btn.value) }}>{btn.label}</button>))}</div>
    </div>
  );
};

export default CoinChart;