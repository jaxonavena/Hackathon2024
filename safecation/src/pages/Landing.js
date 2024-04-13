import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define TextInput component
const TextInput = () => {
  return (
    <div>
      <label htmlFor="textInput">Enter Address:</label>
      <input type="text" id="textInput" />
    </div>
  );
};

const LeafletMap = () => {
  useEffect(() => {
    // Check if the map container exists
    const mapContainer = document.getElementById('leaflet-map');
    if (!mapContainer) {
      return;
    }

    // Check if the map has already been initialized
    if (mapContainer._leaflet_id) {
      return;
    }

    // Create a Leaflet map
    const map = L.map(mapContainer).setView([51.505, -0.09], 13);

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }, []);

  return <div id="leaflet-map" style={{ height: '400px' }}></div>;
};

// Landing component
export default function Landing() {
  // Access current location
  let location = useLocation();
  const { pathname } = location;

  return (
    <Container>
      <h1>Safecation</h1>
      <div>
        {/* Render TextInput component */}
        <TextInput />
        {/* Render LeafletMap component */}
        <LeafletMap />
      </div>
    </Container>
  );
}
