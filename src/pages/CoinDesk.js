import React, { useEffect } from 'react';
import coindesk from 'node-coindesk-api';

const CoinDesk = () => {

  useEffect(() => {
    coindesk.getCurrentPrice().then((data) => {
      console.log(data.bpi)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      CoinDesk
    </div>
  )
}

export default CoinDesk;