import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png"; // Certifique-se de que a nova logo está salva aqui

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

function Navbar() {
  return (
    <Nav>
      <LogoContainer>
        <LogoImage src={logo} alt="Cafeteria Gourmet Logo" />
        <Title>Cafeteria Gourmet</Title>
      </LogoContainer>
      <Ul>
        <Li>
          <Link to="/">Home</Link>
        </Li>
        <Li>
          <Link to="/users">Users</Link>
        </Li>
        <Li>
          <Link to="/products">Products</Link>
        </Li>
      </Ul>
    </Nav>
  );
}

export default Navbar;
