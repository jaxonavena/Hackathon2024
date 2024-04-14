import React, { useState, useEffect } from 'react';

function Disease({ requestData }) {
  const [responseData, setResponseData] = useState(null);

  const fetchData = async (requestData) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/retrieve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), // Sending requestData as a string
      });
      // console.log('Cord: ', requestData);
      const jsonData = await response.json();
      setResponseData(jsonData);
      console.log('data: ', JSON.stringify(responseData, null, 2));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the component mounts or requestData changes
  useEffect(() => {
    if (requestData) {
      fetchData(requestData);
    }
  }, [requestData]);

  return JSON.stringify(responseData, null, 2);
}

export default Disease;
