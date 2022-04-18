import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Add, Remove , Close} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import axios from 'axios';


const Carts = (props) => {
const [cart, setCart] = useState([]);
const [quantity , setQuantity] = useState(0);
const [total, setTotal] = useState(0);
const [del, setDel] = useState(false);
const [login, setLogin] = useState(false);
const token = localStorage.getItem('token');
const config = {
    headers: {Authorization : 'Bearer ' + token,} 
  }


//update page when cart is updated
useEffect(() => {
    axios.get('/api/carts', config)
    .then(res => {
        setCart(res.data);
    })
    .catch(err => console.log(err));
}, [del]);




// setCart from api cart using axios


// get total price from cart
useEffect(() => {
  if (token) {
  let total = 0;
  cart.forEach(item => {
      total += item.price * item.qty;
  });
  setTotal(total);
}
}, [cart]);

// update cart qty to api 
const updateCart = (_id, qty) => {
    axios.put(`/api/carts/${_id}`, {qty}, config).then(response => {
        setCart(cart.map(item => {
            if(item._id === _id) {
                item.qty = qty;
            } 
            return item;
        }));
    });
}


// handleMinus function
const handleMinus = (_id ,qty ,e) => {
    e.preventDefault();
    const newCart = cart.map(item => {
        if (item._id === _id) {
            if (item.qty > 1) {
                item.qty--;
            }
        }
        return item;
    });
    setCart(newCart);
    updateCart(_id, qty - 1);
};

const handlePlus = (_id , qty, e) => {
    e.preventDefault();
  const newCart = cart.map(item => {
      if (item._id === _id) {
         
              item.qty++;
         
      }
      return item;
  });
  setCart(newCart);
  updateCart(_id, qty + 1);
};

const handleAlert = () => {
  alert('Cart is empty');
}
let createorder;
if (cart.length === 0) {
   createorder = (
    <OrderButton to="/cart" onClick={handleAlert}>CREATE ORDER</OrderButton>
  )
 } else {
   createorder = (
    <OrderButton to='/order'>CREATE ORDER</OrderButton>
  )
 }


const handleRemove = (product) => {
   axios.put('/api/cartsdelete',{items: [product]}, config).then(response => console.log(response));

   if(del === false) {
    setDel(true);
   } else {
    setDel(false);
   }
   props.del(del);
};


if (token) {
    return (
      <Container>
    
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton> <Link to="/" style={{
              textDecoration: "none",
              color: "black"
          }}> CONTINUE SHOPPING </Link> </TopButton>
          
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
  
            {
              cart.map(item => 
                  <>
                   <Product>
              <ProductDetail>
                <Image src={`http://localhost:5000/${item.image_url}`} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {item.name}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {item.product._id}
                  </ProductId>
                  
  
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Remove style={{cursor: 'pointer'}} onClick={e => handleMinus(item._id , item.qty , e)} />
                  <ProductAmount onChange={e => setQuantity(e.target.value)}>{item.qty}</ProductAmount>
                  <Add  style={{cursor: 'pointer'}} onClick={e => handlePlus(item._id , item.qty ,  e)} />
                </ProductAmountContainer>
                <ProductPrice>Rp. {item.price}</ProductPrice>
              </PriceDetail>
              <Close style={{cursor: 'pointer' , marginRight:'.1rem'}} onClick={e => handleRemove(item.product)}/>
            </Product>
               <Hr />
                  </>)
            }
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            
             
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rp. {total}</SummaryItemPrice>
            </SummaryItem>
           {createorder}
          </Summary>
        </Bottom>
      </Wrapper>
     
    </Container>
    )
        }
        

        return (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh'
        }}>
            <h1 >Please Login to access cart</h1>
        </div>
        )
  




  
}

export default Carts


//   start styling
const Container = styled.div``;

    const Wrapper = styled.div`
      padding: 20px;
       
    `;
    const OrderButton = styled(Link)`
    width: 100%;
      padding: 10px;
      background-color: #C5C5C5;
      color: white;
      cursor: pointer;
      text-decoration: none;
      align-items: center;
      justify-content: center;
      display: flex;
      &:hover{
        background-color: black;
      }
    `;
    const Title = styled.h1`
      font-weight: 300;
      text-align: center;
    `;
    
    const Top = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
    `;
    
    const TopButton = styled.button`
      padding: 10px;
      font-weight: 600;
      cursor: pointer;
      
      
    
    `;
    
    const Bottom = styled.div`
      display: flex;
      justify-content: space-between;
     
    `;
    
    const Info = styled.div`
      flex: 3;
    `;
    
    const Product = styled.div`
      display: flex;
      justify-content: space-between;
     
    `;
    
    const ProductDetail = styled.div`
      flex: 2;
      display: flex;
    `;
    
    const Image = styled.img`
      width: 200px;
    `;
    
    const Details = styled.div`
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    `;
    
    const ProductName = styled.span``;
    
    const ProductId = styled.span``;
    
    
    
    
    const PriceDetail = styled.div`
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `;
    
    const ProductAmountContainer = styled.div`
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    `;
    
    const ProductAmount = styled.div`
      font-size: 24px;
      margin: 5px;
     
    `;
    
    const ProductPrice = styled.div`
      font-size: 30px;
      font-weight: 200;
      
    `;
    
    const Hr = styled.hr`
      background-color: #eee;
      border: none;
      height: 1px;
    `;
    
    const Summary = styled.div`
      flex: 1;
      border: 0.5px solid lightgray;
      border-radius: 10px;
      padding: 20px;
      height: 50vh;
    `;
    
    const SummaryTitle = styled.h1`
      font-weight: 200;
    `;
    
    const SummaryItem = styled.div`
      margin: 30px 0px;
      display: flex;
      justify-content: space-between;
      font-weight: ${(props) => props.type === "total" && "500"};
      font-size: ${(props) => props.type === "total" && "24px"};
    `;
    
    const SummaryItemText = styled.span``;
    
    const SummaryItemPrice = styled.span``;
    
    const Button = styled.button`
      width: 100%;
      padding: 10px;
      background-color: #C5C5C5;
      color: white;
      font-weight: 600;
      cursor: pointer;

      &:hover{
        background-color: black;
      }
    `;
    
// end styling