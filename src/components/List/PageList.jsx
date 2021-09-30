import React from 'react';
import {Link, useParams} from "react-router-dom";

const PageList = ({index,reset}) => {
  const {id} = useParams()
  return (
    <Link to={`/${index}`}>
      <span style={Number(id) === index || (!id && index === 1) ? {color: 'royalblue'} : null} onClick={() => {
      if (Number(id) !== index) {
        reset(false)
      }
    }}>Page{index}</span>
    </Link>
  );
};

export default PageList;