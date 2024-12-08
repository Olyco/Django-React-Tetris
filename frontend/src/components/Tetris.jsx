import { useEffect, useState } from "react";
import { createField } from "./Field";
import Field from "./Field";
import Sidebar from "./Sidebar";
import api from "../api";
import { useInterval } from "../hooks/useInterval";
import { useGameState } from "../hooks/useGameState";
import { usePlayer, checkCollision } from "../hooks/usePlayer";
import { useField } from "../hooks/useField";
import { COLNUM, ROWNUM, FAST_DROP, NORMAL_DROP, EXTRA_ROWNUM } from "../constants";
import '../styles/Tetris.css'

const Tetris = () => {
    const [running, setRunning] = useState(false)
    const [gameOver, setGameOver] = useState(false);
    const [dropTime, setDropTime] = useState(NORMAL_DROP);

    const [player, resetPlayer, updatePlayerPos, rotatePlayer] = usePlayer();
    const [field, setField, rowsCleared] = useField(player, resetPlayer, gameOver);
    const [score, setScore, rows, setRows] = useGameState(rowsCleared);

    const [username, setUsername] = useState('');
    const [record, setRecord] = useState(0);

    const handleRestart = () => {
        const emptyField = createField({rowNum: ROWNUM + EXTRA_ROWNUM, colNum: COLNUM});
        patchRecord();
        setGameOver(false);
        setField(emptyField);
        resetPlayer(emptyField);
        setDropTime(NORMAL_DROP);
        setScore(0);
        setRows(0);
    };

    const handleGameOver = () => {
        setGameOver(true);
        setDropTime(null);
        patchRecord();
    }

    const getMyData = () => {
        api
            .get("api/myscore/")
            .then((response) => response.data)
            .then((data) => {setRecord(data["score"]); setUsername(data["player"])})
            .catch((error) => alert(error));
    };

    const patchRecord = () => {
        if (score > record) {
            //console.log("UPDATING RECORD")

            api
            .patch("api/update/", {score: score})
            .then((response) => response.data)
            .then((data) => setRecord(data["score"]))
            .catch((error) => alert(error));
        }
    }

    const drop = () => {
        if (!checkCollision(player, field, { dx: 0, dy: 1 })) {
            updatePlayerPos({ dx: 0, dy: 1, landed: false});
        } else {
            if (player.pos.y < 4) {
                handleGameOver();
            }
            updatePlayerPos({dx: 0, dy: 0, landed: true});
            if (dropTime === FAST_DROP) {
                setDropTime(NORMAL_DROP);
            }
        }
    };

    const dropPlayer = () => {
        if (dropTime === NORMAL_DROP) {
            setDropTime(null);
        }

        drop();
    };

    const movePlayer = ( dx ) => {
        if (dropTime !== FAST_DROP) {
            if (!checkCollision(player, field, { dx: dx, dy: 0 })) {
                updatePlayerPos({ dx: dx, dy: 0, landed: false})
            }
        }
    };

    useInterval(() => {
        drop();
    }, dropTime);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                handleRestart();
            }

            if (!gameOver){
                if (event.key === 'ArrowLeft') {
                    movePlayer(-1);
                } else if (event.key === 'ArrowRight') {
                    movePlayer(1);
                } else if (event.key === 'ArrowDown') {
                    dropPlayer();
                } else if (event.key === 'ArrowUp') {
                    rotatePlayer(field);
                } else if (event.code === 'KeyP') {
                    if (dropTime) {
                        setDropTime(null);
                    } else {
                        setDropTime(NORMAL_DROP);
                    }
                } else if (event.key === ' ') {
                    setDropTime(FAST_DROP);       
                }
            }
        };

        const handleKeyUp = (event) => {
            if (!gameOver) {
                if (event.key === 'ArrowDown') {
                    setDropTime(NORMAL_DROP);
                }
            }
        };

    
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [dropPlayer, dropTime, field, gameOver, handleRestart, movePlayer, rotatePlayer])

    return(
        (!running) ? (setRunning(true), resetPlayer(field), getMyData()) : (
            <div className="Tetris">
                <Field field={field} />
                <Sidebar gameOver={gameOver} handleRestart={handleRestart} username={username} rows={rows} score={score} record={record} />
            </div>
        )
    )
};

export default Tetris;