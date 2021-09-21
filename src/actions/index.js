import axios from "axios";
const baseUrl = 'https://api.coingecko.com/api/v3/'


class FetchData {
    static fetchCurrency = async (page,pageSize) => {
        try{
            return (await axios
              .get(`${baseUrl}coins/markets?vs_currency=usd&per_page=${pageSize}&page=${page}`))
              .data
        }catch (e){
            console.log(e)
        }


    }
}
export default FetchData