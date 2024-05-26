import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import {
  faGear,
  faMagnifyingGlass,
  faMapSigns,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Layout/Header";

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="landing-page">
      <Header />
      <section
        className="hero"
        style={{ backgroundPositionY: `${scrollY * 0.5}px` }}
      >
        <div className="container">
          <h2>Discover Your Next Great Read</h2>
          <p>
            Explore, manage, and enjoy your book collection like never before.
          </p>
          <Link to="/booklist" className="btn primary">
            Get Started
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h3>Why Choose BookApp?</h3>
          <div className="feature-list">
            <div className="feature-item">
              <FontAwesomeIcon icon={faGear} size="4x" />
              <h4>Manage Your Library</h4>
              <p>Organize your books with ease.</p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faMapSigns} size="4x" />
              <h4>Track Favorites</h4>
              <p>Keep a list of your favorite books.</p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="4x" />
              <h4>Discover New Reads</h4>
              <p>Find books recommended just for you.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 BookApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
