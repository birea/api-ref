import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Autocomplete from "react-google-autocomplete";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMap = () => {
  const zoom = 12;
  const [position, setPosition] = useState({
    lat: 59.95,
    lng: 30.33
  });

  const onPlaceSelected = (place) => {
    const latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    const mapPosition = {
      lat: latValue,
      lng: lngValue
    }
    setPosition(mapPosition);
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
      <h3 style={{ padding: '30px 0'}}>
        Google-Map-React
      </h3>
      <div style={{ padding: '30px 0' }}>
        <Autocomplete
          defaultValue="Toronto, ON M4N 1K1, Canada"
          apiKey={"AIzaSyC9mxZ7IdcEup9vC5on0sXx-PpMnSo9Gwc&libraries=places"}
          onPlaceSelected={onPlaceSelected}
          style={{ width: 250 }}
        />
      </div>
      <div style={{ width: '500px', height: '500px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyC9mxZ7IdcEup9vC5on0sXx-PpMnSo9Gwc&libraries=places"
          }}
          center={position}
          defaultZoom={zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default GoogleMap;