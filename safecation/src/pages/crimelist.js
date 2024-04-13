import React from 'react';
import { FixedSizeList } from 'react-window';
import crimeData from './Landing';
import { useState } from 'react';


const items = crimeData; 


const getItemSize = index => {
  // return a size for items[index]
}

const ListComponent = ({crimeData}) => {
    const testData = Array.from({ length: 100 }, (_, index) => ({
        id: index,
        crimeitem: `Item ${index + 1}`,
        description: `Description for Item ${index + 1}`,
      }));

    const Row = ({ index, style }) => {
        const item = testData[index];
        return (
          <div style={style}>
            <h3>{item.crimeitem}</h3>
            <p>{item.description}</p>
          </div>
        );
    };

    return (
    <FixedSizeList
      height={500} // Height of the list
      width={300} // Width of the list
      itemCount={items.length} // Total number of items
      itemSize={50} // Height of each item
    >
      {Row} {/* Render each item */}
    </FixedSizeList>
    )
};

export default ListComponent;