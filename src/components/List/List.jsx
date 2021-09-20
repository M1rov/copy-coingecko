import React, {useEffect, useState} from 'react';
import './List.css'
import ListItem from "./ListItem/ListItem";
import FetchData from "../../actions";

const List = () => {
    const [list, setList] = useState(null)
    async function fetchList () {
        const data = await FetchData.fetchCurrency()
        console.log(data)
        const newList = data.map((el, index) => {
            return <ListItem name={el.name} key={index} price={el.current_price} img={el.image}/>
        })
        setList(newList)
    }
    useEffect(() => {fetchList()},[])

    return (
        <div className={'List'}>
            {list}
        </div>
    );
};

export default List;