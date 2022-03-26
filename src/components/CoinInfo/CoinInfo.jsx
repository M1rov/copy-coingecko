import React, {useEffect, useState} from 'react';
import './CoinInfo.scss'
import separateBy from "../../scripts/separateBy";
import truncateURL from "../../scripts/truncateURL";
import facebookIcon from '../../images/icons/facebook.svg'
import twitterIcon from '../../images/icons/twitter.svg'
import redditIcon from '../../images/icons/reddit.svg'
import {Link} from "react-router-dom";
import CurrencyController from "../../controllers/currency.controller";
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
import {Line} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const CHART_TYPES = [
  {legend: 'Price', value: 'prices'},
  {legend: 'Market Cap', value: 'market_caps'},
  {legend: 'Total volume', value: 'total_volumes'},
]


const CHART_DAYS = [
  {legend: '24h', value: 1},
  {legend: '7d', value: 7},
  {legend: '14d', value: 14},
  {legend: '30d', value: 30},
  {legend: '90d', value: 90},
  {legend: '180d', value: 180},
  {legend: '1y', value: 365},
]

const CoinInfo = (props) => {
  const [coin, setCoin] = useState(null);
  const [historicalMarketData, setHistoricalMarketData] = useState(null);
  const [chartType, setChartType] = useState(CHART_TYPES[0].value);
  const [chartDays, setChartDays] = useState(1);

  useEffect(() => {
    CurrencyController.getCoinById(props.match.params.id).then(res => {
      setCoin(res)
    });
  }, [props.match.params.id])

  useEffect(() => {
    CurrencyController.getDataById(props.match.params.id, chartType, chartDays).then(data => {
      setHistoricalMarketData(data)
    })
  }, [props.match.params.id, chartType, chartDays])

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          callback: function (value, index) {
            if (index !== 0) {
              if (chartType === 'prices' || chartType === 'market_caps') {
                return `$${separateBy(value, ',')}`
              }
              return separateBy(value, ',');
            }
          }
        }
      },
      x: {
        ticks: {
          callback: function (value, index) {
            if (!(value % 20) && index !== 0) {
              if(chartDays < 14) {
                return this.getLabelForValue(value).match(/[0-9]{2}:[0-9]{2}/);
              }
              return this.getLabelForValue(value).match(/[a-zA-Z]{3} [0-9]{2}/);
            }
          }
        }
      }
    },
  };


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
                    <a key={el} className='coin-info__link' href={el}>{el.split('/')[2]}</a> : null)}
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
                  {coin.categories.map(category => <div key={category} className='coin-info__link'>{category}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
        {historicalMarketData ?
          <div className='coin__chart chart'>
            <div className="chart__title">{coin.name} to USD Chart</div>
            <div className="chart__flex">
              <div className="chart__types">
                {CHART_TYPES.map(type =>
                  <button className={`chart__type ${chartType === type.value ? 'active' : ''}`}
                          onClick={() => setChartType(type.value)}
                          key={type.value}
                  >
                    {type.legend}
                  </button>
                )}
              </div>
              <div className="chart__days">
                <div className="chart__types">
                  {CHART_DAYS.map(day =>
                    <button className={`chart__type ${chartDays === day.value ? 'active' : ''}`}
                            onClick={() => setChartDays(day.value)}
                            key={day.value}
                    >
                      {day.legend}
                    </button>)}
                </div>
              </div>
            </div>
            <Line options={options} data={historicalMarketData}/>
          </div>
          :
          null
        }
      </div>
    </div>
    : null
};

export default CoinInfo;