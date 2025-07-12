import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [cps, setCPS] = useState(0)
  const [base, setBase] = useState(1)

  //Functions
  function upgradeBase(value, operation) {
    if (operation == "add") {
      setBase(base + value)
    } else if (operation = "mult") {
      setBase(base * value)
    } else {
      throw new Error("Operation not recognized!");
    }
  }

  return (
    <>
      <h1>Click Button Yippee</h1>
      <div class="display">
        <p class="main">You have <b>{count}</b> clicks</p>
        <button onClick={() => setCount((count) => count + base)}>
          Click
        </button>
        <p>
          You have {cps} clicks per second
        </p>
      </div>
    </>
  )
}

export default App
