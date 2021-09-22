import React, {useEffect, useState} from 'react';
import './List.css'
import ListItem from "./ListItem/ListItem";
import FetchData from "../../actions";
import PageList from "./PageList";
import Input from "../UI/Input";
import sortData from "../../service/service.sorting";

const List = (props) => {
    const [list, setList] = useState(null)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(34)
    const [changePage, setChangePage] = useState(false)
    //const [sortList, setSortList] = useState('price');
    async function fetchList () {
        const data = await FetchData.fetchCurrency( props.match.params.id || 1 ,pageSize)
        const newList = data.map((el, index) => {
            return <ListItem name={el.name} key={index} price={el.current_price} img={el.image}/>
        })
        sortData('price', newList)
        setList(newList)
    }

    useEffect(() => {
        const pageCount = Math.ceil(250/pageSize)
        const massive = []
        for (let i = 0; i < pageCount; i++) {
            massive.push(<PageList key={i} index={i+1}/>)
        }
        setPage(...[massive])
        // eslint-disable-next-line
        fetchList()
    },[props.match.params.id,changePage])

    return (
        <div className={'List'}>
            <Input type={'text'} placeholder={'Min count 10'} value={pageSize} setValue={setPageSize}/>
            <button onClick={() => {
                if (Number(pageSize) < 10){
                    alert('Error size Min Size 10')
                }else{
                    setChangePage(!changePage)
                }
            }}>Change</button>
            {page}
            {list}
        </div>
    );
};

export default List;