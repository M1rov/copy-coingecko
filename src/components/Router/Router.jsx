import React from 'react';
import {publicRoutes} from "../../router/router";
import {Route} from "react-router-dom";


const Router = () => {
  return (
    <React.Fragment>
      {publicRoutes.map((route,index) => {
        return <Route key={index} exact={route.exact} path={route.to} component={route.component}/>
      })}
    </React.Fragment>
  );
};

export default Router;