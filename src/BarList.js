import React from 'react';
import Bar from './Bar';

const BarList = ({ bars }) => {
  return (
    <div>
      {bars && bars.map(bar => 
        <Bar bar={bar} key={bar.id} />
      )}
    </div>
  );
}

export default BarList;