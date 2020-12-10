import React, { useState, useEffect } from "react"
import KeypadComponent from "../KeypadComponent/KeypadComponent"

import "./Calculator.css"

const Calculator = () => {

    const [numbers, setNumbers] = useState([])
    // const [first, setFirst] = useState("")
    // const [second, setSecond] = useState("")
    const [numbersStack, setNumberStack] = useState("")
    const [operands, setOperands] = useState("")
    // const { result, setResult } = useState(0)

    // const operations = {
    //     "+" : function(a,b) {
    //         return a+b
    //     },
    //     "-" : function(a,b) {
    //         return a-b
    //     },
    //     "*" : function(a,b) {
    //         return a*b
    //     },
    //     "/" : function(a,b) {
    //         return a/b
    //     }
    // }

    useEffect(() => {
        for(let i=1; i<10; i++) {
            setNumbers(prevValue => [...prevValue, i])
        }
    },[])

    useEffect(() => {
        console.log(38,numbersStack)
    },[numbersStack])


    const handleAddingItemsToStack = element => {
        if(element === "Clear"){
            setNumberStack(0)
        }
        else {
            setNumberStack(prev => prev+element)
        }
    }

    const handleCalculation = (element) => {
        // if(element === "+" || element === "-" || element === "*" || element === "/") {
        //     // eslint-disable-next-line no-eval
        //     setNumberStack(eval(numbersStack))
        // }
        if(element === "=") {
            // eslint-disable-next-line no-eval
            setNumberStack(eval(numbersStack))
        }
    }

    return (
        <div className="calculatorMainBlock">
            <div className="calculatorOutput" >
                {numbersStack}
            </div>
            <div className="calculatorKeypad">
                <div className="calculatorNumbers">
                    { numbers.map((number, index) => {
                        return (
                            <KeypadComponent number={number} value={number} key={index} handleAddingItemsToStack={handleAddingItemsToStack} handleCalculation={handleCalculation}/>
                        )
                    }) }
                    <KeypadComponent number={"Clear"} value={"Clear"} handleAddingItemsToStack={handleAddingItemsToStack} handleCalculation={handleCalculation}/>
                    <KeypadComponent number={0}  value={0} handleAddingItemsToStack={handleAddingItemsToStack} handleCalculation={handleCalculation}/>
                    <KeypadComponent number={"="} value={"="} handleAddingItemsToStack={handleAddingItemsToStack} handleCalculation={handleCalculation}/>
                </div>
                <div className="calculatorOperationsButton">
                    <KeypadComponent number={"Add(+)"} value={"+"} handleAddingItemsToStack={handleAddingItemsToStack} handleCalculation={handleCalculation}/>
                    <KeypadComponent number={"Subtract(-)"} value={"-"} handleAddingItemsToStack={handleAddingItemsToStack} handleCalculation={handleCalculation}/>
                    <KeypadComponent number={"Multiply(*)"} value={"*"} handleAddingItemsToStack={handleAddingItemsToStack} handleCalculation={handleCalculation}/>
                    <KeypadComponent number={"Divide(/)"} value={"/"} handleAddingItemsToStack={handleAddingItemsToStack} handleCalculation={handleCalculation}/>
                </div>
            </div>
        </div>
    )
}

export default Calculator;