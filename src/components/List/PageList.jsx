import React from 'react';
import {Link, useParams} from "react-router-dom";

const PageList = ({index,reset}) => {
  const {id} = useParams()
  return (
    <Link to={`/${index}`}>
      <span style={Number(id) === index ? {color: 'yellow'} : null} onClick={() => {
      if (Number(id) !== index) {
        reset()
      }
    }}>Page{index}</span>
    </Link>
  );
};

export default PageList;