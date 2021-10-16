import React, {useEffect} from 'react';
import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();

const Gecko = () => {
  useEffect(() => {
    console.log("Order", CoinGecko.ORDER);
    console.log("Status Update Category", CoinGecko.STATUS_UPDATE_CATEGORY);
    console.log("Status update project type", CoinGecko.STATUS_UPDATE_PROJECT_TYPE);
    console.log("Event type", CoinGecko.EVENT_TYPE);
    // Check API server status
    CoinGeckoClient.ping()
      .then((res) => {
        console.log("check connection", res);
      })
      .catch((err) => {
        console.error(err);
      })
    
    // List all coins with data (name, price, market, developer, community, etc) - paginated by 50.
    CoinGeckoClient.coins.all()
      .then((res) => {
        console.log("Coin all", res);
      })
      .catch((err) => {
        console.error(err);
      })
    // List all exchanges.
    CoinGeckoClient.exchanges.all()
    .then((res) => {
      console.log("exchanges all", res);
    })
    .catch((err) => {
      console.error(err);
    })

    // List all status_updates with data (description, category, created_at, user, user_title and pin).
    CoinGeckoClient.statusUpdates.all()
    .then((res) => {
      console.log("statusUpdates all", res);
    })
    .catch((err) => {
      console.error(err);
    })

    // Get events, paginated by 100.
    CoinGeckoClient.events.all()
    .then((res) => {
      console.log("events all", res);
    })
    .catch((err) => {
      console.error(err);
    })

    // Get BTC-to-Currency exchange rates.
    CoinGeckoClient.exchangeRates.all()
    .then((res) => {
      console.log("exchangeRates all", res);
    })
    .catch((err) => {
      console.error(err);
    })

  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      CoinGecko
    </div>
  )
}

export default Gecko;