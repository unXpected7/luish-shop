
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {ExpandMore} from '@material-ui/icons';
const Profile = (props) => {
  const [nama, setNama] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kabupaten, setKabupaten]  = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan]  = useState('');
  const [detail, setDetail]  = useState('');
  const [order, setOrder] = useState([]);
  const [data, setData] = useState([]);
  const [klik , setKlik] = useState(false);
  const [page, setPage] = useState(true);
  const token = localStorage.getItem('token');
  const config = {
    headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}
  }
  const index = async () => {
   await axios.get('/api/delivery-addresses' , config ).then(res => setData(res.data.data))
  }

  const getOrder = async () => {
    await axios.get('/api/orders' , config ).then(res => setOrder(res.data.data))
  }

  useEffect (() => {
    index();
  }, [klik])

  useEffect (() => {
    getOrder();
  }, [])

  const trigger = () => { 
    if(klik === false){
      setKlik(true);
    } else {
      setKlik(false);
    }
  
  }

  const handleClear = () => {
    document.querySelector('.input-jalan').value = '';
    document.querySelector('.input-provinsi').value = '';
    document.querySelector('.input-kota').value = '';
    document.querySelector('.input-kecamatan').value = '';
    document.querySelector('.input-kelurahan').value = '';
    document.querySelector('.input-detail').value = '';

  }

  
  const handleSubmit = async () => {
    if (detail === '' || kelurahan === '' || kecamatan === '' || kabupaten === '' || provinsi === '' || nama === '') {
      alert('Must Insert all Input')
    } else {
      const body = { nama, provinsi, kabupaten, kecamatan, kelurahan, detail};
      await axios.post('/api/delivery-addresses' , body , config).then(e => console.log(e))
      trigger();
      handleClear();
    }
    }

  const handleDelete = (_id, e) => {
    e.preventDefault();
    axios.delete(`/api/delivery-addresses/${_id}`, config).then(res => console.log(res))
    trigger();
  }
 
  console.log(props.user.full_name);

  if(props.user.full_name){
  let address = (
   
      
    <Wrapper>
    
    
      <FormWrap>
      <Title>Tambahkan Alamat</Title>
      <Labels>Jalan :  </Labels>
      <Input placeholder='Masukan Nama Jalan.' className=' input-jalan' onChange={e => setNama(e.target.value)}></Input>
      <Labels>Provinsi :  </Labels>
      <Input placeholder='Masukan Provinsi.' className=' input-provinsi' onChange={e => setProvinsi(e.target.value)}></Input>
      <Labels>Kabupaten/Kota :  </Labels>
      <Input placeholder='Masukan Kabupaten / Kota.' className='input input-kota' onChange={e => setKabupaten(e.target.value)}></Input>
      <Labels>Kecamatan :  </Labels>
      <Input placeholder='Masukan Kecamatan.' className='input-kecamatan' onChange={e => setKecamatan(e.target.value)}></Input>
      <Labels>Kelurahan :  </Labels>
      <Input placeholder='Masukan Kelurahan.' className='input-kelurahan' onChange={e => setKelurahan(e.target.value)}></Input>
      <Labels>Detail :  </Labels>
      <Input placeholder='Masukan Detail.' className='input-detail' onChange={e => setDetail(e.target.value)}></Input>
      <Buttons onClick={handleSubmit}>SUBMIT</Buttons>
      <Title>Alamat Anda</Title>
      </FormWrap>
      
     {
       data.map(alamat => 
        <AddressContainer>
        
        <Labels> <strong>{alamat.detail} </strong> , {alamat.nama} , {alamat.kelurahan}, {alamat.kecamatan}, {alamat.kabupaten},{alamat.kabupaten}, {alamat.provinsi} </Labels>
         
        <Buttons onClick={(e) => handleDelete(alamat._id , e)} >  <i className="fa fa-fw fa-trash" style={{textDecoration: 'none' , color: 'black' , }}> </i>  </Buttons>
        </AddressContainer>
        )
     }
      
    </Wrapper>
    
  )

  let invoice = (
    <Wrapper>
     <Title>Daftar Pesanan</Title>
    
    
   
    
        
     <Table >
  <tr>
    <Col> </Col>
    <Col>Order Id</Col>
    <Col>Total </Col>
    <Col>Status</Col>
    <Col>Invoice</Col>
  </tr>
  
  {
    order.map(order =>
      <>
     
      <tr  >
    <Row > </Row>
    <Row>#{order.order_number}</Row>
    <Row>
     {
        // get total + shipping
        order.order_items.map(detail => detail.price * detail.qty ).reduce((a, b) => a + b, 0) + order.delivery_fee
     } 
    </Row>
    <Row>{order.status}</Row>
    <Row><ButtonsInvoice to={`/invoice/${order.id}`}>Invoice</ButtonsInvoice></Row>
    </tr> 

     
     <h4 style={{alignItems : 'center' , justifyContent: 'center'}}>Details</h4>
    
    <tr  >
    <Col></Col>
    <Col>Product</Col>
    <Col>Quantity</Col>
    <Col>Total</Col>
    
     <Col></Col>
     
  </tr>

     {
        order.order_items.map(detail =>
          <tr>
            <Row></Row>
            <Row>{detail.name}</Row>
            <Row> {detail.qty} </Row>
            <Row>{detail.price * detail.qty}</Row>
            
            <Row></Row>
          </tr> 
          
    )}
   
  <br /> <br />
  </>
  

  )}
    
  
  </Table>
        
 
    </Wrapper>
   
  )

  
    return(
      <div style={{
        display: 'flex',    
    }}>
     
     <Navwrapper>
    <Navigation onClick={() => setPage(true)}>Alamat</Navigation>
    <Navigation onClick={() => setPage(false)}>Pesanan</Navigation>
    </Navwrapper>   
    
    {page? address : invoice} 
    </div>

     

    )
  }
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
    }}>
        <h1 >Please Login to access Profile</h1>
    </div>
  );

 
};

