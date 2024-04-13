import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Input, Button } from 'reactstrap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import "./Landing.css"






// Define TextInput component
const TextInput = () => {
  return (
    <div>
      <label htmlFor="textInput">Enter Address:</label>
      <input type="text" id="textInput" />
    </div>
  );
};



export default function Landing() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(36);
  const [longitude, setLongitude] = useState(-90);
  const [error, setError] = useState(null);

  const LeafletMap = ({lat, lon}) => {
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
      const map = L.map(mapContainer).setView([lat, lon], 13);
  
      // Add a tile layer (e.g., OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }, []);
  
    return <div id="leaflet-map" style={{ height: '450px' }}></div>;
  };

  const handleAddress = async () => {
    try {
      const response = await fetch(`https://trueway-geocoding.p.rapidapi.com/Geocode?address=${address}&language=en`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '01836c3714msh582bac2093a6a03p19e6abjsn2b918034e4c0',
          'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const { lat, lng } = data.results[0].location;
      setLatitude(lat);
      setLongitude(lng);
      console.log("Latitude: ", lat);
      console.log("Longitude: ", lng);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  }

  return (
    <Container className="landing-container">
      <h1 className="header">Safecation</h1>
      <div className="map-div">
        <Input className="search-bar" type="text" placeholder="Enter address" autoFocus value={address} onChange={(e) => setAddress(e.target.value)}/>
        <Button onClick={handleAddress}>Enter</Button>
        <Button onClick={handleAddress}>Enter</Button>

        {/* Render LeafletMap component */}
        <LeafletMap lat={latitude} lon={longitude} />
      </div>
    </Container>
  );
}


// DAD6D6
// 92BFB1
// 4A6D7C
// 001400
// 475657