export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";

export const ROWNUM = 20;
export const COLNUM = 10;
export const EXTRA_ROWNUM = 3;

export const NORMAL_DROP = 800; // 0.8 second
export const FAST_DROP = 25; // 0.025 second

export const TETROMINOS = {
    0: { shape: [[0]], color: '25, 0, 51'},
    I: {
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        color: '80, 227, 230',
    },
    J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0]
        ],
        color: '35, 95, 223',
    },
    L: {
        shape: [
            [0, 'L', 0], 
            [0, 'L', 0], 
            [0, 'L', 'L']
        ],
        color: '255, 176, 46',
      },
    O: {
        shape: [
            ['O', 'O'], 
            ['O', 'O']
        ], 
        color: '223, 217, 36' 
    },
    S: { 
        shape: [
            [0, 'S', 'S'], 
            ['S', 'S', 0], 
            [0, 0, 0]
        ], 
        color: '48, 211, 56' 
    },
    T: {
        shape: [
            [0, 'T', 0],
            ['T', 'T', 0], 
            [0, 'T', 0]
        ],
        color: '132, 61, 198',
      },
    Z: { 
        shape: [
            ['Z', 'Z', 0], 
            [0, 'Z', 'Z'], 
            [0, 0, 0]
        ], 
        color: '227, 78, 78'
    },
};

export const randomTetromino = () => {
    const tetrominoLib = 'IJLOSTZ';
    const randInd = tetrominoLib[Math.floor(Math.random() * tetrominoLib.length)];
    return TETROMINOS[randInd];
}