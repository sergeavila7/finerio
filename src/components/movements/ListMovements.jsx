import React from 'react';
import { FixedSizeList as List } from 'react-window';
import Movements from './Movements';
const ListMovements = () => {
  return (
    <>
      <List
        height={450}
        itemCount={1}
        itemSize={50}
        useIsScrolling={true}
      >
        {Movements}
      </List>
    </>
  );
};

export default ListMovements;
