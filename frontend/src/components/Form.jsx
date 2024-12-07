import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"

const Form = ({ route, method }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        api.post(route, {username, password}).then((response) => {
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        }).catch((error) => {
            console.log("response: ", error.response)
            const data = error.response.data;
            let message = '';
            if (error.response.status === 400) {
                Object.keys(data).forEach((key) => {
                    console.log(`${key}:  ${data[key][0]}`);
                    message += `${key}:  ${data[key][0]}\n`;
                });
                alert(message);
            } else if (error.response.status === 401) {
                Object.keys(data).forEach((key) => {
                    console.log(`${key}:  ${data[key]}`);
                    message += `${key}:  ${data[key]}\n`;
                });
                alert(message);
            } else {
                alert(error);
            }
        })
    };

    const formName = (method === "login") ? "Login" : "Register";

    return(
        <form onSubmit={handleSubmit} className="Form">
            <h1>{formName}</h1>
            <input
                className="Form-input"
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="Form-input"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="Form-button" type="submit">{formName}</button>
        </form>
    )
};

export default Form;