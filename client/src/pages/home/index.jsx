import axios from 'axios';
import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import './index.css'
import Pagination from '@material-ui/lab/Pagination';
import Footer from '../../components/Footer';
import Dropdowns from '../../components/Dropdown';


const Home =  (props ) => {
  const [product, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);  // jumlah data yang ditampilkan per halaman 
  const [size, setSize] = useState([]);
  const [tag, setTags] = useState([]);
  const [loading , setLoading] = useState(false);
  const [length , setLength] = useState(false);
  const [tagKey, setTagKey] = useState('');
  const [selected, setSelected] = useState("Select Category");
  
  
  const config = {
    headers: {Authorization : 'Bearer ' + localStorage.getItem('token'),} 
  }

  const handlePaginate = async () => {
   await axios.get(`/api/products?limit=${limit}&skip=${skip}` ).then(response => setData(response.data.data))
    .catch(err => console.log(err))
    setLoading(true);
  }

  const handlePageChange = (event, value) => {
    axios.get(`/api/products` ).then(response => setSize(response.data.data));
  }

  useEffect(() => {
    setLoading(false);
    handlePaginate()
  }, [skip])
  
 
  
  useEffect(() => {
    if (props.keyword.length > 0) {
      axios.get(`/api/products?q=${props.keyword}` ).then(response => {setData(response.data.data); setSize(response.data.data);});
    } else{
      handlePaginate();
      handlePageChange();
    }
  } , [props.keyword])
  

  useEffect(() => {
    axios.get('/api/tags').then(response => setTags(response.data));
    handlePageChange();
    
  }, [])

  
  useEffect(async ()=> {
   
    if (selected) {
      
     await axios.get(`/api/products?category=${selected.key}` ).then(response => {setData(response.data.data); setSize(response.data.data);});
      setLoading(true);
      
    } else{
      handlePaginate();
      
    }
  }, [selected])

  useEffect(()=> {
    if(tagKey){
      axios.get(`/api/products?tags[]=${tagKey}` ).then(response => {setData(response.data.data); setSize(response.data.data);});
    } else{
      handlePaginate();
      handlePageChange();
    }
    
  
}, [tagKey])
  
 // change cartLength in localStorage
  
 console.log(product);

 
 const  handleAddCart = async (products , e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if(token){
  await axios.put('/api/carts', {items: [products]}, config).then(response => {
    console.log(response.data);
    if(length === false){
      setLength(true); }
      else {
        setLength(false);
      }
    
  });
  } else{
    alert('Please Login First')
  }
};


props.func(length);

  const handlePageClick = (e, value) => {
    setPage(value);
    setSkip(value * 6 - 6);
    
  }
  
  const checboxHandler = (name ,  e) => { 
    e.preventDefault();
    if(tag.includes(name)){
      setTagKey('');
      setTags(tag.filter(tag => tag !== name));
    } else{
      setTagKey(name);
      setTags([...tag, name]);
    }
    
    
  }
 
  const pageCount = ()  => {
    return Math.ceil(size.length / limit );
  }
  
  let content = (
    product.map(products => 
      <div className="column">
      <Card>
        <div>
      <Image src={`http://localhost:5000/${products.image_url}`}/>
      </div>
      <Title>{products.name}</Title>
      <Price>Rp {products.price}</Price>
      <div>
      <p>{products.description}</p> </div>
      <Button onClick={e => handleAddCart(products , e)}> <i className="fa fa-fw fa-cart-plus"></i> </Button>
      </Card>
      
    </div>)
  )

  return (
    
      <div>
        <img src={require('./actera.png')} style={{ height: '60px' , margin: ' 15px auto ' , display: 'flex'}} alt='header'/>
        <Tag>
          <label style={{marginLeft: '10rem' ,  boxSizing : 'border-box' }}> Tag : </label>
          
          {
            tag.map(item => <><input style={{marginLeft: '.5rem'}} type="checkbox" name={item.name}  onChange={e => checboxHandler(item.name , e)}/> <label htmlFor="checkbox" style={{marginLeft: '.5rem'}}> <i className='fa fa-fw fa-tag' style={{display: 'inline'  }}>  </i> {item.name} </label></>)
          }
        </Tag>
        
        <div className="App">
      {/* custom dropdown menu */}
       <Dropdowns selected={selected} setSelected={setSelected}   />
      
        </div>
        
  
        <Body>

  <div className="row">
    {loading? content : <div class="loader"></div>}

        

</div>
        
        
        
        </Body>
        <Pagination count={pageCount()} page={page} onChange={handlePageClick} style={{marginLeft: '10rem' , marginBottom: '7rem' , marginTop: '1rem'}}/>
        
       <Footer/> 
      </div>
        
    
  );
};




export default Home;

const Tag = styled.div`
display: flex;

`
const Body = styled.div`
display:flex;
 align-items:center;
 margin: auto;
 width: 80%;
 content: ""
 padding: 20px;
 box-sizing: border-box;
`

const Card = styled.div`
box-sizing: border-box;
margin-top: 0;
padding:20px;
border: solid #C5C5C5 2px;
border-radius: 15px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
;
`

const Image = styled.img`
max-width: 100%;

align-items:center;
justify-content: space-between;
margin: 0;
`
const Price = styled.h5`
color: #C5C5C5;
display: inline-block;
margin-left:10px;
margin-bottom: 10px;
`
const Title = styled.h3`
display: inline-block;
margin-left:10px;

`

const Button = styled.button`
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
}
`


