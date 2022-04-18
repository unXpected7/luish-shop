
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Product = () => {

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice]= useState('');
  const [description, setDescription]= useState('');
  const [tag, setTag]= useState('');
  const [trigger, setTrigger]= useState(false);
  const [category, setCategory]= useState('');
  const [image, setImage]= useState('');
 


  
  const config = {
    headers: {
        Authorization : 'Bearer ' + localStorage.getItem('token'),
} }
  const index = () => {
    axios.get('/api/products'  ).then(res => setData(res.data.data)).catch(err => console.log(err))
    console.log(data)
  }
  useEffect (() => {
    index();
  }, [trigger])

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('tag[]', tag);
    formData.append('category', category);
    if(name === '' || price === '' || description === '' ){
      alert('Nama Produk, Harga, dan Deskripsi tidak boleh kosong')
    } else {
      
    axios.post('/api/products', formData , config).then(e => window.alert(e.response)).catch(err => window.alert(err.response.name))
    
    setTrigger(!trigger);
    }
  }

  const handleDelete = async (_id, e) => {
    e.preventDefault();
    await axios.delete(`/api/products/${_id}`, config).then(res => console.log(res)).then(() => window.alert('Product Deleted')).catch(err => console.log(err))
    setTrigger(!trigger);
  }

  
  // upload image in react

 
  return (
    <div style={{
        display: 'flex',
        
        
    }}>
      <h2 style={{marginLeft: '30px' , marginTop : '30px' }}>Welcome Admin</h2>
      
      <Wrapper>
      
      
        <FormWrap>
        <Title>Masukan Product</Title>
        <Labels>Nama :  </Labels>
        <Input placeholder='Masukan Nama Produk' onChange={e => setName(e.target.value)}  ></Input>
        <Labels>Harga :  </Labels>
        <Input placeholder='Masukan Harga Produk' type='number' onChange={e => setPrice(e.target.value)} ></Input>
        <Labels>Deskripsi :  </Labels>
        <Input placeholder='Masukan Deskripsi Produk' onChange={e => setDescription(e.target.value)}></Input>
        <Labels>Tag :  </Labels>
        <Input placeholder='Masukan Tag (Jika ada)' onChange={e => setTag(e.target.value)}></Input>
        <Labels>Kategori :  </Labels>
        <Input placeholder='Masukan Kategori' onChange={e => setCategory(e.target.value)}></Input>
        <Labels>Gambar :  </Labels>
        <Input  type='file' name='image' onChange={e =>  setImage(e.target.files[0])} ></Input>
        <Buttons onClick={handleSubmit}>SUBMIT</Buttons>
        <Title>Daftar Product</Title>
        </FormWrap>
        
       {
         data.map(product=> 
          
          <FormWrap>
          <Labels>Nama : {product.name}  </Labels>
          
          <Labels>Harga :  {product.price}</Labels>
         
          <Labels>Deskripsi : {product.description} </Labels>
         
         
          
          <Buttons onClick={(e) => handleDelete(product._id , e)} >  <i className="fa fa-fw fa-trash" style={{textDecoration: 'none' , color: 'black' }}> </i>  </Buttons>
          </FormWrap>
          
          )
       }
        
      </Wrapper>
      </div>
  );
};

const Wrapper = styled.div`
display: inline-block;
 align-items:center;
 margin: auto;
 width: 80%;
 padding: 20px;
 box-sizing: border-box;
 justify-content:center;

`

const FormWrap = styled.div`
display: grid;
 align-items:center;
 margin: auto;
 width: 80%;
 box-sizing: border-box;
 box-shadow: black;
 padding: 10px;
 
`
const Title = styled.h3`

display: block;
margin-top: 10px;
margin-bottom: 10px;
`

const Labels =  styled.label`
margin-top: 20px;
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


margin-right:10px;
margin-top: 10px;
font-size: 15px;

&:hover{
    
    background: #fff;
    color: #636363;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
`
export default Product;