const Table = styled.table`
border-collapse: collapse;
width: 100%;
justify-content: space-between;
`
const Row = styled.td`
border-bottom: 1px solid #ddd;

  text-align: left;
  padding: 8px;
`
const Col = styled.th`
border-bottom: 2px solid #ddd;

  text-align: left;
  padding: 8px;
`

const Wrapper = styled.div`
display: inline-block;
 align-items:center;
 margin: auto;
 width: 80%;
 padding: 20px;
 box-sizing: border-box;
 justify-content:center;

 @media (max-width: 768px) {
  width: 100%;
 }
`

const Navwrapper = styled.div`
width: 30%;
display: inline-block;
height: 15rem;
margin: auto;
margin-left: 2rem;
margin-top: 50px;
margin-bottom: 50px;
padding: 10px;
box-sizing: border-box;
justify-content:center;

@media (max-width: 768px) {
  width: 100%;
 }


`
const AddressContainer = styled.div`
display: flex;
 align-items:center;
 margin: auto; 
 width: 70%;
 box-sizing: border-box;
 box-shadow: black;
 padding: 10px;
 border-radius: 10px;

`
const FormWrap = styled.div`
right: -150%;
display: grid;
 align-items:center;
 margin: auto;
 width: 80%;
 box-sizing: border-box;
 box-shadow: black;
 padding: 10px;

 @media (max-width: 768px) {
  width: 100%;
 }
 
`
const Title = styled.h3`

display: block;
margin-top: 10px;
margin-bottom: 10px;
`

const Labels =  styled.label`
margin-top: 0px;
`

const Input = styled.input`
padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;
  display: block;
  &:focus {
    border-bottom-color: #000;
    outline: 0;
  }
`

const Buttons = styled.button`
border-radius:4px;
background: #C5C5C5;
padding: 10px 22px;
color: #fff;
border:none;
outline:none;
cursor:pointer;
text-decoration:none;


margin-right:10px;
margin-top: 10px;
font-size: 15px;

&:hover{
    background: #fff;
    color: #636363;
    box-shadow: 0 0 4px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.24);
}

@media (max-width: 768px) {
  width: 100%;
}

`

const ButtonsInvoice = styled(Link)`
border-radius:4px;
background: #C5C5C5;
padding: 10px 22px;
color: #fff;
border:none;
outline:none;
cursor:pointer;
text-decoration:none;


margin-right:10px;
margin-top: 10px;
font-size: 15px;

&:hover{
    background: #fff;
    color: #636363;
    box-shadow: 0 0 4px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.24);
}

@media (max-width: 768px) {
  width: 100%;
}

`

const Navigation = styled.button`
border-radius:4px;
background: #C5C5C5;
padding: 10px 22px;
color: #fff;
border:none;
outline:none;
cursor:pointer;
display: block;
width: 100%;
margin-top: 10px;

&:hover{
  background: #fff;
    color: #636363;
    box-shadow: 0 0 4px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.24);
}

`
export default Profile;
