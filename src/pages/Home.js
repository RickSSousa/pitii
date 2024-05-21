import React from "react";
import styled from "styled-components";
import heroImage from "../assets/hero-image.jpg";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";

const Container = styled.div`
  text-align: center;
  padding: 2em;
`;

const HeroSection = styled.section`
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  height: 400px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const HeroText = styled.h1`
  font-size: 3em;
  font-weight: bold;
`;

const ProductsSection = styled.section`
  padding: 2em 0;
`;

const ProductList = styled.div`
  display: flex;
  justify-content: center;
  gap: 2em;
`;

const Product = styled.div`
  max-width: 300px;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const ProductName = styled.h3`
  margin: 0.5em 0;
`;

const Home = () => {
  return (
    <Container>
      <HeroSection>
        <HeroText>Bem vindo a Cafeteria Gourmet</HeroText>
      </HeroSection>
      <ProductsSection>
        <h2>Nossos Produtos</h2>
        <ProductList>
          <Product>
            <ProductImage src={product1} alt="Product 1" />
            <ProductName>Deliciosos Bolos</ProductName>
          </Product>
          <Product>
            <ProductImage src={product2} alt="Product 2" />
            <ProductName>Doces Cupcakes</ProductName>
          </Product>
          <Product>
            <ProductImage src={product3} alt="Product 3" />
            <ProductName>Deliciosos Cookies</ProductName>
          </Product>
        </ProductList>
      </ProductsSection>
    </Container>
  );
};

export default Home;
