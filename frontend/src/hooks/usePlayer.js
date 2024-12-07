import { useCallback, useState } from "react"
import { TETROMINOS, randomTetromino, ROWNUM, COLNUM } from "../constants";

const rotate = (matrix, dir=1) => { //rotate clockwise
    const cols = matrix.map((_, row_n) => matrix.map(col => col[row_n]));
    if (dir === -1) {
        return cols.reverse();
    }

    const reversedCols = cols.map(row => row.reverse());
    return reversedCols;
};

export const checkCollision = ( player, field, { dx, dy }) => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[0].length; x++) {
            // we're in tetromino's block
            if (player.tetromino[y][x] !== 0) {
                if (!(x + player.pos.x + dx < COLNUM && x + player.pos.x + dx >= 0) 
                    || !(y + player.pos.y + dy < ROWNUM + 3) 
                    || field[y + player.pos.y + dy][x + player.pos.x + dx][1] !== 'clear') {
                    return true;
                }
            }
        }
    }
    return false;
};

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        landed: false,
    });

    const rotatePlayer = (field) => {
        const playerCopy = JSON.parse(JSON.stringify(player));
        playerCopy.tetromino = rotate(playerCopy.tetromino)

        const player_x = playerCopy.pos.x;
        let offset = 1;

        // collisions with landed tetrominos and cutting
        while (checkCollision(playerCopy, field, { dx: 0, dy: 0})) {
            playerCopy.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1: -1));
            if (Math.abs(offset) > playerCopy.tetromino[0].length) {
                rotate(playerCopy.tetromino, -1);
                playerCopy.pos.x = player_x;
                return;
            }
        }

        setPlayer(playerCopy);
    };

    const updatePlayerPos = ({ dx, dy, landed }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x + dx), y: (prev.pos.y + dy) },
            landed,
        }));
    };

    const resetPlayer = useCallback((field) => {
        // generate randon tetromino
        let shape = randomTetromino().shape;
        let jot = 'JOT';
        //console.log(`Generated type: ${shape[0][1]}`);
    
        const newPlayer = {
            pos: { x: COLNUM / 2 - (jot.indexOf(shape[0][1]) !== -1 ? 1 : 2), y: 3 },
            tetromino: shape,
            landed: false,
        }

        if (checkCollision(newPlayer, field, { dx: 0, dy: 0 })) {
            //console.log("Next tetramino collide with the prevous! ", newPlayer);
            const size = newPlayer.tetromino.length;
            const cuttedField = Array(size).fill().map(() => Array(size).fill(0));
            for (let i = newPlayer.pos.y; i < newPlayer.pos.y + size; i++) { // 4 top rows && 3-7 cols
                cuttedField[i - newPlayer.pos.y] = field[i].slice(newPlayer.pos.x, newPlayer.pos.x + size)
            }
            //console.log("cutted field: ", cuttedField, "size: ", size)

            const intersection = Array(size).fill().map(() => Array(size).fill(0));
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++){ // find intersection to find height on which tetromino should be raised
                    if(newPlayer.tetromino[i][j] !== 0 && cuttedField[i][j][0] !== 0){
                        intersection[i][j] = 1;
                    }
                }
            }
            //console.log("intersection: ", intersection);

            let rownums = Array(size).fill(size);
            const cols = intersection.map((_, row_n) => intersection.map(col => col[row_n]));
            if (newPlayer.tetromino[0][1] === 'S' || newPlayer.tetromino[0][1] === 'Z') { // contain empty row in tetromino shape
                for (let i = 0; i < size; i++) {
                    rownums[i] = cols[i].filter(val => val === 1).length
                }
            } else {
                rownums = cols.map(row => (row.indexOf(1) !== -1) ? size - row.indexOf(1) : 0);
            }
            //console.log("COLUMNS: ", cols)

            const height = Math.max.apply(null, rownums);
            //console.log("raise tetramino on height: ", height);
            const new_y = newPlayer.pos.y - height > 0 ? newPlayer.pos.y - height : 0;
            newPlayer.pos.y = new_y;
        }
        //console.log("SETTING NEW PLAYER")
        setPlayer(newPlayer);        
    }, [])
    
    return [player, resetPlayer, updatePlayerPos, rotatePlayer];
};