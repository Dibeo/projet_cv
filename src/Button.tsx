import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';

const ButtonUsage: React.FC = () => {
  const [count1, setCount1] = useState(0);

  function handleClick1() {
    console.log("Hello World");
    setCount1(count1+1);
  }

  return (
    <Button variant="contained" onClick={handleClick1}> Click me plz (Clicked {count1} times) </Button>;
    <Button variant="contained" onClick={handleClick1}> Or click me (Clicked {count1} times) </Button>;)
}

export default ButtonUsage;