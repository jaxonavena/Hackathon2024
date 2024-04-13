import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Input, Button } from 'reactstrap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ListComponent from './crimelist';

// table component for the crime data 

const crimeTable = (crimeData) => {
  return(
    <table>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Gender</th>
      </tr>
      {crimeData.map((val, key) => {
        return (
            <tr key={key}>
                <td>{val.name}</td>
                <td>{val.age}</td>
                <td>{val.gender}</td>
            </tr>
        )
    })}
    </table>
  )
}

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
  const [zipcode, setZipcode] = useState(12345);
  const [crimeData, setcrimeData] = useState([]);



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
  
    return <div id="leaflet-map" style={{ height: '400px' }}></div>;
  };

  const handleAddress = async () => {
    try {
      const response = await fetch(`https://trueway-geocoding.p.rapidapi.com/Geocode?address=${address}&language=en`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'abb6831505msh0c50a361893b679p152f46jsn439e4eba5ca4',
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
    try {
      const response = await fetch(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${latitude}%2C${longitude}&language=en`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'abb6831505msh0c50a361893b679p152f46jsn439e4eba5ca4',
          'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    const data = await response.json();
    const zip = data.results[0].postal_code;
    console.log(zip);
    setZipcode(zip); 
    console.log("Zip Code: ", zip);


    
    setError(null);
    } catch (error) {
      console.log("fucking bug");
      console.error(error);
      setError(error);
      
    }
    
  }
  useEffect(() => {
    if (zipcode && zipcode !== 12345) {
      console.log("grabing crime data")
      // getCrime();
    }
    }, [zipcode]);
  // console.log("zip: ", zipcode)

  const getCrime = async () => {


    try {

      const response = await fetch(`https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data?zip=${zipcode}`,  {     
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'abb6831505msh0c50a361893b679p152f46jsn439e4eba5ca4',
        'X-RapidAPI-Host': 'crime-data-by-zipcode-api.p.rapidapi.com'
      }
      });

      const data = await response.json();
      const breakdownList = [];
      // console.log(data);

      // Iterate over the Crime Breakdown array
      data['Crime BreakDown'].forEach(crimeCategory => {
        // Extract the crime category and its rates
        const category = Object.keys(crimeCategory)[0];
        const rates = crimeCategory[category];

        // Construct a string representation of the crime category and rates
        const categoryString = `${category}: ${Object.entries(rates).map(([crimeType, rate]) => `${crimeType}: ${rate}`).join(', ')}`;

        // Add the constructed string to the list
        breakdownList.push(categoryString);
      });

      // Set the crime breakdown list in the state
      setcrimeData(breakdownList);
      console.log("breakdown list: ",breakdownList)
      
      // const result = await response.text();
      // console.log(result);
    } catch (error) {
      console.error(error);
    }

  }
  // useEffect(() => {
  //   if (crimeData && crimeData !== [] ) {
  //     console.log("crimeData: " );
  //     console.log(crimeData);
  //   }
  //   }, [crimeData]);

  return (
    <Container>
      <h1>Safecation</h1>
      <div>
        <Input type="text" 
          placeholder="Enter address" 
          autoFocus
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button onClick={handleAddress

          }>Enter</Button>
        
        {/* Render LeafletMap component */}
        <LeafletMap lat={latitude} lon={longitude} />
        <ListComponent data={crimeData}/>
      </div>
    </Container>
  );
}
