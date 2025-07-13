import { useState, useEffect, useRef } from 'react'
import './Upgrade.css'

function Upgrade(props) {
  const [owned, setOwned] = useState(false);

  function buy() {
    if (owned) return;
    const bought = props.buy();   // ask parent to deduct points
    if (bought) setOwned(true);
  }
    return (
      <>
        <button className="upbox" onClick={buy}>
          <p>{props.name}</p>
          <p>{owned ? "Owned" : `Cost: ${props.cost}`}</p>
        </button>
      </>
    )
}

export default Upgrade
