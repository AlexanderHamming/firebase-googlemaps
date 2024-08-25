import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Button } from "react-bootstrap";

const LogoutPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const tapOut = () => {
        logout();
        navigate("/");
    }

    return (
        <Container>
            <p>Wanna get out of here?</p>
            <Button onClick={tapOut}>Log Out</Button>
        </Container>
    )
}

export default LogoutPage;