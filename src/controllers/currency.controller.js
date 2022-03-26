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

  static getDataById = async (id, type, days) => {
    try {
      const data = {
        labels: [],
        datasets: [{
          label: type,
          data: [],
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          pointRadius: 0,
          yAxisID: 'y',
        }],
      };
      const results = await CurrencyService.getHistoricalMarketDataById(id, 'usd', days);
      results[type].forEach((res) => {
        const date = new Date(res[0]).toString().split('GMT')[0];
        data.labels.push(`${date}`);
        data.datasets[0].data.push(res[1].toFixed(2));
      })
      return data;
    } catch (err) {
      console.error(err)
    }
  }
}