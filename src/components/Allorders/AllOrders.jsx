
import axios from 'axios'
import style from './AllOrders.module.css'
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';


export default function AllOrders() {
  
  const [cartItems, setCartItems] = useState([])
 async function getAllProduct() {
   const {data}  = await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/679182dd4e3f2254d6871890")
   console.log(data);
   setCartItems(data)
     
  }

  useEffect(()=>{
    getAllProduct();
  },[])
  
  return (
    <>
       <h1 className='text-center my-2 ' >All Orders</h1>
    <div className="grid  grid-cols-12  my-5 p-2">
   

      {
        cartItems.map((p)=> <div key={p.id} className=" col-span-12 flex flex-col    md:col-span-6 text-center p-5 transition-all duration-500 shadow-lg rounded-lg hover:shadow-green-400 gap-5">
         
          <span className='text-green-400 font-semibold' >Name:{p.user.name}</span>
             <h5 className=''> <span className='text-red-700'>Email</span>  : {p.user.email}</h5>   
             <span className='font-bold' > Totatl Price : {p.totalOrderPrice}</span>
             <span className='' >Phone:{p.user.phone}</span>
             <p className='text-red-700 font-semibold'> Paid At :  {p.paidAt}</p>
         
          
       </div>)
      }
    
    </div>
    </>
  )
}
