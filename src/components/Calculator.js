import React, { useState, useRef } from "react";

let isInvalid = false;
let isResulted = false;

const Calculator = () => {
    const [equation, setEquation] = useState('');
    const [result, setResult] = useState('');

    const handleClick = (event) => {
        if (equation.includes('.') && event.target.value === '.')
            return;

        if (event.target.value.length >= 10)
            return;

        if (isInvalid || isResulted) {
            setEquation(event.target.value);
            isInvalid = false;
        } else {
        setEquation(equation.concat(event.target.value));
        console.log(event.target.value.length);
        }
    };

    const handleAllClear = () => {
        setEquation('');
        setResult('');
        isInvalid = false;
        isResulted = false;
    };

    const handleClear = () => {
        setEquation('');
    };

    const handleResult = () => {
        try {
            setEquation(eval(equation));
            setResult(eval(equation));
        } catch (error) {
            setEquation('Invalid');
            isInvalid = true;
        }
    };

    return (
        <>
            <div className="w-96 h-screen bg-gray-500 text-center mx-auto border-2 border-black overflow-hidden">
                <div className="p-5">Calculator That Makes Sense</div>
                <Display equation={ equation } setEquation={setEquation} />
                <Functions handleClear={ handleClear } handleAllClear={ handleAllClear } />
                <Numbers handleClick={ handleClick } />
                <Operators handleResult={ handleResult } handleClick={ handleClick } />
            </div>
        </>
    );
};

const Display = ({ equation, setEquation }) => {


    return (
        <>
            <input type="number" value={ equation } onChange={e => setEquation(e.target.value)} placeholder="0" className="text-white text-4xl text-right block pr-6 h-24 w-80 bg-slate-300 mx-auto border-2 border-black" />
        </>
    );

};

const Functions = ({ handleClear, handleAllClear }) => {
    return (
        <>
            <div className="grid grid-cols-4 w-full gap-4 justify-items-center pt-4 pb-4">
            <button onClick={ handleAllClear } className="flex border-2 w-16 h-16 items-center justify-center">AC</button>
            <button onClick={ handleClear } className="flex border-2 w-16 h-16 items-center justify-center">C</button>
            </div>
        </>
    );
};

const Numbers = ({ handleClick }) => {
    return (
        <div className="grid grid-cols-3 w-9/12 gap-4 justify-items-center float-left">
            <button value="7" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">7</button>
            <button value="8" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">8</button>
            <button value="9" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">9</button>
            <button value="4" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">4</button>
            <button value="5" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">5</button>
            <button value="6" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">6</button>
            <button value="1" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">1</button>
            <button value="2" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">2</button>
            <button value="3" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">3</button>
            <button value="-" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">+/-</button>
            <button value="0" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">0</button>
            <button value="." onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">.</button>
        </div>
    );
}

const Operators = ({ handleResult, handleClick }) => {
    return (
        <>
            <div className="grid grid-cols-1 w-3/12 gap-4 justify-items-center">
                <button value="/" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">÷</button>
                <button value="*" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">x</button>
                <button value="-" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">-</button>
                <button value="+" onClick={ handleClick } className="flex border-2 w-16 h-16 items-center justify-center">+</button>
                <button onClick={ handleResult } className="flex border-2 w-16 h-16 items-center justify-center">=</button>
            </div>
        </>
    );
};

export default Calculator;