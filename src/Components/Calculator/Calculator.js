import React, { useState, useEffect } from "react"
import KeypadComponent from "../KeypadComponent/KeypadComponent"

import "./Calculator.css"

const Calculator = ({ getLightDarkThemeData }) => {

    const [numbers, setNumbers] = useState([])
    const [first, setFirst] = useState("")
    const [second, setSecond] = useState("")
    const [currentOperator, setCurrentOperator] = useState("")
    const [scientificButtonClicked, setScientificButtonClicked] = useState(false)
    const [positiveOrNegative, setPositiveOrNegative] = useState(true) //true is for positive
    const [lightDark, setLightDark] = useState(true) //true implies light mode 

    useEffect(() => {
        for(let i=1; i<10; i++) {
            setNumbers(prevValue => [...prevValue, i])
        }
    },[])

    const addingToNumberStack = element => {
        if(element === "+" || element === "-" || element ==="*" || element === "/") {
            if(first && second) {
                // eslint-disable-next-line no-eval
                setFirst(eval(first+currentOperator+second))
                setSecond("")
                setCurrentOperator(element)
            } else {
                setCurrentOperator(element)
            }
        } else if(element === "="){
            // eslint-disable-next-line no-eval
            setFirst(eval(first+currentOperator+second))
            setSecond("")
            setCurrentOperator("")
        } else if(element === "Clear"){
            setFirst("")
            setSecond("")
            setCurrentOperator("")
        } else {
            if(currentOperator) {
                setSecond(prev => prev+element)
            } else {
                setFirst(prev => prev+element)
            }
        }
    }
    
    const handleScientificButtonClick = () => {
        setScientificButtonClicked(!scientificButtonClicked)
    }

    const handleSpecialButttonClick = e => {
        let { value } = e.target
        if(value === "sign") {
            if(positiveOrNegative) {
                if(currentOperator) {
                    setSecond(prev => prev*-1)
                } else {
                    setFirst(prev => prev*-1)
                }
            } else {
                if(currentOperator) {
                    setSecond(prev => prev*1)
                } else {
                    setFirst(prev => prev*1)
                }
            }
        } else if(value === "square") {
            if(second) {
                setSecond(prev => prev * prev)
                setFirst("")
                setCurrentOperator("")
            } else {
                setFirst(prev => prev * prev)
                setSecond("")
                setCurrentOperator("")
            }
        } else if(value === "squareRoot") {
            setFirst(prev => Math.sqrt(prev))
        }
    }

    const handleLightDarkToggle = e => {
        let { value } = e.target

        if(value === "lightTheme") {
            setLightDark(true)
            getLightDarkThemeData(true)
        } else {
            setLightDark(false)
            getLightDarkThemeData(false)
        }

    }
    

    return (
        <div className="calculatorMainBlock">
            <div className={ `${lightDark ? 'lightMode' : 'darkMode'} calculatorOutput` } >
                {second || first || 0}
            </div>
            <div className="calculatorKeypad">
                <div className="calculatorNumbers">
                    { numbers.map((number, index) => {
                        return (
                            <KeypadComponent number={number} value={number} key={index} addingToNumberStack={addingToNumberStack} lightDark={lightDark}/>
                        )
                    }) }
                    <KeypadComponent number={"Clear"} value={"Clear"} addingToNumberStack={addingToNumberStack} lightDark={lightDark}/>
                    <KeypadComponent number={0}  value={0} addingToNumberStack={addingToNumberStack} lightDark={lightDark}/>
                    <KeypadComponent number={"="} value={"="} addingToNumberStack={addingToNumberStack} lightDark={lightDark}/>
                </div>
                <div className="calculatorOperationsButton">
                    <KeypadComponent number={"Add(+)"} value={"+"} addingToNumberStack={addingToNumberStack} lightDark={lightDark}/>
                    <KeypadComponent number={"Subtract(-)"} value={"-"} addingToNumberStack={addingToNumberStack} lightDark={lightDark}/>
                    <KeypadComponent number={"Multiply(*)"} value={"*"} addingToNumberStack={addingToNumberStack} lightDark={lightDark}/>
                    <KeypadComponent number={"Divide(/)"} value={"/"} addingToNumberStack={addingToNumberStack} lightDark={lightDark}/>
                </div>
                <div>
                    <button className={ `${lightDark ? 'lightMode' : 'darkMode'} scientificModeButton` } onClick={handleScientificButtonClick}>Scientific mode</button>
                    { scientificButtonClicked &&
                        <div>
                            <button className={ `${lightDark ? 'lightMode' : 'darkMode'} specialButtons` } onClick={handleSpecialButttonClick} value="sign">Sign</button>
                            <button className={ `${lightDark ? 'lightMode' : 'darkMode'} specialButtons` } onClick={handleSpecialButttonClick} value="square">Square</button>
                            <button className={ `${lightDark ? 'lightMode' : 'darkMode'} specialButtons` } onClick={handleSpecialButttonClick} value="squareRoot">Square Root</button>
                        </div>   
                    }
                </div>
            </div>
            <div>
                <button className={ `${lightDark ? 'lightMode' : 'darkMode'} lightDark` } onClick={handleLightDarkToggle} value="lightTheme">Light Theme</button>
                <button className={ `${lightDark ? 'lightMode' : 'darkMode'} lightDark` } onClick={handleLightDarkToggle} value="darkTheme">Dark Theme</button>
            </div>
        </div>
    )
}

export default Calculator;