import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Button } from "react-bootstrap";
import "../assets/LogoutButton.scss";

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const tapOut = () => {
    logout();
    navigate("/");
  };

  return (
    <Container className="logout-container">
      <p>Wanna get out of here?</p>
      <Button onClick={tapOut} className="button-center">
        Log Out
      </Button>
    </Container>
  );
};

export default LogoutPage;
