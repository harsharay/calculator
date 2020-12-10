import React, { useState, useEffect } from "react"
import KeypadComponent from "../KeypadComponent/KeypadComponent"

import "./Calculator.css"

const Calculator = () => {

    const [numbers, setNumbers] = useState([])
    const [numbersStack, setNumberStack] = useState([0])
    const [operands, setOperands] = useState("")
    // const { result, setResult } = useState(0)

    const operations = {
        "+" : function(a,b) {
            return a+b
        },
        "-" : function(a,b) {
            return a-b
        },
        "*" : function(a,b) {
            return a*b
        },
        "/" : function(a,b) {
            return a/b
        }
    }

    useEffect(() => {
        for(let i=1; i<10; i++) {
            setNumbers(prevValue => [...prevValue, i])
        }
    },[])

    useEffect(() => {
        if(numbersStack.length > 2) {
            let actualNumbers = numbersStack.slice(1)
            let output = actualNumbers.reduce(operations[operands])

            setNumberStack([0,output])
            console.log(38, [output])
        }
    },[numbersStack])

    const handleAddingItemsToStack = element => {
        if(element === "Clear"){
            setNumberStack([0])
        }
        else {
            if((element === "+") || (element ==="-") || (element === "*") || (element === "/")) {
                setOperands(element)
            } else {
                setNumberStack(prev => [...prev, element])
            }
        }
    }


    return (
        <div className="calculatorMainBlock">
            <div className="calculatorOutput" >
                { numbersStack.slice(-1)}
            </div>
            <div className="calculatorKeypad">
                <div className="calculatorNumbers">
                    { numbers.map((number, index) => {
                        return (
                            <KeypadComponent number={number} value={number} key={index} handleAddingItemsToStack={handleAddingItemsToStack}/>
                        )
                    }) }
                    <KeypadComponent number={"Clear"} value={"Clear"} handleAddingItemsToStack={handleAddingItemsToStack}/>
                    <KeypadComponent number={0}  value={0} handleAddingItemsToStack={handleAddingItemsToStack}/>
                    <KeypadComponent number={"="} value={"="} handleAddingItemsToStack={handleAddingItemsToStack}/>
                </div>
                <div className="calculatorOperationsButton">
                    <KeypadComponent number={"Add(+)"} value={"+"} handleAddingItemsToStack={handleAddingItemsToStack}/>
                    <KeypadComponent number={"Subtract(-)"} value={"-"} handleAddingItemsToStack={handleAddingItemsToStack}/>
                    <KeypadComponent number={"Multiply(*)"} value={"*"} handleAddingItemsToStack={handleAddingItemsToStack}/>
                    <KeypadComponent number={"Divide(/)"} value={"/"} handleAddingItemsToStack={handleAddingItemsToStack}/>
                </div>
            </div>
        </div>
    )
}

export default Calculator;