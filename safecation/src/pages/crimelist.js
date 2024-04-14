import React from 'react';

import crimeData from './Landing';
import './crimelist.css';



const items = crimeData; 

console.log(crimeData);


function CrimeListComponent({ crimeData }) {
  // Check if crimeData is defined
  if (!crimeData || crimeData.length === 0) {
    return <div>No crime data available</div>;
  }

  // Parse the crime data strings to extract relevant information
  const parsedData = crimeData.map(item => {
    const parts = item.split(', '); // Split each string by ', ' to separate key-value pairs
    return parts.reduce((acc, curr) => {

      const [key, value] = curr.split(': '); // Split each key-value pair by ': ' to get key and value
      if (key !== "0" ){
        acc[key.trim()] = value.trim();
        return acc;
      } else {
      
      acc[value.trim()] = ""; // Trim whitespace from keys and values and add them to the object
      return acc;
  }}, {});
  });

  return (
    <div className="crime-data-container">
      <h2 className="crime-data-heading">Crime Data</h2>
      <h3 className='units'>Crime Rates per 1000 residents</h3>
      <ul className="crime-list">
        {parsedData.map((crime, index) => (
          <li key={index} className="crime-item">
            <ul className="crime-details">
              {Object.entries(crime).map(([key, value]) => (
                <li key={key} className="crime-detail-item">
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default CrimeListComponent;

