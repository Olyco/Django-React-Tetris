import { useState, useEffect } from "react"
import { createField } from "../components/Field"
import { COLNUM, ROWNUM, EXTRA_ROWNUM } from "../constants";

export const useField = (player, resetPlayer, gameOver) => {
    const [field, setField] = useState(createField({colNum: COLNUM, rowNum: ROWNUM + EXTRA_ROWNUM}));
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0); // in current rendering

        const clearFilledRows = newField => {
            let clearedRows = 0;

            const clearedField = newField.reduce((acc, row) => {
                if (row.findIndex(block => block[0] === 0) === -1) { // find filled row
                    clearedRows++;
                    acc.unshift(new Array(newField[0].length).fill([0, 'clear'])); // add rows to the top
                    return acc;
                }
                acc.push(row);
                return acc;
            }, []);
            
            //console.log(`${clearedRows} ROWS CLEARED`)
            setRowsCleared(clearedRows);
            return clearedField;
        };

        const updateField = prevField => {

            const newField = prevField.map(row => 
                row.map(block => (block[1] === 'clear' ? [0, 'clear'] : block))); // empty blocks && landed tetrominos
        
            //console.log("player on field: ", player)
            player.tetromino.forEach((row, y) => { // adding player on field
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newField[y + player.pos.y][x + player.pos.x] = 
                        [value, `${player.landed ? 'occupied' : 'clear'}`];
                    }
                });
            });

            if (player.landed) {
                if (!gameOver) {
                    //console.log("reset player after landing")
                    resetPlayer(newField);
                }
                
                return clearFilledRows(newField);
            }

            return newField;
        };

        setField(prev => updateField(prev));
    }, [player.landed, player.pos.x, player.pos.y, player.tetromino, resetPlayer, gameOver]); // меняется => отрисовка

    return [field, setField, rowsCleared];
};