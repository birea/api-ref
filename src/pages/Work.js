import React, { useEffect } from 'react';
import coindesk from 'node-coindesk-api';
 
const Work = () => {
  useEffect(() => {
    coindesk.getCurrentPrice().then(function (data) {
      console.log(data)
    })
  }); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      dfdf
    </div>
  )
}

export default Work;