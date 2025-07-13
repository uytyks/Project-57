import { useState, useEffect, useRef } from 'react'
import './Display.css'
import Upgrade from './Upgrade.jsx'


function Display() {
  const [count, setCount] = useState(0)
  const [cps, setCPS] = useState(.15)
  const [base, setBase] = useState(1)
  const cpsRef = useRef(cps);
  cpsRef.current = cps;

  const upgrades = [{
  cost: 1,
  name: "Points yippee",
  action: function(){
    setCPS((cps) => cps * 2)
  }
  },{
  cost: 200,
  name: "More point?"
  },{
  cost: 300,
  name: "Increm :(("
  },{
  cost: 400,
  name: "Die"
  },{
  cost: 1000,
  name: "Die (real)"
  }];

  const upgradeButtons = upgrades.map((upgrade, index) => (
    <Upgrade key={index} name={upgrade.name} cost={upgrade.cost} buy={() => buyUpgrade(upgrade)}/>
  ));

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
  
  function buyUpgrade(upgrade) {
    if (count >= upgrade.cost) {
      setCount(c => c - upgrade.cost);
      upgrade.action();  
      return true;
    }
    return false;
  }

  useEffect(() => {let timer = setInterval(() => {
      setCount(count => count + cpsRef.current);
    }, 1000);
    return () => clearInterval(timer);},[]);

  return (
    <>
      <h1>Incremental Yippee</h1>
      <div className="display">
        <p className="main">You have <b>{count.toFixed(2)}</b> clicks</p>
        <p>
          You have {cps} clicks per second
        </p>
      </div>
      <ul className="upgrades">{upgradeButtons}</ul>
    </>
  )
}

export default Display
