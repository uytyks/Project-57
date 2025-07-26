import { useState, useEffect } from 'react'
import './Display.css'
import Upgrade from './Upgrade.jsx'


function Display() {
  const [count, setCount] = useState(0)
  const [cps, setCPS] = useState(1)
  const [base, setBase] = useState(1)
  const [mult, setMult] = useState(1)
  const [upgradesEnabled, setUpgradesEnabled] = useState({
  clicks4: false,
  whatever: false,
  whatever2: false,
});

  const ticksPerSecond = 60;
  const tickInterval = 1000 / ticksPerSecond;

  const upgrades = [{
  cost: 1,
  name: "+1 Base Clicks per second",
  action: function(){
    setBase((base) => base + 1)
  }
  },{
  cost: 15,
  name: "X2.5 Clicks per second multiplier",
  action: function(){
    setMult(2.5)
  }
  },{
  cost: 40,
  name: "+2 MORE to Base Clicks",
  action: function(){
    setBase((base) => base + 2)
  }
  },{
  cost: 100,
  name: "10% of clicks added to base",
  action: function(){
    activateUpgrade("clicks4");
  }
  },{
  cost: 200,
  name: "Let loose the gates of hell" //Unlocks next layer
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

  function activateUpgrade(name) {
    setUpgradesEnabled(prev => ({
      ...prev,
      [name]: true
    }));
  }

  //Reactive Changes
  //Updates count every time cps changes
  useEffect(() => {let timer = setInterval(() => {
    let perTick = cps / ticksPerSecond;
    setCount(count => parseFloat((count + perTick).toFixed(2)));
    }, tickInterval);
    return () => clearInterval(timer);},[cps]);

  //Updates cps every time base or mult changes
  useEffect(() => {
    const uClicks4 = upgradesEnabled.clicks4 ? count * 0.01 : 0; //Adds clicks4 upgrade if purchased
    setCPS((base + uClicks4) * mult);
    }, [base, mult, count]);

  return (
    <>
      <h1>Incremental Yippee</h1>
      <div className="display">
        <p className="main">You have <b>{count.toFixed(2)}</b> clicks</p>
        <p>
          You have {cps.toFixed(2)} clicks per second
        </p>
      </div>
      <ul className="upgrades">{upgradeButtons}</ul>
    </>
  )
}

export default Display
