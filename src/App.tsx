import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import EditPage from "./pages/EditPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "../src/assets/App.scss"
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import SuggestionsPage from "./pages/SuggestionsPage";
import useAuth from "./hooks/useAuth";


function App() {

  const { currentUser } = useAuth()

  useEffect(() => {
    console.log("CurrentUser: ", currentUser)
  }, [currentUser])
  return (
    <Container>
      {currentUser !== null && <NavBar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/suggestions" element={<SuggestionsPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit" element={<EditPage />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
