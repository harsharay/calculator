import React, { useState } from "react"

import "./KeypadComponent.css"

const KeypadComponent = ({ number, value, addingToNumberStack }) => {


    const handleButtonClick = num => {
        console.log(num)
        addingToNumberStack(num)
    }

    return (
        <div className="keypadComponentStyle" onClick={() => handleButtonClick(value)}>
            <p>{number}</p>
        </div>
    )
}

export default KeypadComponent;