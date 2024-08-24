import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import EditPage from "./pages/EditPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit" element={<EditPage />} />
      </Route>
    </Routes>
  );
}

export default App;
