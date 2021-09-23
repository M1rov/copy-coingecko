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
        <div className={'wrapper'}>
            <header className="header">
                <div className="container">
                    <nav className="nav">
                        <div className="header__pages">
                            {page}
                        </div>
                        <div className='header__input'>
                            <Input type={'text'} placeholder={'Min: 10'} value={pageSize} setValue={setPageSize}/>
                            <button className={'header__button'} onClick={() => {
                                if (Number(pageSize) < 10){
                                    alert('Error size Min Size 10')
                                }else{
                                    setChangePage(!changePage)
                                }
                            }}>Change</button>
                        </div>
                    </nav>
                </div>
            </header>
            <div className="list">
                <div className="container">
                    <div className="list__header">
                        <div className="list__coin">
                            Coin
                        </div>
                        <div className="list__price">
                            Price
                        </div>
                        <div className="list__volume">
                            24h volume
                        </div>
                        <div className="list__percent">
                            24h
                        </div>
                    </div>
                    {list}
                </div>
            </div>
        </div>
    );
};

export default List;