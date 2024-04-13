import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Input, Button } from 'reactstrap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap ({lat, lon}) {
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
  
    return <div id="leaflet-map" style={{ height: '400px' }}></div>;
  };