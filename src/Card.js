import React from 'react';

const Card = (props) => {
  return (
    <span className='border'>
      <div className='p-2'>
        {props.value.toLocaleString()}
        <span className={props.class}>{props.name}</span>
      </div>
    </span>
  );
};

export default Card;