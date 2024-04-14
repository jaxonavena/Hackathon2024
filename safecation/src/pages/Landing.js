import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Input, Button } from 'reactstrap';
import L from 'leaflet';
import Header from '../components/Header';
import 'leaflet/dist/leaflet.css';
import Disease from '../request';
import CrimeListComponent from './crimelist'; 

import Select from "react-dropdown-select";

import ChatComponent from "./ChatBot";



export default function Landing() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState( 39.097321);
  const [longitude, setLongitude] = useState(-94.579925);
  const [zipCode, setZip] = useState(null);
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
        iconUrl: '../../../map-marker-svgrepo-com.svg',
        // iconUrl: '../../public/map.png',
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
      });



      var diseaseMarker = {
          "good": "../../../good.svg",
          "medium": "../../../medium.svg",
          "bad": "../../../bad.svg"
      }
      
      var latLng = L.latLng(lat, lon);



// var category = 'Obesity'; // Example category
const quartiles = [[12.6, 17.0],
[73.0, 76.4],
[27.7, 33.8],
[26.1, 30.4],
[15.4, 17.5],
[6.7, 8.8],
[6.8, 7.8],
[80.8, 83.4],
[82.8, 85.6],
[2.9, 3.4],
[12.3, 15.5],
[67.1, 71.8],
[40.7, 45.7],
[35.0, 39.6],
[5.8, 7.4],
[9.9, 10.8],
[15.9, 20.0],
[58.4, 66.1],
[21.2, 24.0],
[9.9, 12.3],
[14.9, 19.5],
[7.4, 10.8],
[6.6, 8.3],
[31.9, 37.0],
[34.6, 37.8],
[7.1, 9.1],
[73.3, 76.4],
[14.9, 17.3],
[12.7, 16.6],
[34.4, 38.7],
[11.1, 13.5],
[23.3, 28.6],
[3.4, 4.5],
[31.7, 34.9],
[3.0, 3.7],
[76.4, 79.7],
[4.2, 5.7],
[-94.48572, -82.584],
[37.099, 41.23136]]
let categoryIndex = null;
  //   // FIXME: not working
    L.marker([lat, lon], {icon: mapMarker }).addTo(map).bindPopup('Your Location.');
// Iterate over each dictionary in the array
if (useableData && Array.isArray(useableData)) {
  // Iterate over each dictionary in the array
  for (var i = 0; i < useableData.length; i++) {
      var dataPoint = useableData[i];
      var latitude = dataPoint.latitude; // Access latitude from the dictionary
      var longitude = dataPoint.longitude; // Access longitude from the dictionary

      // Customize the marker based on the data attributes
      // You can customize the popup content according to your data structure
      var popupContent = '<b>Data Point</b>:<br>';
      for (var key in dataPoint) {
          if (dataPoint.hasOwnProperty(key)
           && key !== 'latitude' && key !== 'longitude'
          && key === category) {
              popupContent = `<b>${key}</b>: ${dataPoint[key]}<br>`;
              // let categoryIndex = key.indexOf
          }
      }
      categoryIndex = Object.keys(dataPoint).indexOf(category); // Assign the category index

      var value = dataPoint[category]; // Example value
      var level = determineLevel(value, categoryIndex); // Function to determine range type (good, medium, bad)
      // console.log("val: ", level);
      
      var iconUrl = diseaseMarker[level];

      // Create a marker at the coordinates of the data point
     L.marker([latitude, longitude],
         { icon: L.icon({ iconUrl: iconUrl ,
          iconSize: [32, 32], // size of the icon
          iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -32]}) },
        ).addTo(map).bindPopup(popupContent);
  }
}

// Function to determine range type (good, medium, bad) based on value

