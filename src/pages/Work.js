import React, { useEffect } from 'react';
import CoinpaprikaAPI from '@coinpaprika/api-nodejs-client';
const client = new CoinpaprikaAPI();
 
// 
// client.getGlobal().then(console.log).catch(console.error);
const Work = () => {
  useEffect(() => {
    // Get global information
    client.getGlobal()
      .then((res) => {
        console.log("getGlobal", res);
      })
      .catch((err) => {
        console.error(err);
      });


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
      dfdf
    </div>
  )
}

export default Work;