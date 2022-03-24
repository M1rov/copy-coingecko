import React, {useEffect, useState} from 'react';
import './CoinInfo.scss'
import separateBy from "../../scripts/separateBy";
import truncateURL from "../../scripts/truncateURL";
import facebookIcon from '../../images/icons/facebook.svg'
import twitterIcon from '../../images/icons/twitter.svg'
import redditIcon from '../../images/icons/reddit.svg'
import {Link} from "react-router-dom";
import CurrencyController from "../../controllers/currency.controller";

const CoinInfo = (props) => {
  const [coin, setCoin] = useState(null)
  useEffect(() => {
    CurrencyController.getCoinById(props.match.params.id).then(res => {
      setCoin(res)
    })
    // eslint-disable-next-line
  }, [])

  console.log(coin)

  const capitalChange24h = coin?.market_data.market_cap_change_percentage_24h?.toFixed(1);
  const priceInBtc24h = coin?.market_data.price_change_percentage_24h_in_currency?.btc.toFixed(1);

  return coin ?
    <div className='coin'>
      <div className="container">
        <div className="coin__path">
          <span><Link to={'/'}>Coins</Link> ></span> {coin.name}
        </div>
        <div className="coin__overview overview">
          <div className="overview__main">
            <div className="overview__rank">Rank #{coin.market_cap_rank}</div>
            <div className="overview__inline-flex">
              <img src={coin.image.large} alt={coin.name} className='overview__img'/>
              <span className='overview__name'>
                  {coin.name}
                ({coin.symbol.toUpperCase()})
                </span>
            </div>
            <div className="overview__inline-flex">
              {/*Price in USD*/}
              <span className='overview__price'>
                  ${separateBy(coin?.market_data?.current_price.usd, ',')}
                </span>
              {/*Capitalization percentage change for 24h*/}
              <span className={`overview__24h ${capitalChange24h > 0 ? 'text-green' : 'text-red'}`}>
                  {capitalChange24h}%
                </span>
            </div>
            <div className="overview__inline-flex">
              {/*Price in BTC*/}
              <span className='overview__btc-price'>
                  {coin?.market_data?.current_price?.btc} BTC
                </span>
              {/*Price in BTC percentage change for 24h*/}
              <span className={`overview__24h overview__24h_small ${priceInBtc24h > 0 ? 'text-green' : 'text-red'}`}>
                  {priceInBtc24h}%
                </span>
            </div>

            <div className="overview__stats stats">
              <div className="stats__column">
                {
                  coin.market_data.market_cap.usd ?
                    <div className="stats__item">
                      <div className="stats__title">
                        Market Cap
                      </div>
                      <div className="stats__info">
                        ${separateBy(coin.market_data.market_cap.usd, ',')}
                      </div>
                    </div>
                    :
                    null
                }
                {
                  coin.market_data.total_volume.usd ?
                    <div className="stats__item">
                      <div className="stats__title">
                        24 Hour Trading Vol
                      </div>
                      <div className="stats__info">
                        ${separateBy(coin.market_data.total_volume.usd, ',')}
                      </div>
                    </div>
                    :
                    null
                }
                {
                  coin.market_data.fully_diluted_valuation.usd ?
                    <div className="stats__item">
                      <div className="stats__title">
                        Fully Diluted Valuation
                      </div>
                      <div className="stats__info">
                        ${separateBy(coin.market_data.fully_diluted_valuation.usd, ',')}
                      </div>
                    </div>
                    :
                    null
                }
              </div>
              <div className="stats__column">
                {
                  coin.market_data.circulating_supply ?
                    <div className="stats__item">
                      <div className="stats__title">
                        Circulating Supply
                      </div>
                      <div className="stats__info">
                        {separateBy(coin.market_data.circulating_supply, ',')}
                      </div>
                    </div>
                    :
                    null
                }
                <div className="stats__item">
                  <div className="stats__title">
                    Total Supply
                  </div>
                  <div className="stats__info">
                    {separateBy(coin.market_data.total_supply, ',') || '∞'}
                  </div>
                </div>
                {
                  coin.market_data.max_supply ?
                    <div className="stats__item">
                      <div className="stats__title">
                        Max Supply
                      </div>
                      <div className="stats__info">
                        {separateBy(coin.market_data.max_supply, ',')}
                      </div>
                    </div>
                    :
                    null
                }
              </div>
            </div>
          </div>
          <div className="coin__coin-info coin-info">
            <h2 className="coin-info__header">
              Info
            </h2>
            <div className="coin-info__media">
              <div className="coin-info__media-item">
                <span>Website</span>
                <div className="coin-info__contact-tab">
                  <a href={coin.links.homepage} className='coin-info__link'>
                    {truncateURL(coin.links.homepage[0])}
                  </a>
                </div>
              </div>
              <div className="coin-info__media-item">
                <span>Explorers</span>
                <div className="coin-info__contact-tab">
                  {coin.links.blockchain_site.map(el => el ?
                    <a className='coin-info__link' href={el}>{el.split('/')[2]}</a> : null)}
                </div>
              </div>
              <div className="coin-info__media-item">
                <span>Community</span>
                <div className="coin-info__contact-tab">
                  <a className='coin-info__link' href={`https://twitter.com/${coin.links.twitter_screen_name}`}>
                    <img src={twitterIcon} alt="twitter"/>
                    Twitter
                  </a>
                  <a className='coin-info__link' href={coin.links.subreddit_url}>
                    <img src={redditIcon} alt="reddit"/>
                    Reddit
                  </a>
                  <a className='coin-info__link' href={`https://www.facebook.com/${coin.links.facebook_username}`}>
                    <img src={facebookIcon} alt="facebook"/>
                    Facebook
                  </a>
                </div>
              </div>
              <div className="coin-info__media-item">
                <span>Source Code</span>
                <div className="coin-info__contact-tab">
                  <a className='coin-info__link' href={coin?.links?.repos_url.github[0]}>Github</a>
                </div>
              </div>
              <div className="coin-info__media-item">
                <span>API id</span>
                <div className="coin-info__contact-tab">
                  <div className='coin-info__link'>{coin.id}</div>
                </div>
              </div>
              <div className="coin-info__media-item">
                <span>Tags</span>
                <div className="coin-info__contact-tab">
                  {coin.categories.map(cat => {
                    return <div className='coin-info__link'>{cat}</div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    : null
};

export default CoinInfo;