import React from 'react';
import Bar from './Bar';

const BarList = (props) => {
  return (
    <div>
      {props.bars && props.bars.map(bar => 
        <Bar 
          key={bar.id} 
          bar={bar} 
          isAuth={props.isAuth}
          userId={props.userId}
          updateCheckGoing={props.updateUserGoing}
        />
      )}
    </div>
  );
}

export default BarList;