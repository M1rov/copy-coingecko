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
    const [sortList, setSortList] = useState(null);
    const [sortMethod, setSortMethod] = useState(false);
    async function fetchList () {
        const data = await FetchData.fetchCurrencyList( props.match.params.id || 1 ,pageSize)
        sortData(sortList, data, sortMethod)
        const newList = data.map((el, index) => {
            return <ListItem key={el.id} coin={el}/>
        })
        setList(newList)
    }

    useEffect(() => {

    }, [])

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
        <div className={'list'}>
            <div className="list-pagelist">
                <Input type={'text'} placeholder={'Min count 10'} value={pageSize} setValue={setPageSize}/>
                <button onClick={() => {
                    if (Number(pageSize) < 10){
                        alert('Error size Min Size 10')
                    }else{
                        setChangePage(!changePage)
                    }
                }}>Change</button>
                {page}
            </div>
            <div className="list-items">
                {list}
            </div>
        </div>
    );
};

export default List;