import { memo } from "react";
import Display from "./Display";
import '../styles/Sidebar.css';


const Sidebar = ( {gameOver, handleRestart, username, rows, score, record }) => (
    <div className="Sidebar">
        <div className="GameoverWrap">{ gameOver && <nobr><div className="Gameover">GAME OVER</div></nobr> }</div>
        <button className="RestartButton" tabIndex="1" onClick={handleRestart}>
            Restart
        </button>
        <div className="DisplayContainer">
            <Display name="Player" text={username}/>
            <Display name="Lines" text={rows}/>
            <Display name="Score" text={score}/>
            <Display name="My record" text={record}/>
        </div>
        <div className="Help">
            <nobr>KEYBOARD HELP</nobr>
            <ul>
                <li>Up Arrow - rotate figure</li>
                <li>Down Arrow - speed up drop</li>
                <li>Space - instant drop</li>
                <li>Enter - restart game</li>
                <li>P - pause</li>
                <li>After clicking on restart click anywhere outside the button!</li>
            </ul>
        </div>
    </div>
);

export default memo(Sidebar);