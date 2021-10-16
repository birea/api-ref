import React, { useEffect } from 'react';
import coindesk from 'node-coindesk-api';
 
const Work = () => {
  useEffect(() => {
    coindesk.getCurrentPrice().then(function (data) {
      console.log(data)
    })
  });
  return (
    <div>
      dfdf
    </div>
  )
}

export default Work;