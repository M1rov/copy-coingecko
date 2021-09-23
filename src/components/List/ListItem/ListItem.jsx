import React, {useEffect} from 'react';
import './ListItem.css'
import {Link} from 'react-router-dom'

const ListItem = ({coin}) => {
  // noinspection JSUnresolvedVariable
  return (
    <div className={'ListItem'}>
      <span><img src={coin.image} alt={coin.name} width='50px'/></span>
      {/*Название*/}
      <span><Link to={`coin/${coin.id}`}>{coin.name}</Link></span>
      {/*Цена*/}
      <span>{coin.current_price}$</span>
      {/*Обьём*/}
      <span>{coin.total_volume}</span>
      {/*24 h*/}
      <span>{coin.market_cap_change_percentage_24h}%</span>
    </div>
  );
};

export default ListItem;