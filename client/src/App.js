import './App.css'
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './components/Navbar';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import Admin from './pages/admin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './pages/product';
import Tags from './pages/tags';
import Category from './pages/category';
import Carts from './pages/cart';
import Order from './pages/order';
import Invoice from './pages/invoice';

const Body = styled.div`
background-image: url(/logo.svg)
`
function App() {
  const [data, setData] = useState({});
  const [key, setKey] = useState('');
  const [klik, setKlik] = useState(false)
 
  const config = {
    headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}
  }
  const childToParent = (childdata) => {
    setKey(childdata);
  }
  
  useEffect(() => {
    axios.get('/auth/me', config  ).then(res => setData(res.data));
  }, [])

  const childToParents = (childdata) => {
    setKlik(childdata);
  }
  
  const propsCart = (childdata) => {
    setKlik(childdata);
  }
 
  return (
 <div className='body'>
   <Body>
   <Routers>
    <Navigation childToParent={childToParent} klik={klik} />
   <Routes>
     <Route  exact  path="/"element={<Home keyword={key} func={childToParents}/>} />
     <Route path="about" element={<About/>} />
     <Route path="cart" element={<Carts del={propsCart}/>} />
     <Route path="login" element={<Login/>} />
     <Route path="logout" element={<Login/>} />
     <Route path="register" element={<Register/>} />
     <Route path="profile" element={<Profile user={data}/>} />
     <Route path="admin" element={<Admin/>} />
     <Route path="admin/product" element={<Product/>} />
     <Route path="admin/tags" element={<Tags/>} />
     <Route path="order" element={<Order/>}  />
     <Route path="invoice/:order_id" element={<Invoice/>} />
     <Route path="admin/category" element={<Category/>} />
   </Routes>
   </Routers>

 </Body>
 </div>
  );
}

export default App;

        // <img src={logo} className="App-logo" alt="logo" />