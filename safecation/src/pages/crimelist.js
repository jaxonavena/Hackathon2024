import React from 'react';
import { FixedSizeList } from 'react-window';
import crimeData from './Landing';



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
      if (key !== "0"){
        acc[key.trim()] = value.trim();
        return acc;
      } else {
      
      acc[value.trim()] = ""; // Trim whitespace from keys and values and add them to the object
      return acc;
  }}, {});
  });

  return (
    <div>
      <h2>Crime Data</h2>
      <ul>
        {parsedData.map((crime, index) => (
          <li key={index}>
            {/* <strong>Category {index + 1}:</strong> */}
            <ul>
              {Object.entries(crime).map(([key, value]) => (
                <li key={key}>
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

