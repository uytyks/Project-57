import { useState, useEffect, useRef } from 'react'
import './Display.css'

function Display() {
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

  //Global Timers/Checks
  // useEffect(() => {
  //     setCPS((cps) => Math.round(count * 100)/100);
  //   },[count]);
  
  useEffect(() => {let timer = setInterval(() => {
      setCount(count => count + cpsRef.current);
    }, 1000);
    return () => clearInterval(timer);},[]);

  return (
    <>
      <h1>Click Button Yippee</h1>
      <div class="display">
        <p class="main">You have <b>{count.toFixed(2)}</b> clicks</p>
        <button onClick={() => {
          setCount((count) => count + base)
          }}>
          Click
        </button>
        <p>
          You have {cps} clicks per second
        </p>
      </div>
    </>
  )
}

export default Display
