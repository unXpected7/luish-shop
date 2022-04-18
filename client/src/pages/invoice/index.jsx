import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import './style.scss'
const Invoice =  () => {
    const [invoice, setData] = useState([]);
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const config = {
        headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}
      }
      
    const getData = async () => {
     
         await axios.get(`/api/invoices/${params.order_id}`, config).then(response => setData(response.data))
            
    
    }
    const getItem = async  () => {
       await axios.get(`/api/item/${params.order_id}` , config).then(res => setItem(res.data)) 
       setLoading(false);
    }
    useEffect(() => {
        getData();
        getItem();
    }, [])
   
  
   
    
    if(invoice.length === 0) {
        return  <div class="loader" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
            
        }}></div>
    } else {
        
 
    return (
        <div className='invoice'>
             
             <header class="row">
       <div class="logoholder text-center" contenteditable>
           <img style={{ height: '5rem' }} src={require('../../logo512.png')} />
       </div>
     
     
       <div class="me" contenteditable>

         <p>
           <strong>Actera.Id - SportWear</strong><br/>
           Mendungsari<br/>
           Bulurejo, Gondangrejo<br/>
           Karanganyar
         </p>
       </div>
       <div class="info">
           <p contenteditable>
         
           Mail: <a href="#">actera.id@gmail.com</a><br/>
           Tel: +62 8966 8408 656<br/>
           Instagram: @actera.id
           </p>
       </div>
     
       <div class="col-3 bank" contenteditable>
       
       </div>
     </header>
     
     
     <div class="row section">
       
       <div class="col-1">
         <p contenteditable class="smallme">Invoice Number : {invoice._id} </p>
     
         <p contenteditable class="client">
           <strong>{invoice.user.full_name}</strong><br/>
           {invoice.user.email}<br/>
           <strong>{invoice.order.delivery_address.detail}</strong> , {invoice.order.delivery_address.kelurahan} , {invoice.order.delivery_address.kecamatan} , {invoice.order.delivery_address.kabupaten} , {invoice.order.delivery_address.provinsi}
         </p>
       </div>
       <div class="col-2">
         <h1 contenteditable>Rincian</h1>
       </div>
       <div class="col-2 text-right details">
         <p contenteditable>
           Tanggal Dibuat: {invoice.createdAt.split('T')[0].split('-').reverse().join('/')} <br/> <br/>
          
         </p>
       </div>
     
     </div>
     
     <div class="invoicelist-body">
       <table>
         <thead contenteditable>
           <th>Nama Produk</th>
           <th>Deskripsi</th>
           <th class="daterelated">Harga</th>
           <th width="10%">Jumlah</th>
           <th width="12%">Total</th>
          
         </thead>
         <tbody>
             {
                 item.map(item => {
                     return (
                         <tr>
                             <td>{item.product.name}</td>
                             <td>{item.product.description}</td>
                             <td>Rp. {item.product.price}</td>
                             <td>{item.qty}</td>
                             <td>Rp. {item.product.price * item.qty}</td>
                         </tr>
                     )
                 })
             }
         </tbody>
       </table>
       
     </div>
     
     <div class="invoicelist-footer">
       <table>
         <tr class="taxrelated">
           <td>Ongkir:</td>
           <td > {invoice.delivery_fee} </td>
         </tr>
         <tr>
           <td><strong>Total:</strong></td>
           <td > <strong>{invoice.total}</strong> </td>
         </tr>
       </table>
     </div>
     
     <div class="note" contenteditable>
       <h2>Note:</h2>
     </div>
     
     <footer class="row">
       <div class="col-1 text-center">
         <p class="notaxrelated" contenteditable>Untuk Pembayaran bisa dilakukan via transfer</p>
         <p contenteditable class="notdaterelated">
           BCA AN. Actera ID 12355665
         </p>
       </div>
       <button style={{display: 'block', margin: 'auto' , padding: '.5rem' , width: '10rem', marginTop: '2rem'}}><Link to='/profile' style={{textDecoration: 'none'}}> <h2>Kembali</h2></Link></button>
     </footer>
     
      </div>
        )
    }
  
  
} 

export default Invoice
