
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Tags = () => {

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [trigger , setTrigger] = useState(false);
  const config = {
    headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}
  }
  const index = async () => {
    await axios.get('/api/tags'  ).then(res => setData(res.data)).catch(err => console.log(err))
    
  }
  useEffect (() => {
    index();
  }, [trigger])

  const handleSubmit = async () => {
    const body = {name}
    await axios.post('/api/tags', body , config).then(e => console.log(e)).catch(err => console.log(err.message))
    setTrigger(!trigger);
  }

  const handleDelete = async (_id, e) => {
    e.preventDefault();
    await axios.delete(`/api/tags/${_id}`, config).then(res => console.log(res))
    setTrigger(!trigger);
  }

  const handleDisplay = (_id , e) => {
    
  }

 
  return (
    <div style={{
        display: 'flex',
        
        
    }}>
      <h2 style={{marginLeft: '30px' , marginTop : '30px' }}>Welcome Admin</h2>
      
      <Wrapper>
      
      
        <FormWrap>
        <Title>Masukan Tag</Title>
        <Labels>Tag :  </Labels>
        <Input placeholder='Masukan Tag' onChange={e => setName(e.target.value)}  ></Input>
        <Buttons onClick={handleSubmit}>SUBMIT</Buttons>
        <Title>Daftar Tag</Title>
        </FormWrap>
        
       {
         data.map(product=> 
          <FormWrap>
          <Labels>Tag : {product.name}  </Labels>
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
export default Tags;
