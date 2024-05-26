import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Book App</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/booklist" className="nav-link">
            Booklist
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
