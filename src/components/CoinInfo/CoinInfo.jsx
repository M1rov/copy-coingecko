import React, {useEffect, useState} from 'react';
import FetchData from "../../actions";
import './CoinInfo.css'

const CoinInfo = (props) => {
  const [coin, setCoin] = useState(null)
  useEffect(() => {
    FetchData.fetchCurrencyById(props.match.params.id).then(res => {
      setCoin(res)
    })
    // eslint-disable-next-line
  }, [])
  return coin ?
    <div className={`coin-info`}>
      <div className="coin-info__overview">
        <div className="coin-info__review">
          <span><img src={coin.image.large} alt={coin.name}/></span>
          {coin.genesis_date ? <span>Дата основания - <b>{coin.genesis_date}</b></span> : null }
          <span className={''}>{coin.market_data.current_price.usd}$</span>
          {/*Обьём*/}
          <span>{coin.market_data.market_cap.usd}</span>
          {/*24 h*/}
        </div>
        <div className="coin-info__market">
          <span><b>1H</b>  {coin.market_data.price_change_percentage_1h_in_currency.usd}%</span>
          <span><b>24H</b>  {coin.market_data.market_cap_change_percentage_24h}%</span>
          <span><b>7D</b>  {coin.market_data.price_change_percentage_7d_in_currency.usd}%</span>
          <span><b>30D</b>  {coin.market_data.price_change_percentage_30d_in_currency.usd}%</span>
        </div>
      </div>
      <div className="coin-info__contact">
        <div className="coin-info__contact__header">
          Info
        </div>
        <div className="coin-info__contact__media">
          <div className="coin-info__contact__media__item">
            <span>Website</span>
            <div className="coin-info__contact__tab">
              <span><a href={coin.links.homepage}>{(coin.links.homepage)}</a></span>
            </div>
          </div>
          <div className="coin-info__contact__media__item">
            <span>Explorers</span>
            <div className="coin-info__contact__tab">
              {coin.links.blockchain_site.map(el => el ? <span><a href={el}>{el.split('/')[2]}</a></span> : null)}
            </div>
          </div>
          <div className="coin-info__contact__media__item">
            <span>Wallets</span>
            <div className="coin-info__contact__tab">

            </div>
          </div>
          <div className="coin-info__contact__media__item">
            <span>Community</span>

            <div className="coin-info__contact__tab">
              <span><a href={`https://twitter.com/${coin.links.twitter_screen_name}`}>Twitter</a></span>
              <span><a href={coin.links.subreddit_url}>Reddit</a></span>
              <span><a href={`https://www.facebook.com/${coin.links.facebook_username}`}>Facebook</a></span>
            </div>
          </div>
          <div className="coin-info__contact__media__item">
            <span>Source Code</span>
            <div className="coin-info__contact__tab">
              {coin.links.repos_url.github.map(el => <span><a href={el}>Github</a></span>)}
            </div>
          </div>
          <div className="coin-info__contact__media__item">
            <span>Api id</span>
            <div className="coin-info__contact__tab">
              <span>{coin.id}</span>
            </div>
          </div>
          <div className="coin-info__contact__media__item">
            <span>Tags</span>
            <div className="coin-info__contact__tab">
              {coin.categories.map(cat => {
                return <span>{cat}</span>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    : null
};

export default CoinInfo;