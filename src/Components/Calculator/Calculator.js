import React, { useState, useEffect } from "react"
import KeypadComponent from "../KeypadComponent/KeypadComponent"

import "./Calculator.css"

const Calculator = () => {

    const [numbers, setNumbers] = useState([])
    const [first, setFirst] = useState("")
    const [second, setSecond] = useState("")
    const [currentOperator, setCurrentOperator] = useState("")
    const [result, setResult] = useState("")


    useEffect(() => {
        for(let i=1; i<10; i++) {
            setNumbers(prevValue => [...prevValue, i])
        }
    },[])

    const addingToNumberStack = element => {
        if(element === "+" || element === "-" || element ==="*" || element === "/") {
            if(first && second) {
                // eslint-disable-next-line no-eval
                setResult(eval(first+currentOperator+second))
                // eslint-disable-next-line no-eval
                setFirst(eval(first+currentOperator+second))
                setSecond("")
                setCurrentOperator(element)
            } else {
                setCurrentOperator(element)
            }
        } else {
            if(currentOperator) {
                setSecond(prev => prev+element)
            } else {
                setFirst(prev => prev+element)
            }
        }
    }
    

    return (
        <div className="calculatorMainBlock">
            <div className="calculatorOutput" >
                {result || second || first}
            </div>
            <div className="calculatorKeypad">
                <div className="calculatorNumbers">
                    { numbers.map((number, index) => {
                        return (
                            <KeypadComponent number={number} value={number} key={index} addingToNumberStack={addingToNumberStack}/>
                        )
                    }) }
                    <KeypadComponent number={"Clear"} value={"Clear"} addingToNumberStack={addingToNumberStack}/>
                    <KeypadComponent number={0}  value={0} addingToNumberStack={addingToNumberStack}/>
                    <KeypadComponent number={"="} value={"="} addingToNumberStack={addingToNumberStack}/>
                </div>
                <div className="calculatorOperationsButton">
                    <KeypadComponent number={"Add(+)"} value={"+"} addingToNumberStack={addingToNumberStack}/>
                    <KeypadComponent number={"Subtract(-)"} value={"-"} addingToNumberStack={addingToNumberStack}/>
                    <KeypadComponent number={"Multiply(*)"} value={"*"} addingToNumberStack={addingToNumberStack}/>
                    <KeypadComponent number={"Divide(/)"} value={"/"} addingToNumberStack={addingToNumberStack}/>
                </div>
            </div>
        </div>
    )
}

export default Calculator;