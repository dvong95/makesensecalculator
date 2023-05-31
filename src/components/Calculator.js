import React, { useState } from "react";

let isFunctioned = false;
let isResulted = false;

const Calculator = () => {
    const [display, setDisplay] = useState('');
    const [operand, setOperand] = useState('');
    const [operator, setOperator] = useState('');

    const handleNumber = event => {
        if (display.includes('.') && event.target.value === '.')
            return;

        if ((!isResulted && !isFunctioned) && display.length >= 10 && display !== "IMPOSSIBLE!")
            return;

        if (isFunctioned || isResulted) {
            setDisplay(event.target.value);
            isFunctioned = false;
            isResulted = false;
        } else {
            setDisplay(display.concat(event.target.value));
        }
    }

    const handleNegative = () => {
        if (display.includes('-'))
            setDisplay(display.slice(1));
        else
            setDisplay('-'.concat(display));
    }

    const handleFunction = event => {
        if (isFunctioned)
            return;

        let result = display;

        if (operand !== '') {
            result = calculate(operator);
            setDisplay(result.toString());
        }

            isFunctioned = true;
            setOperator(event.currentTarget.value);
            setOperand(result);
        
    }

    const handleAllClear = () => {
        setDisplay('');
        setOperator('');
        setOperand('');
        isFunctioned = false;
        isResulted = false;
    }

    const handleClear = () => {
        setDisplay('');
    }

    const handleResult = () => {
        if (isResulted || operand === '' || display === '.')
            return;

        let result = calculate(operator);
        isResulted = true;

        try {
            setDisplay(result.toString());
            setOperand('');
            setOperator('');
        } catch (error) {
            setDisplay('Invalid');
        }
    }

    const calculate = operator => {
        if (operator === "/" && display === '0')
            return operand;
        
        if (operator === "/" && display === '1')
            return "IMPOSSIBLE!";

        switch (operator) {
            case "/": 
                return Number(operand) / Number(display);
            case "*": 
                return Number(operand) * Number(display);
            case "-": 
                return Number(operand) - Number(display);
            case "+": 
                return Number(operand) + Number(display);
            case "^":
                return Math.pow(Number(operand), Number(display));
            case "!":
                return factorial(display);
        }
    }

    const factorial = number => {

        if (number < 2)
            return 1;
        return number * factorial(number - 1);
    };

    return (
        <>
            <div className="w-96 h-full mt-auto mb-auto pb-10 bg-gray-500 text-center mx-auto border-2 rounded border-black overflow-hidden">
                <div className="p-5">MAKE SENSE CALCULATOR</div>
                <Display display={ display } setDisplay={ setDisplay } />
                <Functions handleClear={ handleClear } handleAllClear={ handleAllClear } 
                    handleFunction={ handleFunction } />
                <Numbers handleNumber={ handleNumber } handleNegative={ handleNegative } />
                <Operators handleResult={ handleResult } handleFunction={ handleFunction } />
            </div>
        </>
    );
}

const Display = ({ display }) => {
    return (
        <>
            <input disabled value={ display.replace(/\B(?=(\d{3})+(?!\d))/g, ",") } placeholder="0" className="text-white text-4xl text-right block pr-6 h-24 w-80 bg-slate-300 mx-auto border-2 border-black rounded" />
        </>
    );

}

const Functions = ({ handleClear, handleAllClear, handleFunction }) => {
    return (
        <>
            <div className="grid grid-cols-3 w-9/12 gap-4 justify-items-center pt-4 pb-4 float-left">
            <button onClick={ handleAllClear } className="flex border-2 w-16 h-16 items-center justify-center">AC</button>
            <button onClick={ handleClear } className="flex border-2 w-16 h-16 items-center justify-center">C</button>
            <button value="^" onClick={ handleFunction } className="font-serif flex border-2 w-16 h-16 items-center justify-center"><em>x<sup>y</sup></em></button>
            </div>
            <div className="grid grid-cols-1 w-3/12 gap-4 pt-4 pb-4 justify-items-center">
                <button value="!" onClick={ handleFunction } className="font-serif flex border-2 w-16 h-16 items-center justify-center"><em>n!</em></button>
            </div>
        </>
    );
}

const Numbers = ({ handleNumber, handleNegative }) => {
    return (
        <div className="grid grid-cols-3 w-9/12 gap-4 justify-items-center float-left">
            <button value="7" onClick={ handleNumber } className="flex border-2 w-16 h-16 items-center justify-center">7</button>
            <button value="8" onClick={ handleNumber } className="flex border-2 w-16 h-16 items-center justify-center">8</button>
            <button value="9" onClick={ handleNumber } className="flex border-2 w-16 h-16 items-center justify-center">9</button>
            <button value="4" onClick={ handleNumber } className="flex border-2 w-16 h-16 items-center justify-center">4</button>
            <button value="5" onClick={ handleNumber } className="flex border-2 w-16 h-16 items-center justify-center">5</button>
            <button value="6" onClick={ handleNumber } className="flex border-2 w-16 h-16 items-center justify-center">6</button>
            <button value="1" onClick={ handleNumber } className="flex border-2 w-16 h-16 items-center justify-center">1</button>
            <button value="2" onClick={ handleNumber } className="flex border-2 w-16 h-16 items-center justify-center">2</button>
            <button value="3" onClick={ handleNumber } className="flex border-2 w-16 h-16 items-center justify-center">3</button>
            <button onClick={ handleNegative } className="flex border-2 w-16 h-16 items-center justify-center">+/-</button>
            <button value="0" onClick={ handleNumber } className="flex border-2 w-16 h-16 items-center justify-center">0</button>
            <button value="." onClick={ handleNumber } className="flex border-2 w-16 h-16 items-center justify-center">.</button>
        </div>
    );
}

const Operators = ({ handleResult, handleFunction }) => {
    return (
        <>
            <div className="grid grid-cols-1 w-3/12 gap-4 justify-items-center">
                <button value="/" onClick={ handleFunction } className="flex border-2 w-16 h-16 items-center justify-center">÷</button>
                <button value="*" onClick={ handleFunction } className="flex border-2 w-16 h-16 items-center justify-center">x</button>
                <button value="-" onClick={ handleFunction } className="flex border-2 w-16 h-16 items-center justify-center">-</button>
                <button value="+" onClick={ handleFunction } className="flex border-2 w-16 h-16 items-center justify-center">+</button>
            </div>
                <button onClick={ handleResult } className="mt-4 border-2 w-11/12 mx-auto h-16 items-center">=</button>
        </>
    );
}

export default Calculator;