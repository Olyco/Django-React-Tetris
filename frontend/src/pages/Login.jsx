import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

function Login() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div>
            <Form route="/api/token/" method="login" />
            <h1>or</h1>
            <button className="orButton" onClick={handleRegister}>Register</button>
        </div>
    )
}

export default Login;