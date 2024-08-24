import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../assets/NavBar.scss"

function NavBar() {
    return (
        <Navbar expand="md" className="bg-body-tertiary" id="custom-navbar" style={{ backgroundColor: '#7ae835' }}>
            <Container>
                <Navbar.Brand href="/" id="navHead">Food Hunters AB 🍕</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/suggestions">Suggest a new restaurant for us!</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;