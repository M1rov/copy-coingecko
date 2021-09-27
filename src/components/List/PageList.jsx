import React from 'react';
import {Link, useParams} from "react-router-dom";

const PageList = ({index,reset}) => {
  const {id} = useParams()
  return (
    <span onClick={() => {
      if (Number(id) !== index){
        reset()
      }
    }}><Link to={`/${index}`}>Page{index}</Link></span>
  );
};

export default PageList;