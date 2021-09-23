import React from 'react';
import './ListItem.css'
import {Link} from 'react-router-dom'

const ListItem = ({coin}) => {
    return (
        <div className={'ListItem'}>
            <img src={coin.image} alt={coin.name} width='50px'/>
            <Link to={`coin/${coin.id}`}>{coin.name}</Link> - {coin.current_price}$
        </div>
    );
};

export default ListItem;