import { useNavigate } from "react-router-dom";
import "../styles/Game.css";

const Game = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/tetris");
  }

  const handleLeaderboard = () => {
    navigate("/leaderboard");
  };

  const handleLogOut = () => {
    navigate("/logout");
  };

  return (
    <div className="Menu">
      <div className="MenuTitle">Tetris</div>
      <div className="ButtonCol">
          <button className="Button" onClick={handlePlay}>
              Play
          </button>
          <button className="Button" onClick={handleLeaderboard}>
              Leaderboard
          </button>
          <button className="Button" onClick={handleLogOut}>
              Log out
          </button>
      </div>
    </div>
  );
};

export default Game;