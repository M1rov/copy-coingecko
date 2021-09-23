import React, {useEffect, useState} from 'react';
import FetchData from "../../actions";
import './CoinInfo.css'

const CoinInfo = (props) => {
  const [coin, setCoin] = useState(null)
  useEffect(async () => {
    const coinInfo = await FetchData.fetchCurrencyById(props.match.params.id)
    console.log(coinInfo.genesis_date)
    setCoin(coinInfo)
  }, [])
  return coin ?
    <div className={`coin-info`}>
      <span><img src={coin.image.large} alt={coin.name}/></span>
      {coin.genesis_date ? <span>Дата основания - <b>{coin.genesis_date}</b></span> : null }
      <span className={''}>{coin.market_data.current_price.usd}$</span>
      {/*Обьём*/}
      <span>{coin.market_data.market_cap.usd}</span>
      {/*24 h*/}
      <div className="coin-percent">
        <span><b>1H</b>  {coin.market_data.price_change_percentage_1h_in_currency.usd}%</span>
        <span><b>24H</b>  {coin.market_data.market_cap_change_percentage_24h}%</span>
        <span><b>7D</b>  {coin.market_data.price_change_percentage_7d_in_currency.usd}%</span>
        <span><b>30D</b>  {coin.market_data.price_change_percentage_30d_in_currency.usd}%</span>
      </div>


      <span>Description <p>{coin.description.en}</p></span>
    </div>
    : null
};

export default CoinInfo;