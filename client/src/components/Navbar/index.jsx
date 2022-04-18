import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink as Link  } from 'react-router-dom';
import {FaBars} from 'react-icons/fa'
import { Badge} from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import './index.css';

const Navigation = ( props) => {
    const [keyword , setKeyword] = useState ('');
    const [data , setData] = useState ([]);
    const token = localStorage.getItem('token');
    let buttons;
    
    const config = {
        headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}
      }
    const handleLogOut = async () => {
        
        const token = localStorage.getItem('token');
        
        await axios.post('/auth/logout' , token , config).then(res => {console.log(res.data);})
        localStorage.clear()
        window.alert('You have been logged out');
        window.location.reload();
        
    }
    
  
   
    // update page when cart is updated
   
    // update page when windows click
    useEffect(() => {
        axios.get('/api/carts' , config).then(response => {
            setData(response.data);})

    }, [props.klik]);

    const handleToggle = () => {
        const nav = document.querySelector('.nav-menu');
        nav.classList.toggle('active');
        
    }
   
    window.addEventListener('scroll', (e) => {
        const nav = document.querySelector('.nav-menu');
        nav.classList.remove('active');
    })

    
    
    if(token){
       
        buttons = (
            <NavBtn onClick={handleLogOut} class="menu-item dropdown">
             <NavBtnLink to="/">Log Out</NavBtnLink>
             </NavBtn>
               )
    } else {
        buttons= (
            <NavBtn class="menu-item dropdown">
      <NavBtnLink to="/login">Sign In</NavBtnLink>
      </NavBtn>
        )
    }
  return (
    <>
    <Nav id="navbar" >
      <Navlink to="/">
          <Image src={require('../../logo512.png')}/>
      </Navlink>
      <Bars onClick={handleToggle}/>
      <nav className="nav-menu">
            <Input placeholder='Search Here..' onChange={e => setKeyword(e.target.value)}/> 
          <Button onClick={() => props.childToParent(keyword)}>Search </Button>
          <Navlink to="/about" class="menu-item dropdown" >
              About
          </Navlink>
          <Navlink to="/profile" class="menu-item dropdown" >
              Profile
          </Navlink>
          <Navlink to="/cart" class="menu-item dropdown" >
          <i className="fa fa-fw fa-shopping-cart" style={{marginRight:'8px', fontSize:'20px'}}></i>
          <Badge> {data.length} </Badge>
          </Navlink>
         
          {buttons}
      </nav>
      
    </Nav>
    </>

  );
};

export default Navigation;

const Button = styled.button`
border-radius:4px;
background: #C5C5C5;
padding: 10px 22px;
color: #fff;
border:none;
outline:none;
cursor:pointer;
transition: all 0.2 ease-in-out;
margin-left: 5px;
margin-right:10px;

&:hover{
    transition: all 0.2 ease-in-out;
    background: #fff;
    color: #636363;
}

@media screen and (max-width:768px){
    width: 100%;
   
    display:block;
    margin-top: 10px;

    &:hover{
        transition: all 0.2 ease-in-out;
    background: #fff;
    color: #636363;
    }
 }

`
const Image = styled.img`
height: 60px;
`

const Input = styled.input`
height: 40px;
width: 200px;
margin-left: 10px;
border-radius: 8px;
padding: 5px;

@media screen and (max-width:768px){
    width: 100%;
    display:block;
    margin: 0 auto;
}


`
const Nav = styled.nav`
  background: #dcdcdc;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.7rem calc((100vw - 1000px) / 2);
  z-index: 10;
  
  
`
const Navlink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration:none;
padding:0 1rem;
heigt: 100%;
cursor: pointer;



&.action {
    color: #d6d6d6;
    
}

&:hover{
    color: #636363;
    
}

@media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    display:block;
    margin-top: 10px;
    background: #d6d6d6;
    align-items: center;
    
    padding: 0.5rem;

    &:hover{
        transition: all 0.2 ease-in-out;
    background: #fff;
    color: #636363;
    }
  }

`

const Bars = styled(FaBars)`
display:none;
color:#fff;

@media screen and (max-width: 768px){
    display: block;
    position:absolute;
    top:0;
    right:0;
    transform: translate(-100%, 75%);
    font-size: 2rem;
    margin-top: 5px;
    cursor: pointer
}
`



const NavBtn = styled.nav`
display:flex;
align-items:center;
margin-right:5px;

@media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    display:block;
    margin-top: 10px;

    &:hover{
        transition: all 0.2 ease-in-out;
    background: #fff;
    color: #636363;
    }
  }


`
const NavBtnLink = styled(Link)`
border-radius:4px;
background: #C5C5C5;
padding: 10px 22px;
color: #fff;
border:none;
outline:none;
cursor:pointer;
transition: all 0.2 ease-in-out;
text-decoration: none;

&:hover{
    transition: all 0.2 ease-in-out;
    background: #fff;
    color: #636363;
}
@media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    display:block;
  }
`