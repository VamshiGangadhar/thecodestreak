import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/pages/Home";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";
import DailyChallenge from "./components/pages/DailyChallenge";
import PracticePage from "./components/pages/practice";
import SolveChallenge from "./components/pages/DailyChallenge/SolveChallenge";

function App() {
  return (
    <UserProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dailyChallenge"
            element={
              <ProtectedRoute>
                <DailyChallenge />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dailyChallenge/solve/:id"
            element={
              <ProtectedRoute>
                <SolveChallenge />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <PracticePage />
              </ProtectedRoute>
            }
          />

          {/* <Route path="/dashboard/profile" element={<ChooseLevel />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
