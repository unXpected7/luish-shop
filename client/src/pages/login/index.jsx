import {React, useState} from 'react';
import styled from 'styled-components';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async () => {
    
    const body = {email, password};
    await axios.post('/auth/login' , body).then(res => {window.alert(res.data.message); if(res.data.message === 'Login Succesfully'){localStorage.setItem('token', res.data.token);}})
    .catch(err => {window.alert(err.data.message);})
    navigate('/');
    window.location.reload();
    
    
   }

   const showHidePassword = () => {
    const type = document.getElementById('password').type;
    if(type === 'password'){
      document.getElementById('password').type = 'text';
    } else {
      document.getElementById('password').type = 'password';
    }
  }


  return (
    <div className="App">
      <CardWrapper>
        <CardHeader>
          <CardHeading>Sign in</CardHeading>
        </CardHeader>

        <CardBody>

          <CardFieldset>
            <CardInput placeholder="E-mail" type="text" required onChange={e => setEmail(e.target.value)}/>
          </CardFieldset>

          <CardFieldset>
            <CardInput placeholder="Password" type="password"  id='password' required onChange={e => setPassword(e.target.value)}/>
            <CardIcon className="fa fa-eye" eye small onClick={showHidePassword} />
          </CardFieldset>

          <CardFieldset>
            <CardButton type="button" onClick={handleSubmit}>  Sign In   </CardButton>
          </CardFieldset>

          <CardFieldset>
            <CardLink to="/register">Didn't have Account ? Register here</CardLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
};

export default Login;


const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 300px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
`;

export const CardHeader = styled.header`
  padding-top: 32px;
  padding-bottom: 32px;
`;

export const CardHeading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const CardBody = styled.div`
  padding-right: 32px;
  padding-left: 32px;
`;

export const CardFieldset = styled.fieldset`
  position: relative;
  padding: 0;
  margin: 0;
  border: 0;

  & + & {
    margin-top: 24px;
  }

  &:nth-last-of-type(2) {
    margin-top: 32px;
  }

  &:last-of-type {
    text-align: center;
  }
`;

export const CardInput = styled.input`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;

  &:focus {
    border-bottom-color: #000;
    outline: 0;
  }
`;

export const CardIcon = styled.span`
  color: #666;
  cursor: pointer;
  opacity: .25;
  transition: opacity .25s ease-in;

  &:hover {
    opacity: .95;
  }


`;

 

 const CardButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 0;
  font-family: inherit;
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
`;

 const CardLink = styled(Link)`
  display: inline-block;
  font-size: 12px;
  text-decoration: none;
  color: #aaa;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: color 0.25s ease-in;

  &:hover {
    color: #777;
  }
`;
