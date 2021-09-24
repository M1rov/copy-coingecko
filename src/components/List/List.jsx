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
    const [pageSize, setPageSize] = useState(3)
    const [isLoading,setIsLoading] = useState(false)
    const [changePage, setChangePage] = useState(false)
    const [sortType, setSortType] = useState('market_cap_rank');
    const [sortMethod, setSortMethod] = useState(true);

    async function fetchList() {
        return await FetchData.fetchCurrencyList(props.match.params.id || 1, pageSize)
    }

    useEffect(() => {
        if(list){
            setList(sortData(sortType, list, sortMethod))
        }else{
            fetchList().then((data) => {
                setList(data)
                const pageCount = Math.ceil(250 / pageSize)
                const massive = []
                for (let i = 0; i < pageCount; i++) {
                    massive.push(<PageList key={i} index={i + 1}/>)
                }
                setPage(...[massive])
                setIsLoading(true)
            })
        }

    }, [props.match.params.id, changePage, sortMethod,sortType])



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
                              if (Number(pageSize) < 10) {
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
          <div className="list">
              <div className="container">
                  <div className="list__header">
                      <div className="list__coin">
                          Coin
                      </div>
                      <div className="list__price" onClick={() => {
                          setSortType('current_price')
                          setSortMethod(!sortMethod)
                      }}>
                          Price
                      </div>
                      <div className="list__volume" onClick={() => {
                          setSortType('total_volume')
                          setSortMethod(!sortMethod)
                      }}>
                          24h volume
                      </div>
                      <div className="list__percent" onClick={() => {
                          setSortType('price_change_percentage_24h')
                          setSortMethod(!sortMethod)
                      }}>
                          24h
                      </div>
                  </div>
                  {isLoading ? list.map((el) => {
                      return <ListItem key={el.id} coin={el}/>
                  }): null}
              </div>
            </div>
        </div>
    );
};

export default List;