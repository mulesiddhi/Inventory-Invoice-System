import React,{useEffect} from 'react'
import { onValue, ref, remove, set, update } from "firebase/database";

import Nav from './Nav'
import database from '../util/firebase';
import { useState } from 'react';

const Home = () => {

    const [items,setItem]=useState([])
    const [inEditMode, setInEditMode] = useState({
      status: false,
      rowKey: null
  });
  const [price,setPrice]=useState()
  const [quantity,setQuantity]=useState()

    useEffect(() => {
      const dbref= ref(database,'products');
      onValue(dbref,(snapshot)=>{
        // const id=snapshot.key
        // console.log(id)
        const data=snapshot.val()
        setItem(data)
      })
    }, [])
    if(!items){
      return <div>Loading..</div>
    }
    const handleDelete=(id,e)=>{
      console.log(id)
      remove(ref(database,'products/'+id));

    }
    const handleUpdate=(pId,e)=>{
      setInEditMode({status:true,rowKey:pId})
     
    }

    const handleSave=(id,e)=>{
      update(ref(database,'products/'+id), {
        price:parseInt(price,10),
        quantity:parseInt(quantity,10)
    });
    setInEditMode({status:false,rowkey:null})
    }


    return (

<div>
    <Nav/>
   <h3 className='m-2 mb-3 text-center'>Inventory</h3>
    <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Action</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
              {Object.keys(items).map((item,index)=>{
                  return(
                    <tr key={index}>
                    <td>{index+1}</td>
                  
                    <td>{items[item].name}</td>
                    {inEditMode.rowKey!==item?<td>₹ {items[item].price}</td>:
                    <td>
                    <input type="text" className='w-25'placeholder="price" name='price' required
                    onChange={(e)=>{setPrice(e.target.value)}}/>
                    </td>
                    }
                    {inEditMode.rowKey!==item?<td>{items[item].quantity}</td>:
                    <td>
                    <input type="text" className='w-25' placeholder="quantity" name='quantity' required
                    onChange={(e)=>{setQuantity(e.target.value)}}/>
                    </td>
                    }
                   
                   
                   {
                                    inEditMode.status && inEditMode.rowKey === item ? (
<td><button className='icon' style={{color:'green',fontWeight:700}} onClick={e=>handleSave(item,e)} >Save</button></td>                                    ):(
                                      
                                      <td><button className='icon' style={{color:'black',fontWeight:700}} onClick={e=>handleUpdate(item,e)}>Edit</button></td>
                                    )}
            
              
                   <td><button className='icon' style={{color:'red',fontWeight:700}} onClick={e=>handleDelete(item,e)}>Delete</button></td>
                  </tr>
                  )
              })}
            
          </tbody>
        </table>
      </div>
      
</div>
    )
}

export default Home
