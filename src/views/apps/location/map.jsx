// views/apps/location/map.js

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import PropTypes from 'prop-types'

// Fix for the default icon not showing properly
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
})

const Map = ({ locationData }) => {
  // Default to the first location's position if available
  const defaultPosition = locationData.length > 0 ? [locationData[0].lat, locationData[0].long] : [0, 0]

  return (
    <MapContainer center={defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locationData.map(location => (
        <Marker key={location.id} position={[location.lat, location.long]}>
          <Popup>{location.markName}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

Map.propTypes = {
  locationData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired
    })
  ).isRequired
}

export default Map
