import React, { useEffect } from 'react';
import axios from 'axios'; 
// 
// client.getGlobal().then(console.log).catch(console.error);
const Work = () => {
  useEffect(() => {
    axios.get('https://www.cryptingup.com/api/markets').then((res) => {
      console.log(res)
    })


  }); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      dfdf
    </div>
  )
}

export default Work;