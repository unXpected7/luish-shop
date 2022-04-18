import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Order = (props) => {
    const [address, setAddress] = useState([]);
    const [loading , setLoading] = useState(false);
    const [selectedAdress , setSelectedAdress] = useState({});
    let token = localStorage.getItem('token');
    const delivery_fee = 20000;
    const config = {
        headers: {Authorization: 'Bearer ' + token}
    }
    const getAddress = async () => {
      await axios.get('/api/delivery-addresses', config).then(res => { 
            setAddress(res.data.data);
            setLoading(true);
        });  
    }

   
    
    useEffect(() => {
        getAddress();
    }, []);

    // get total price from cart
   

    
    const handleOrder = async () => {
        await axios.post('/api/orders', {
            delivery_address: selectedAdress,
            delivery_fee
        }, config).then(res => {
            console.log(res.data);
        });
        
    }
     
    
    
    const addresses = (
       address.map(item => 
        <Radio> <input type='radio' name='radio' onClick={e => setSelectedAdress(item)}/> <strong>{item.detail}</strong> ( {item.nama}, {item.kelurahan}, {item.kecamatan} , {item.kabupaten} , {item.provinsi} )  </Radio>
        )
    )

    const loader = (
        <Loader></Loader>
    )
  return (
    <div style={{display : 'block' }}>
        <Header>
            <h3 style={{justifyContent: 'center'}}>Select Address</h3>
        </Header>

        <Form>
            
            
            {loading ? addresses : loader}
            <Button to='/' onClick={handleOrder}>Checkout</Button>

            
            
        </Form>
       
    </div>
  )
}


export default Order;

const Header = styled.div`
    display: block;
    justify-content: center;
    padding: 20px;
    width: 100%;
    
`;

const Form = styled.div`
    display: block;
    justify-content: center;
    padding: 20px;
   
    
`;

const Radio = styled.div`
    display: block;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    align-items: center;
`;

const Button = styled(Link)`
    border-radius:4px;
    background: #C5C5C5;
    padding: 10px 22px;
    color: white;
    border:none;
    outline:none;
    cursor:pointer;
    transition: all 0.2 ease-in-out;
    margin-left: 5px;
    margin-right:10px;
    display: block;
    justify-content: center;
    margin-top: 20px;
    width: 30%;
    text-decoration: none;

    &:hover{
        transition: all 0.2 ease-in-out;
        background: #fff;
        color: #636363;
        box-shadow: 0px 0px 10px #ccc;
    }

    @media screen and (max-width:768px){
        width: 100%;
        
    }
`;

const Loader = styled.div`
border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid rgb(58, 58, 60);
      border-bottom: 16px solid rgb(58, 58, 60);
      width: 30px;
      height: 30px;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
    }
    
    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

`