function determineLevel(value, categoryIndex) {


  const categoryQuartiles = quartiles[categoryIndex];
  const lowerQuartile = categoryQuartiles[0];
  const upperQuartile = categoryQuartiles[1];


  if (value < lowerQuartile) {
    return 'good';
  } else if (value >= lowerQuartile && value <= upperQuartile) {
    return 'medium';
  } else {
    return 'bad';
  }
}

   
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }, []);
  
    return <div id="leaflet-map" style={{ height: '100vh' }}></div>;
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
      // console.log("Zip: ", zip);
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

    setZipcode(zip); 
    // console.log("Zip Code: ", zip);


    
    setError(null);
    } catch (error) {
      console.error(error);
      setError(error);
      
    }
    
  }
  useEffect(() => {
    if (zipcode && zipcode !== 12345) {
      console.log("grabing crime data")
      getCrime();
    }
    }, [zipcode]);
  // console.log("zip: ", zipcode)

  const getCrime = async () => {

 
    try {

      const response = await fetch(`https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data?zip=${zipcode}`,  {     
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '40490862d2mshd2a98d5e24b9202p10d69cjsn56b107af938d',
        'X-RapidAPI-Host': 'crime-data-by-zipcode-api.p.rapidapi.com'
      }
      });

      const data = await response.json();





      const breakdownList = [];
      console.log(data);

      // Iterate over the Crime Breakdown array
      const overallData = data['Overall'];

      Object.entries(overallData).forEach(([key, value]) => {
        const categoryString = `${key}: ${value}`;
        breakdownList.push(categoryString);
      });
      
      data['Crime BreakDown'].forEach(crimeCategory => {
        Object.entries(crimeCategory).forEach(([key, value]) => {

               

              const categoryString = `${Object.entries(value).map(([crimeType, rate]) => `${crimeType}: ${rate}`).join(', ')}`;
              // Add the constructed string to the list
              breakdownList.push(categoryString);

    
          });

      // Set the crime breakdown list in the state
      setcrimeData(breakdownList);
      console.log("breakdown list: ",breakdownList)
        });

    } catch (error) {
      console.error(error);
    }

  }

  let requestData = [latitude, longitude];

  const responseData = Disease({ requestData });

  let useableData = JSON.parse(responseData);

  // console.log("Data: ", useableData);

  const headers = ['All Teeth Lost', 'Annual Checkup', 'Any Disability', 'Arthritis', 'Binge Drinking', 'COPD', 'Cancer (except skin)', 'Cervical Cancer Screening', 'Cholesterol Screening', 'Chronic Kidney Disease', 'Cognitive Disability', 'Colorectal Cancer Screening', 'Core preventive services for older men', 'Core preventive services for older women', 'Coronary Heart Disease', 'Current Asthma', 'Current Smoking', 'Dental Visit', 'Depression', 'Diabetes', 'General Health', 'Health Insurance', 'Hearing Disability', 'High Blood Pressure', 'High Cholesterol', 'Independent Living Disability', 'Mammography', 'Mental Health', 'Mobility Disability', 'Obesity', 'Physical Health', 'Physical Inactivity', 'Self-care Disability', 'Sleep <7 hours', 'Stroke', 'Taking BP Medication', 'Vision Disability', 'longitude', 'latitude'];
  
  
  // console.log("Data: ", useableData);
  const [category, setcategory] = useState('Obesity');
  // console.log(category)


  const handleSelectChange = (event) => {
    setcategory(event.target.value);
  };


  // console.log(requestData);
  return (
<Container className="landing-container vh-100 " fluid>
      <h1 className="header  raised">Safecation</h1>
      <div className="d-flex map-div align-items-center mt-4 mb-2 gap-2 justify-content-center">
        <Input className="d-flex search-bar h-75 w-50"
         type="text"
          placeholder="Enter address or zip code..."
          autoFocus 
          value={address} onChange={(e) => setAddress(e.target.value)}/>
        <Button className='button' onClick={handleAddress}>Enter</Button>
      </div>

        {/* Render LeafletMap component */}
        {/* <br></br> */}
        <Container className="d-flex align-items-center justify-content-center">
          <select className="d-flex mt-2 h-75 dropdown w-25 fs-4"
          value={category}
            onChange={handleSelectChange}>
            <option value="" placeholder='Choose a health concern'></option>
            {headers.map((header, index) => (
              <option key={index} value={header}>{header}</option>
            ))}
          </select>
        </Container>
        <Container className="map d-flex flex-column raised" >
          <LeafletMap 
            lat={latitude} lon={longitude} />
        </Container>
        <ChatComponent/>   
        
      <Container>
        <CrimeListComponent crimeData={crimeData}/>
      </Container>


    </Container>
  );

}

