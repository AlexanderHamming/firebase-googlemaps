import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import "../assets/NavBar.scss";

function NavBarAdmin() {

    return (
        <Navbar expand="md" className="bg-body-tertiary" id="custom-navbar">
            <Container>
                <Navbar.Brand href="/" id="navHead">Pizza Hunters AB 🍕</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/suggestions">Suggest a new restaurant for us!</Nav.Link>
                        <NavDropdown title="Admin Paths" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/advice">Users Suggestions</NavDropdown.Item>
                            <NavDropdown.Item href="/logout">Sign out?</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBarAdmin;