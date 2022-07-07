import instance from 'utils/axios.utils';

const Coin = {
  list: async (data) => {
    return new Promise((resolve, reject) => {
      instance()
        .post('/coin-list/get_list', data)
        .then((coins) => {
          resolve(coins);
        })
        .catch((error) => {
          if (error.response) {
            reject(error);
          }
          reject(error);
        });
    });
  },
  get: async (data) => {
    return new Promise((resolve, reject) => {
      instance()
        .get(`/coin-list/get_list?_id=${data._id}`)
        .then((coins) => {
          resolve(coins);
        })
        .catch((error) => {
          if (error.response) {
            reject(error);
          }
          reject(error);
        });
    });
  },
  marketChart: async (data) => {
    return new Promise((resolve, reject) => {
      instance()
        .post(`/coin-list/market_chart`, data)
        .then((coins) => {
          resolve(coins);
        })
        .catch((error) => {
          if (error.response) {
            reject(error);
          }
          reject(error);
        });
    });
  },
  marketDataRange: async (data) => {
    return new Promise((resolve, reject) => {
      instance()
        .get(
          `/coin-list/market_chart?coinId=${data.coinId}&to=${data.to}&from=${data.from}&vs_currency=${data.vs_currency}`,
          data,
        )
        .then((coins) => {
          resolve(coins);
        })
        .catch((error) => {
          if (error.response) {
            reject(error);
          }
          reject(error);
        });
    });
  },
};

export default Coin;
