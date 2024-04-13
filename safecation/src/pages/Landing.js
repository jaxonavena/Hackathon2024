import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Input, Button } from 'reactstrap';
import L from 'leaflet';
import Header from '../components/Header';
import 'leaflet/dist/leaflet.css';
import Disease from '../request';


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
  const [latitude, setLatitude] = useState(30);
  const [longitude, setLongitude] = useState(-90.11);
  const [zipCode, setZip] = useState(null);
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
  
      var userLatLng = L.latLng(lat, lon);

// Define the bounding box around the user's input
      var buffer = 15; // Adjust this value as needed
      var southWest = L.latLng(userLatLng.lat - buffer, userLatLng.lng - buffer);
      var northEast = L.latLng(userLatLng.lat + buffer, userLatLng.lng + buffer);
      var bounds = L.latLngBounds(southWest, northEast);
      // Create a Leaflet map
      // const map = L.map({mapContainer, maxBounds: bounds}).setView([lat, lon], 16);
      const map = L.map('leaflet-map', {
        maxBounds: bounds,
    }).setView([lat, lon], 16);

      const mapMarker = L.icon({
        iconUrl: '../../public/map-marker-svgrepo-com.svg',
        // iconUrl: '../../public/map.png',
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
      });

      var centerLatLng = L.latLng(lat, lon);

// Calculate the half-side length (in degrees) for a 4 km region
      var halfSideInDegrees = 0.2;

      // Compute the bounds for the square
      var newsouthWest = L.latLng(centerLatLng.lat - halfSideInDegrees, centerLatLng.lng - halfSideInDegrees);
      var tempnorthEast = L.latLng(centerLatLng.lat + halfSideInDegrees, centerLatLng.lng + halfSideInDegrees);
      var tempbounds = L.latLngBounds(newsouthWest, tempnorthEast);

      // Create a rectangle (square) using the bounds
     L.rectangle(tempbounds, { color: 'red', fillOpacity: 0.1 }).addTo(map);
     var smallerSideInDegrees = 0.05;
      let coords = [];
// Create a 40x40 grid of smaller squares
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var swLat = newsouthWest.lat + i * smallerSideInDegrees;
            var swLng = newsouthWest.lng + j * smallerSideInDegrees;
            var neLat = swLat + smallerSideInDegrees;
            var neLng = swLng + smallerSideInDegrees;

          // console.log(swLat, swLng, neLat ,neLng);
            var tempLat = (swLat + neLat) / 2;
            var tempLng = (swLng + neLng) / 2;

            coords.push(`${tempLat},${tempLng}`);

            var smallerBounds = L.latLngBounds(L.latLng(swLat, swLng), L.latLng(neLat, neLng));
            // var zipCode =  handleZip(latitude, longitude)
            var color = getColor(zipCode);
            L.rectangle(smallerBounds, { color: 'green', fillOpacity: 0.3 }).addTo(map);
        }
}
console.log(coords[0]);
// console.log(coords);
// const zipCodes = [];
// Assuming you have an array of square coordinates called `squareCoordinatesArray`

const getZipCodesForSquares = async (coords) => {
  try {
    const zipCodes = await Promise.all(coords.map(async (coordString) => {
      const [latitude, longitude] = coordString.split(',').map(parseFloat);
      return await handleZip(latitude, longitude); // Fetch zip code for coordinates
    }));
    console.log(zipCodes); // Array of zip codes for each square
    // Do something with the zip codes here
  } catch (error) {
    console.error('Error fetching zip codes:', error);
    // Handle error
  }
}


// Call the function with your array of square coordinates
// getZipCodesForSquares(coords);


  //   var centerCoordinates = smallerBounds.map(function(bounds) {
  //     var lat = (bounds.getNorth() + bounds.getSouth()) / 2;
  //     var lng = (bounds.getEast() + bounds.getWest()) / 2;
  //     return L.latLng(lat, lng);
  //   });

  //   centerCoordinates.forEach(function(center) {
  //     var zipCode = getZipCodeForCoordinate(center.lat, center.lng);
  //     var color = getColor(zipCode); // Define your color mapping logic
  //     L.rectangle(smallerBounds, { color: color, fillOpacity: 0.3 }).addTo(map);
  // });
  //   // FIXME: not working
    // L.marker([lat, lon], {icon: mapMarker }).addTo(map).bindPopup('Your pin');
      //   let dummy_data = {
      //     'Obesity': 36.1,
      //     'drinking': 4.1,

      //   }

        var square1 = [
          [30.5, -90.1],
          [30.5, -90.05],
          [30.55, -90.05],
          [30.55, -90.1]
      ];

      var square2 = [
          [30.575, -90.1],
          [30.575, -90.075],
          [30.6, -90.075],
          [30.6, -90.1]
      ];

      // // Create polygon layers for each square and add them to the map
      L.polygon(square1, {color: 'red'}).addTo(map);
      L.polygon(square2, {color: 'blue'}).addTo(map);
    //   const geojsonLayer = L.geoJSON(FeatureCollection, {
    //     // Define style for each square
    //     style: function (feature) {
    //         // Calculate average value for the square
    //         const avgValue = calculateAverageValue(feature.properties);
            
    //         // Define color based on average value
    //         const color = getColor(avgValue);
            
    //         // Return style object
    //         return {
    //             fillColor: color,
    //             fillOpacity: 0.5,
    //             weight: 1,
    //             color: 'black'
    //         };
    //     },
        
    //     // Create squares as GeoJSON points
    //     pointToLayer: function (feature, latlng) {
    //         const size = 1000; // Size of each square (adjust as needed)
    //         const bounds = L.latLngBounds(latlng, latlng).pad(size / 2);
    //         return L.rectangle(bounds);
    //     }
    // }).addTo(map);
    
    // // Function to calculate the average value from properties object
    // function calculateAverageValue(properties) {
    //     const propertyValues = Object.values(properties);
    //     const sum = propertyValues.reduce((acc, val) => acc + val, 0);
    //     return sum / propertyValues.length;
    // }

    // // Function to assign colors based on values
    function getColor(value) {
        // return value > 15 ? '#800026' :
        //        value > 10 ? '#BD0026' :
        //        value > 5 ? '#E31A1C' :
        //        value > 0 ? '#FC4E2A' :
        //                    '#FFEDA0';
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']

        let index = value % colors.length
    
        return colors[index]
      }

    // Create a GeoJSON layer with custom styles and add it to the map
    // L.geoJSON(geojsonFeature, {
    //     style: style
    // }).addTo(map);
      // Add a tile layer (e.g., OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }, []);
  
    return <div id="leaflet-map" style={{ height: '450px' }}></div>;
  };
  const handleZip = async (latitude, longitude) => {
    try {
        const response = await fetch(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${latitude}%2C${longitude}&language=en`, {
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
        const zip = data.results[0].postal_code;
        console.log("Zip: ", zip);
        // Handle the zip code (e.g., set it in your state)
        // ...
        setError(null);
    } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
    }
}

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
      const zip = data.results[0].postal_code
      setLatitude(lat);
      setLongitude(lng);
      setZip(zip);
      console.log("data: ", data.results)
      console.log("Latitude: ", lat);
      console.log("Longitude: ", lng);
      console.log("Zip: ", zip);
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
      <div>
        <Disease requestData={"01001"}/>
      </div>
    </Container>
  );
}


// DAD6D6
// 92BFB1
// 4A6D7C
// 001400
// 475657