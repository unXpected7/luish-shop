import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Admin = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
    }}>
        <Title>Admin Page</Title>
        <Button> <BtnLink to='product'>Product</BtnLink></Button>
        <Button> <BtnLink to='tags'>Tag</BtnLink></Button>
        <Button> <BtnLink to='category'>Kategori</BtnLink></Button>
    </div>
  );
};

const Title = styled.div`
display: inline;
font-size: 30px;
margin: 50px;
`
const BtnLink = styled(Link)`
text-decoration: none;
font-size: 14px;
color: #fff;

display: block;
width:100%;
height: 100%;

`
const Button = styled.button`
display: block;
  width: 20%;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: #C5C5C5;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`
export default Admin;