
import { Nav } from "react-bootstrap";

function Navbar() {

  return (
    <div>
      <Nav className="me-auto my-2 my-lg-0 px-5 py-2 bg-navbar" navbarScroll>
        <Nav.Link href="/" className="enlace">
          Home
        </Nav.Link>
        <Nav.Link href="/new" className="enlace">
          Create
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Navbar;
