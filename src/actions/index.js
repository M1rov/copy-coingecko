import axios from "axios";


class FetchData {
    static fetchCurrency = async () => {
        try{
            return (await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=1')).data
        }catch (e){
            console.log(e)
        }


    }
}
export default FetchData