import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { UsersContext } from "../contexts/UsersContext";

const Nav = styled.nav`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 1em 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1em;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.5em;
  margin: 0;
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  margin-left: 1em;

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2em;

    &:hover {
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  margin: 0.5em;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(UsersContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/products");
  };

  return (
    <Nav>
      <LogoContainer>
        <LogoImage src={logo} alt="Cafeteria Gourmet Logo" />
        <Title>Cafeteria Gourmet</Title>
      </LogoContainer>
      <Ul>
        <Li>
          <Link to="/products">Products</Link>
        </Li>
        {isAuthenticated ? (
          <Ul>
            <Li>
              <Link to="/">Home</Link>
            </Li>
            <Li>
              <Link to="/users">Users</Link>
            </Li>
            <Li>
              <Button onClick={handleLogout}>Logout</Button>
            </Li>
          </Ul>
        ) : (
          <Ul>
            <Li>
              <Link to="/register">Register</Link>
            </Li>
            <Li>
              <Link to="/login">Login</Link>
            </Li>
          </Ul>
        )}
      </Ul>
    </Nav>
  );
}

export default Navbar;
