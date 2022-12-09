import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Cookies from "js-cookie";

const token = Cookies.get("auth");
const logout = () => {
  Cookies.remove("auth");
  window.location.href = "/login";
};

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
      <Container>
        <Navbar.Brand href="/">WeTchat</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {token ? (
            <Nav>
              <Nav.Link href="/mes-tchats">Mes tchats</Nav.Link>
              <Nav.Link onClick={logout} eventKey={2} href="#memes">
                Déconnexion{" "}
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/register">Inscription</Nav.Link>
              <Nav.Link eventKey={2} href="/login">
                Connexion{" "}
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
