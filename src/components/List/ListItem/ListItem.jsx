import React from 'react';
import './ListItem.css'
import {Link} from 'react-router-dom'

const ListItem = ({coin}) => {
  // noinspection JSUnresolvedVariable
  return (
    <div className={'list-item'}>
      <div className="list-item__coin">
        <div className={'list-item__img'}><img src={coin.image} alt={coin.name} width='40px'/></div>
        {/*Название*/}
        <div className={'list-item__coin-name'}><Link to={`coin/${coin.id}`}>{coin.name}</Link></div>
      </div>
      {/*Цена*/}
      <div className={'list-item__price'}>{coin.current_price}$</div>
      {/*Обьём*/}
      <div className={'list-item__volume'}>{coin.total_volume > 10000000? `${(coin.total_volume/10000000).toFixed(2)}kkk` : coin.total_volume}$</div>
      {/*24 h*/}
      <div className={`list-item__percent ${coin.market_cap_change_percentage_24h > 0 ? 'list-item_active' : null}`}>
        {coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
      <div className={`list-item__percent ${coin.ath_change_percentage > 0 ? 'list-item_active' : null}`}>
        {coin.ath_change_percentage.toFixed(2)}%</div>
    </div>
  );
};

export default ListItem;