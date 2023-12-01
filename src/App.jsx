import './App.css';
import React, { useState } from 'react';

const App = () => {
    const [lotteryArrays, setLotteryArrays] = useState([]);

    const generateRandomNumbers = () => {
        const numbersArray = [];
        const ranges = [
            { min: 1, max: 10, count: 0 },
            { min: 11, max: 20, count: 0 },
            { min: 21, max: 30, count: 0 },
            { min: 31, max: 40, count: 0 },
            { min: 41, max: 45, count: 0 },
        ];

        const countNumbersInRange = (numbers, range) => {
            return numbers.filter((num) => num >= range.min && num <= range.max).length;
        };

        const checkRangeLimit = (numbers) => {
            for (const range of ranges) {
                const count = countNumbersInRange(numbers, range);
                if (count >= 3) {
                    return true; // ranges에 3개 이상의 숫자가
                }
            }
            return false;
        };

        for (let i = 0; i < 5; i++) {
            let numbers = [];
            let limitExceeded = true;

            while (limitExceeded) {
                numbers = [];
                while (numbers.length < 6) {
                    const randomNumber = Math.floor(Math.random() * 45) + 1;
                    if (!numbers.includes(randomNumber)) {
                        numbers.push(randomNumber);
                    }
                }
                numbers.sort((a, b) => a - b);
                limitExceeded = checkRangeLimit(numbers);
            }

            numbersArray.push(numbers);
        }

        return numbersArray;
    };

    const handleButtonClick = () => {
        const newLotteryArrays = generateRandomNumbers();
        setLotteryArrays(newLotteryArrays);
    };

    return (
        <div className="container">
            <h1 className="title">Lottery Number Generator</h1>
            <button className="generate-btn" onClick={handleButtonClick}>
                Generate Numbers
            </button>
            <div className="generated-number-container">
                {lotteryArrays.map((numbers, index) => (
                    <div key={index}>
                        <p className="generated-number">{`${numbers.join(', ')}`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
