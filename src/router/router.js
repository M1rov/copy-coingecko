import List from "../components/List/List";
import CoinInfo from "../components/CoinInfo/CoinInfo";

export const publicRoutes = [
  {to: '/:page?', exact: true, component: List},
  {to: '/coin/:id', exact: true, component: CoinInfo},
]