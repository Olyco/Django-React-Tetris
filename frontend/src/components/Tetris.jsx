import { useState } from "react";
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
                updatePlayerPos({ dx: dx, dy: 0 })
            }
        }
    };

    const keyUpProc = (({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(NORMAL_DROP);
            }
        }
    });

    const keyDownProc = ({ keyCode }) => {
        if (!gameOver){
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                rotatePlayer(field);
            } else if (keyCode === 80) {
                if (dropTime) {
                    setDropTime(null);
                } else {
                    setDropTime(NORMAL_DROP);
                }
            } else if (keyCode === 13) {
                handleRestart();
            }else if (keyCode === 32) {
                setDropTime(FAST_DROP);       
            } else {
                ;
            }
        } else if (keyCode === 13) {
            handleRestart();
        } else {
            ;
        }
    };

    useInterval(() => {
        drop();
    }, dropTime);

    return(
        (!running) ? (setRunning(true), resetPlayer(field), getMyData(), console.log("RESETTING")) : (
            <div className="Tetris">
                <input className="Controller" tabIndex="1" onKeyDown={e => keyDownProc(e)} onKeyUp={keyUpProc} autoFocus/>
                <Field field={field} />
                <Sidebar gameOver={gameOver} handleRestart={handleRestart} username={username} rows={rows} score={score} record={record} />
            </div>
        )
    )
};

export default Tetris;