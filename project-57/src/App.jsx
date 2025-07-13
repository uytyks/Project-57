import { useState, useEffect, useRef } from 'react'
import Display from './Display.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [cps, setCPS] = useState(.15)
  const [base, setBase] = useState(1)
  const cpsRef = useRef(cps);
  cpsRef.current = cps;

  //Functions
  function upgradeBase(value, operation) {
    if (operation == "add") {
      setBase((base) => base + value)
    } else if (operation = "mult") {
      setBase((base) => base * value)
    } else {
      throw new Error("Operation not recognized!");
    }
  }

  
  useEffect(() => {let timer = setInterval(() => {
      setCount(count => count + cpsRef.current);
    }, 1000);
    return () => clearInterval(timer);},[]);

  return (
    <>
      <Display />
    </>
  )
}

export default App
