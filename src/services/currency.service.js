import coingeckoApi from "../API/coingecko.api";

export default class CurrencyService {
  static getCoinList = async (page, pageSize) => {
    try {
      return (await coingeckoApi
        .get(`coins/markets?vs_currency=usd&per_page=${pageSize}&page=${page}`)).data
    } catch (err) {
      throw err;
    }
  }

  static getCoinById = async (id) => {
    try {
      return (await coingeckoApi.get(`coins/${id}`)).data
    } catch (err) {
      throw err;
    }
  }

  static getHistoricalMarketDataById = async (id, vs_currency = 'usd', days = 1, interval) => {
    try {
      return (await coingeckoApi.get(`coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=${interval}`)).data
    } catch (err) {
      throw err
    }
  }
}