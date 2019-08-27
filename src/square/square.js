import React from 'react';


function Square(props) {
  const {value, active, onClick} = props;
  let classes = 'btn btn-outline-primary square';
  
  if (active) classes += ' active';

  return (
    <button className={classes} onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;