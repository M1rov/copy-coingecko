import React, {useEffect, useMemo, useState} from 'react';
import './List.css'
import ListItem from "./ListItem/ListItem";
import PageList from "./PageList";
import sortData from "../../scripts/sorting";
import {useParams} from "react-router-dom";
import {PRICE, PRICE_CHANGE_24, PRICE_CHANGE_AT, TOTAL_VOLUME} from "./sortConstants";
import CurrencyController from "../../controllers/currency.controller";

const MIN_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 250;


const ASCENDING = 'ascending';
const DESCENDING = 'descending';

const List = () => {
  const [list, setList] = useState(null)
  const [pageArray, setPageArray] = useState([])
  const [sortParam, setSortParam] = useState(null);
  const [sortMethod, setSortMethod] = useState(DESCENDING);
  const [pageSize, setPageSize] = useState(40)

  const {page} = useParams();
  const [inputValue, setInputValue] = useState(pageSize.toString());


  function sortFunc(type) {
    if (sortParam === type) {
      setSortMethod(prev => prev === ASCENDING ? DESCENDING : ASCENDING)
    } else {
      setSortParam(type);
      setSortMethod(DESCENDING)
    }
  }

  const sortedList = useMemo(() => {
    if (list && sortParam) {
      return sortData(sortParam, list, sortMethod)
    }
    return list;
  }, [list, sortParam, sortMethod])

  useEffect(() => {
    CurrencyController.getCoinList(page || 1, pageSize).then(data => {
      setList(data)
    })

    const pageCount = Math.ceil(250 / pageSize)
    setPageArray(new Array(pageCount)
      .fill(null)
      .map((_, i) => <PageList key={i} index={i + 1}/>)
    )
  }, [page, pageSize])


  return (
    <div className='wrapper'>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="header__pages">
              {pageArray}
            </div>
            <form className='header__input' onSubmit={e => {
              e.preventDefault()
              if (+inputValue >= MIN_PAGE_SIZE && +inputValue <= MAX_PAGE_SIZE) {
                setPageSize(+inputValue)
              } else {
                alert(`Error! Min size: ${MIN_PAGE_SIZE}\nMax size: ${MAX_PAGE_SIZE}`)
              }
            }}>
              <input type={'text'}
                     placeholder={`Min: ${MIN_PAGE_SIZE}`}
                     value={inputValue}
                     onChange={e => setInputValue(e.target.value)}
              />
              <button className={'header__button'}>
                Change
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="container">
        <table className="table">
          <thead className='list__header'>
          <tr>
            <th>
              <div className="list__coin">
                Coin
              </div>
            </th>
            <th>
              <button className="list__price"
                      data-sort={sortParam === PRICE ? sortMethod : null}
                      onClick={() => sortFunc(PRICE)}>
                Price
              </button>
            </th>
            <th>
              <button className="list__volume"
                      data-sort={sortParam === TOTAL_VOLUME ? sortMethod : null}
                      onClick={() => sortFunc(TOTAL_VOLUME)}>
                24h volume
              </button>
            </th>
            <th>
              <button className="list__percent_24h"
                      data-sort={sortParam === PRICE_CHANGE_24 ? sortMethod : null}
                      onClick={() => sortFunc(PRICE_CHANGE_24)}>
                24h
              </button>
            </th>
            <th>
              <button className="list__percent_1h"
                      data-sort={sortParam === PRICE_CHANGE_AT ? sortMethod : null}
                      onClick={() => sortFunc(PRICE_CHANGE_AT)}>
                ALL TIME
              </button>
            </th>
          </tr>
          </thead>
          <colgroup>
            <col style={{width: '187px'}}/>
            <col style={{width: '234px'}}/>
            <col style={{width: '70px'}}/>
            <col style={{width: '70px'}}/>
            <col style={{width: '70px'}}/>
          </colgroup>
          <tbody>
          {sortedList?.map((el) => {
            return <ListItem key={el.id} coin={el} sortParam={sortParam}/>
          })}
          </tbody>
        </table>
      </div>
    </div>)
};

export default List;