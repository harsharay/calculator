import React, { useState } from "react"
import Calculator from "./Components/Calculator/Calculator"
import './App.css';

function App() {

  const [lightDark, setLightDark] = useState(true)

  const getLightDarkThemeData = value => {
    setLightDark(value)
  }

  return (
    <div className={ `${lightDark ? 'lightBackground' : 'darkBackground'} App` }>
      <Calculator getLightDarkThemeData={getLightDarkThemeData}/>
    </div>
  );
}

export default App;
