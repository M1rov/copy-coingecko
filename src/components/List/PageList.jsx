import React from 'react';
import {Link, useParams} from "react-router-dom";

const PageList = ({index}) => {
  const {page} = useParams()
  return (
    <Link to={`/${index}`}>
      <span style={+page === index || (!page && index === 1) ? {color: 'royalblue'} : null} onClick={() => {
      }}>Page {index}</span>
    </Link>
  );
};

export default PageList;