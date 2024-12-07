import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

function ProtectedRoute({ children }) { // children - what will be wrapped
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const response = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            //console.log(error);
            setIsAuthorized(false);
            alert(error);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return
        };

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; // in seconds

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        };
    };

    if (isAuthorized === null) { // waiting checking tokens or its refreshing
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;