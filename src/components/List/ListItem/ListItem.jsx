import React from 'react';
import './ListItem.scss'
import {Link} from 'react-router-dom'
import {PRICE, PRICE_CHANGE_24, PRICE_CHANGE_AT, TOTAL_VOLUME} from "../sortConstants";
import separateBy from "../../../scripts/separateBy";


const ListItem = ({coin, sortParam}) => {
  return (
    <tr className='list-item'>
      <td className="list-item__coin">
        <div className={'list-item__img'}><img src={coin.image} alt={coin.name}/></div>
        {/*Название*/}
        <div className={'list-item__coin-name'}><Link to={`coin/${coin.id}`}>{coin.name}</Link></div>
      </td>
      {/*Цена*/}
      <td
        className={`list-item__price ${sortParam === PRICE ? 'active' : null}`}>
        ${separateBy(coin.current_price, ',')}
      </td>
      {/*Обьём*/}
      <td
        className={`list-item__volume ${sortParam === TOTAL_VOLUME ? 'active' : null}`}>
        ${separateBy(parseInt(coin.total_volume), ',')}
      </td>
      {/*24 h*/}
      <td className={`list-item__percent ${coin.market_cap_change_percentage_24h > 0 ? 'list-item__positive' : null} ${sortParam === PRICE_CHANGE_24 ? 'active' : null}`}>
        {coin.market_cap_change_percentage_24h.toFixed(2)}%
      </td>
      <td className={`list-item__percent ${coin.ath_change_percentage > 0 ? 'list-item_active' : null} ${sortParam === PRICE_CHANGE_AT ? 'active' : null}`}>
        {coin.ath_change_percentage.toFixed(2)}%
      </td>
    </tr>
  );
};

export default ListItem;