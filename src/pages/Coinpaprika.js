import React, { useEffect } from 'react';
import CoinpaprikaAPI from '@coinpaprika/api-nodejs-client';
const client = new CoinpaprikaAPI();

const Coinpaprika = () => {
  useEffect(() => {
    // Get global information
    client.getGlobal()
      .then((res) => {
        console.log("getGlobal", res);
      })
      .catch((err) => {
        console.error(err);
      });

    // Get a list of all cryptocurrencies available on coinpaprika.com.
    client.getCoins()
      .then((res) => {
        console.log("getCoins", res);
      })
      .catch((err) => {
        console.error(err);
      });

    // Get the OHLCV historical for a coin
    client.getCoinsOHLCVHistorical({
      coinId: "btc-bitcoin",
      quote: "usd",
      start: "2020-01-01",
      end: "2020-01-02" 
    })
      .then((res) => {
        console.log("getCoinsOHLCVHistorical", res);
      })
      .catch((err) => {
        console.error(err);
      });

    // (DEPRECATED) Get information on all tickers or specifed ticker.
    client.getTicker()
      .then((res) => {
        console.log("getTicker", res);
      })
      .catch((err) => {
        console.error(err);
      });
  }); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      Coinpaprika
    </div>
  )
}

export default Coinpaprika;