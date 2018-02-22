import React from 'react';
import Bar from './Bar';

const BarList = (props) => {
  return (
    <div>
      {props.bars && props.bars.map(bar => 
        <Bar 
          key={bar.id} 
          bar={bar} 
          handleShowPopover={props.handleShowPopover}
          handleRequestClosePopover={props.handleRequestClosePopover}
          popoverOpen={props.popoverOpen}
          popoverAnchorEl={props.popoverAnchorEl}
        />
      )}
    </div>
  );
}

export default BarList;