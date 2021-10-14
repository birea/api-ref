import React from 'react';
import Autocomplete from "react-google-autocomplete";

const Work = () => {
  const onPlaceSelected = (place) => {
    console.log(place);
    const latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    const mapPosition = {
      lat: latValue,
      lng: lngValue
    }
    console.log(mapPosition);
  }

  return (
    <div>
      <Autocomplete
        defaultValue="Toronto, ON M4N 1K1, Canada"
        apiKey={"AIzaSyC9mxZ7IdcEup9vC5on0sXx-PpMnSo9Gwc&libraries=places"}
        onPlaceSelected={onPlaceSelected}
        style={{ width: 250 }}
      />
    </div>
  )
}

export default Work;