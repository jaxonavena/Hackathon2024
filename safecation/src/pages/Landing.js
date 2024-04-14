import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Input, Button } from 'reactstrap';
import L from 'leaflet';
import Header from '../components/Header';
import 'leaflet/dist/leaflet.css';
import Disease from '../request';
import CrimeListComponent from './crimelist'; 



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

      var latLng = L.latLng(lat, lon);

// Calculate the half-side length (in degrees) for a 4 km region
      var halfSideInDegrees = 0.2;

      // Compute the bounds for the square
      var newsouthWest = L.latLng(latLng.lat - halfSideInDegrees, latLng.lng - halfSideInDegrees);
      var tempnorthEast = L.latLng(latLng.lat + halfSideInDegrees, latLng.lng + halfSideInDegrees);
      var tempbounds = L.latLngBounds(newsouthWest, tempnorthEast);

      // Create a rectangle (square) using the bounds
    //  L.rectangle(tempbounds, { color: 'red', fillOpacity: 0.1 }).addTo(map);
     var smallerSideInDegrees = 0.025;
      let coords = [];
// Create a 40x40 grid of smaller squares
const dummyData = [
  { value: 25 },
  { value: 22 },
  { value: 20 },
  { value: 15 },
  { value: 12 },
  { value: 10 },
  { value: 8 },
  { value: 5 },
  { value: 2 },
  { value: 0 },
  // Add more dummy data objects as needed
];


const assignColorsToSquares = (lat, lng) => {
  const colors = [];
  coords.forEach((coordString, index) => {
    const [tempLat, tempLng] = coordString.split(',').map(parseFloat);
    const dataValue = dummyData[index % dummyData.length].value; // Get corresponding dummy data value
    const color = getColor(dataValue); // Get color based on dummy data value
    colors.push(color); // Store color for each square
  });
  return colors;
};

// Inside your loop:
// for (var i = 0; i < 10; i++) {
//   for (var j = 0; j < 10; j++) {
//     var swLat = lat + (i - 5) * smallerSideInDegrees;
//     var swLng = lon + (j - 5) * smallerSideInDegrees;
//     var neLat = swLat + smallerSideInDegrees;
//     var neLng = swLng + smallerSideInDegrees;

//     var tempLat = (swLat + neLat) / 2;
//     var tempLng = (swLng + neLng) / 2;

//     coords.push(`${tempLat},${tempLng}`);

//     var smallerBounds = L.latLngBounds(L.latLng(swLat, swLng), L.latLng(neLat, neLng));
//     var color = assignColorsToSquares(tempLat, tempLng)[i * 10 + j]; // Get color for current square
//     L.rectangle(smallerBounds, { color: color, fillOpacity: 0.5 }).addTo(map);
//   }
// }



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

  //   // FIXME: not working
    L.marker([lat, lon], {icon: mapMarker }).addTo(map).bindPopup('Your Location.');
