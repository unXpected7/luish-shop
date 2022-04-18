
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Category = () => {

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [trigger , setTrigger] = useState(false);
  const config = {
    headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}
  }
  const index = () => {
    axios.get('/api/categories'  ).then(res => setData(res.data)).catch(err => console.log(err))
    console.log(data)
  }
  useEffect (() => {
    index();
  }, [trigger])

  const handleSubmit = async () => {
    const body = {name}
   await axios.post('/api/categories', body , config).then(e => console.log(e)).catch(err => console.log(err.message))
    setTrigger(!trigger);
  }

  const handleDelete = (_id, e) => {
    e.preventDefault();
    axios.delete(`/api/categories/${_id}`, config).then(res => console.log(res))
    setTrigger(!trigger);
  }


  return (
    <div style={{
        display: 'flex',
        
        
    }}>
      <h2 style={{marginLeft: '30px' , marginTop : '30px' }}>Welcome Admin</h2>
      
      <Wrapper>
      
      
        <FormWrap>
        <Title>Masukan Kategori</Title>
        <Labels>Kategori :  </Labels>
        <Input placeholder='Masukan Kategori Baru' onChange={e => setName(e.target.value)}  ></Input>
        <Buttons onClick={handleSubmit}>SUBMIT</Buttons>
        <Title>Daftar Kategori</Title>
        
        </FormWrap>
        
       {
         data.map(product=> 
          <FormWrap>
          <Labels>Kategori : {product.name}  </Labels>
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: #fff;
    color: #636363;
}
`
export default Category;
