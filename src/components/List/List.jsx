import React, {useEffect, useState} from 'react';
import './List.css'
import ListItem from "./ListItem/ListItem";
import FetchData from "../../actions";
import PageList from "./PageList";

const List = (props) => {
    const [list, setList] = useState(null)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(34)
    async function fetchList () {
        console.log('here func')
        const data = await FetchData.fetchCurrency( props.match.params.id || 1 ,pageSize)
        const newList = data.map((el, index) => {
            return <ListItem name={el.name} key={index} price={el.current_price} img={el.image}/>
        })
        setList(newList)
    }

    useEffect(() => {
        console.log('here start')
        // eslint-disable-next-line
        fetchList()},[props.match.params.id])

    useEffect(() => {
        const pageCount = Math.ceil(250/pageSize)
        const massive = []
        for (let i = 0; i < pageCount; i++) {
            massive.push(<PageList key={i} index={i+1}/>)
        }
        setPage(...[massive])
    },[pageSize])

    return (
        <div className={'List'}>
            {page}
            {list}
        </div>
    );
};

export default List;