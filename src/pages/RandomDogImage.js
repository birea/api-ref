import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomDogImage = () => {

  const [image, setImage] = useState('');

  useEffect(() => {
    axios.get('https://dog.ceo/api/breeds/image/random')
      .then((res) => {
        setImage(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const changeImage = () => {
    axios.get('https://dog.ceo/api/breeds/image/random')
      .then((res) => {
        setImage(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div>
      <div style={{ padding: '30px 0', textAlign: 'center' }}>
        <button onClick={changeImage}>Change Image</button>
      </div>
      <div style={{ textAlign: 'center' }}>
        <img style={{ width: '200px', height: '200px' }} src={image} alt="" />
      </div>
    </div>
  )
}

export default RandomDogImage;