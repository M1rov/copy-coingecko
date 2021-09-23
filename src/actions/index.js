import axios from "axios";

const baseUrl = 'https://api.coingecko.com/api/v3/'


class FetchData {
  static fetchCurrencyList = async (page, pageSize) => {
    try {
      return (await axios
        .get(`${baseUrl}coins/markets?vs_currency=usd&per_page=${pageSize}&page=${page}`))
        .data
    } catch (e) {
      console.error(e)
    }
  }

  static fetchCurrencyById = async (id) => {
    try {
      return (await axios
        .get(`${baseUrl}/coins/${id}`))
        .data
    } catch (e) {
      console.error(e)
    }
  }
}

export default FetchData