// Iterate over each dictionary in the array
if (useableData && Array.isArray(useableData)) {
  // Iterate over each dictionary in the array
  for (var i = 0; i < useableData.length; i++) {
      var dataPoint = useableData[i];
      var latitude = dataPoint.latitude; // Access latitude from the dictionary
      var longitude = dataPoint.longitude; // Access longitude from the dictionary

      // Create a marker at the coordinates of the data point
      var marker = L.marker([latitude, longitude]).addTo(map);

      // Customize the marker based on the data attributes
      // You can customize the popup content according to your data structure
      var popupContent = '<b>Data Point</b>:<br>';
      for (var key in dataPoint) {
          if (dataPoint.hasOwnProperty(key) && key !== 'latitude' && key !== 'longitude') {
              popupContent += `<b>${key}</b>: ${dataPoint[key]}<br>`;
          }
      }
      marker.bindPopup(popupContent);
  }
}


    // // Function to assign colors based on values
    function getColor(value) {
        return value > 20 ? '#AA0000' :
               value > 15 ? '#D60000' :
               value > 10 ? '#FF0000' :
               value > 5 ? '#FF2C2C' :
               value > 0 ? '#FF5353' :
                           '#FF7979';
        // const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']

        // let index = value % colors.length
    
        // return colors[index]
      }
      
    
      // assignColorsToSquares();
    // Create a GeoJSON layer with custom styles and add it to the map
    // L.geoJSON(geojsonFeature, {
    //     style: style
    // }).addTo(map);
      // Add a tile layer (e.g., OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }, []);
  
    return <div id="leaflet-map" style={{ height: '50vh' }}></div>;
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
      getCrime();
    }
    }, [zipcode]);
  // console.log("zip: ", zipcode)

  const getCrime = async () => {

 
    try {

      const response = await fetch(`https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data?zip=${zipcode}`,  {     
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '01836c3714msh582bac2093a6a03p19e6abjsn2b918034e4c0',
        'X-RapidAPI-Host': 'crime-data-by-zipcode-api.p.rapidapi.com'
      }
      });

      const data = await response.json();

      const breakdownList = [];
      // console.log(data);

      // Iterate over the Crime Breakdown array
      const overallData = data['Overall'];

      Object.entries(overallData).forEach(([key, value]) => {
        const categoryString = `${key}: ${value}`;
        breakdownList.push(categoryString);
      });
      
      data['Crime BreakDown'].forEach(crimeCategory => {
        Object.entries(crimeCategory).forEach(([key,value]) => {
          
         
          if (key != "0"){
          const categoryString = `${key}: ${Object.entries(value).map(([crimeType, rate]) => `${crimeType}: ${rate}`).join(', ')}`;
          // Add the constructed string to the list
          breakdownList.push(categoryString);
          } else if (key === "0"){ 
            const categoryString = `${value}`
          }

      });
        console.log(crimeCategory);
        // Extract the crime category and its rates
        
        const category = Object.keys(crimeCategory)[0];
        // const subrates = Object.keys(crimeCategory)[1]
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
  let requestData = [latitude, longitude];

  const responseData = Disease({ requestData });

  let useableData = JSON.parse(responseData);
  const headers = ['All Teeth Lost', 'Annual Checkup', 'Any Disability', 'Arthritis', 'Binge Drinking', 'COPD', 'Cancer (except skin)', 'Cervical Cancer Screening', 'Cholesterol Screening', 'Chronic Kidney Disease', 'Cognitive Disability', 'Colorectal Cancer Screening', 'Core preventive services for older men', 'Core preventive services for older women', 'Coronary Heart Disease', 'Current Asthma', 'Current Smoking', 'Dental Visit', 'Depression', 'Diabetes', 'General Health', 'Health Insurance', 'Hearing Disability', 'High Blood Pressure', 'High Cholesterol', 'Independent Living Disability', 'Mammography', 'Mental Health', 'Mobility Disability', 'Obesity', 'Physical Health', 'Physical Inactivity', 'Self-care Disability', 'Sleep <7 hours', 'Stroke', 'Taking BP Medication', 'Vision Disability', 'longitude', 'latitude'];
  console.log("Data: ", useableData);
  const [selectedOption, setSelectedOption] = useState('');
  console.log(selectedOption)

  // Event handler for selecting an option
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // console.log(requestData);
  return (
<Container className="landing-container bg-dark vh-100 p-4" fluid>
      <h1 className="header mh-25">Safecation</h1>
      <div className="d-flex map-div align-items-center justify-content-center">
        <Input className="d-flex search-bar w-50"
         type="text"
          placeholder="Enter address"
          autoFocus 
          value={address} onChange={(e) => setAddress(e.target.value)}/>
        <Button onClick={handleAddress}>Enter</Button>
      </div>

        {/* Render LeafletMap component */}
        {/* <br></br> */}
        <select className="scrollable-select" value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select an option</option>
          {headers.map((header, index) => (
            <option key={index} value={header}>{header}</option>
          ))}
        </select>
        <Container className="w-75 align-items-start" >
          <LeafletMap 
            lat={latitude} lon={longitude} />
        </Container>
      
        
      <div>
        <Disease requestData={zipCode}/>
        <CrimeListComponent crimeData={crimeData}/>
      </div>
    </Container>
  );

}