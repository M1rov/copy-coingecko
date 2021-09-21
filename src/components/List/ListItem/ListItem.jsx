import React from 'react';
import './ListItem.css'

const ListItem = ({name, price, img}) => {
    return (
        <div className={'ListItem'}>
            <img src={img} alt={name} width='50px'/>
            Name - {name} - {price}$
        </div>
    );
};

export default ListItem;