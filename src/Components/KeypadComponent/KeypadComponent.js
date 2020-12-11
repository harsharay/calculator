import React, { useState } from "react"

import "./KeypadComponent.css"

const KeypadComponent = ({ number, value, addingToNumberStack, lightDark }) => {


    const handleButtonClick = num => {
        console.log(num)
        addingToNumberStack(num)
    }

    return (
        <div className={ `${lightDark ? 'lightMode' : 'darkMode'} keypadComponentStyle` } onClick={() => handleButtonClick(value)}>
            <p>{number}</p>
        </div>
    )
}

export default KeypadComponent;