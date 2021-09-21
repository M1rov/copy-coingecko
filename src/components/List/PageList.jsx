import React from 'react';
import {Link} from "react-router-dom";

const PageList = ({index}) => {
  return (
    <Link to={`/${index}`}>Page{index}</Link>
  );
};

export default PageList;