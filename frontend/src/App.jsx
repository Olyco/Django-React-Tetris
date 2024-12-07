import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from './components/ProtectedRoute';
import Game from "/src/pages/Game";
import Leaderboard from './components/Leaderboard';
import Tetris from './components/Tetris';
import './App.css';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
        element={
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        }
        />
        <Route path="/tetris"
        element={
          <ProtectedRoute>
            <Tetris />
          </ProtectedRoute>
        }
        />
        <Route path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
