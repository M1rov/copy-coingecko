import React from 'react';
import {Link, useParams} from "react-router-dom";

const PageList = ({index,reset}) => {
  const {id} = useParams()
  console.log(id)
  return (
    <Link to={`/${index}`}>
<<<<<<< HEAD
      <span style={Number(id) === index || (!id && index === 1) ? {color: 'royalblue'} : null} onClick={() => {
=======
      <span style={Number(id) === index || !id && index === 1 ? {color: 'yellow'} : null} onClick={() => {
>>>>>>> master
      if (Number(id) !== index) {
        reset(false)
      }
    }}>Page{index}</span>
    </Link>
  );
};

export default PageList;