
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const containerStyle = {
    width: "100%",
    height: "500px", // Adjust height based on your requirements
  };

  const center = {
    lat: 40.807722, // Latitude of General Grant National Memorial
    lng: -73.963523, // Longitude of General Grant National Memorial
  };

  const markerPosition = {
    lat: 40.807722,
    lng: -73.963523,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyC9iFRJXnen5vnY_wypQmQoZGz3Aj5TQbk">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
