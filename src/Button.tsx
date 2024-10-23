import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';

const ButtonUsage: React.FC = () => {
  const [count, setCount] = useState(0);

  function handleClick() {
    console.log("Hello World");
    setCount(count+1);
  }

  return <Button variant="contained" onClick={handleClick}> Click me plz (Clicked {count} times) </Button>;
}

export default ButtonUsage;