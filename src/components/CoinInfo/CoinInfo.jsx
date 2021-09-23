import React, {useEffect, useState} from 'react';
import FetchData from "../../actions";


const CoinInfo = (props) => {
    const [coin, setCoin] = useState(null)
    useEffect(async () => {
        const coinInfo = await FetchData.fetchCurrencyById(props.match.params.id)
        setCoin(coinInfo)
    }, [])
    return coin ? <div>{coin.name}</div> : null
};

export default CoinInfo;