import React, {useEffect, useRef, useState} from 'react';
import './List.css'
import ListItem from "./ListItem/ListItem";
import FetchData from "../../actions";
import PageList from "./PageList";
import sortData from "../../service/service.sorting";

const List = (props) => {
    const [list, setList] = useState(null)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [changePage, setChangePage] = useState(false)
    const [sortType, setSortType] = useState('market_cap_rank');
    const [sortMethod, setSortMethod] = useState(false);
    const [pageSize, setPageSize] = useState(10)

    const InputValue = useRef()

    function sortFunc(type) {
        setIsLoading(false)
        setSortType(type)
        setSortMethod(!sortMethod)
    }

    async function fetchList() {
        return await FetchData.fetchCurrencyList(props.match.params.id || 1, pageSize)
    }


    useEffect(() => {
        if (list) {
            setList(sortData(sortType, list, sortMethod))
            setIsLoading(true)
        }
    }, [sortMethod])

    useEffect(() => {
        setIsLoading(false)
        fetchList().then((data) => {
            setList(data)
            setIsLoading(true)
        })
        const pageCount = Math.ceil(250 / pageSize)
        const massive = []
        for (let i = 0; i < pageCount; i++) {
            massive.push(<PageList reset={setIsLoading} key={i} index={i + 1}/>)
        }
        setPage(...[massive])
    }, [props.match.params.id, changePage])


    return(
      <div className={'wrapper'}>
          <header className="header">
              <div className="container">
                  <nav className="nav">
                      <div className="header__pages">
                          {page}
                      </div>
                      <div className='header__input'>
                          <input type={'text'} placeholder={'Min: 10'} ref={InputValue}/>
                          <button className={'header__button'} onClick={() => {
                              setIsLoading(false)
                              setPageSize(InputValue.current.value)
                              if (Number(InputValue.current.value) < 10) {
                                  alert('Error size Min Size 10')
                              } else {
                                  setChangePage(!changePage)
                              }
                          }}>Change
                          </button>
                      </div>
                  </nav>
              </div>
          </header>
          <div className="container">
              <div className="list__header">
                  <div className="list__coin">
                      Coin
                  </div>
                  <div className="list__price" onClick={() => sortFunc('current_price')}>
                      Price
                  </div>
                  <div className="list__volume" onClick={() => sortFunc('total_volume')}>
                      24h volume
                  </div>
                  <div className="list__percent" onClick={() => sortFunc('price_change_percentage_24h')}>
                      24h
                  </div>
              </div>
              {isLoading ? list.map((el) => {
                  return <ListItem key={el.id} coin={el}/>
              }) : null}
          </div>
      </div>)
};

export default List;