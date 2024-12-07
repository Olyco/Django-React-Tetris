import { useState, useEffect, useCallback, memo } from "react";

export const useGameState = (rowsCleared) => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);

    const scoreIncrement = [100, 300, 700, 1500];

    const calcScore = useCallback(() => {
        //console.log(`SETTING CLEARED ROWS: ${rowsCleared}`);
        setScore(prev => prev + scoreIncrement[rowsCleared - 1]);
        setRows(prev => prev + rowsCleared);
    }, [scoreIncrement, rowsCleared]);

    useEffect(() => {
        if (rowsCleared > 0) {
            calcScore();
        }
    }, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRows];
};