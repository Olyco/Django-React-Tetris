import { useState, useEffect } from "react";
import api from "../api";
import '../styles/Leaderboard.css'

const Leaderboard = () => {
    const [records, setRecords] = useState([]);

    const getLeaderboard = () => {
        api
            .get("api/leaderboard/")
            .then((response) => response.data)
            .then((data) => setRecords(data))
            .catch((error) => {
                alert(error.response.statusText);
            })
    };

    useEffect(() => {
        getLeaderboard();
    }, []);

    return (
        <div>
            <h1 className="Title">LEADERBOARD</h1>
            <div className="Wrapper">
                <table className="Table">
                    <thead>
                        <tr><th>№</th><th>Player</th><th>Score</th></tr>
                    </thead>
                    <tbody>
                    {(records) ? (records.map((record, ind) => <tr key={ind}><td>{ind + 1}</td><td>{record["player"]}</td><td>{record["score"]}</td></tr>)) : (<p>loading...</p>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Leaderboard;