import CurrencyService from "../services/currency.service";

export default class CurrencyController {
  static getCoinList = async (page, pageSize) => {
    try {
      return (await CurrencyService.getCoinList(page, pageSize))
    } catch (err) {
      console.error(err)
    }
  }

  static getCoinById = async (id) => {
    try {
      return (await CurrencyService.getCoinById(id))
    } catch (err) {
      console.error(err)
    }
  }
}