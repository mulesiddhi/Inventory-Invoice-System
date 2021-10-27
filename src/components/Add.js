import { push, ref, set } from "firebase/database";

import Nav from './Nav'
import React from 'react'
import database from '../util/firebase';
import { useState } from 'react'

const Add = () => {

    const [name,setName]=useState();
    const [price,setPrice]=useState();
    const [quant,setQuant]=useState();

    const addProduct=(e)=>{
        e.preventDefault()
        const productRef = ref(database, 'products');
        const newProductRef = push(productRef);
        set(newProductRef,{
            name:name,
            price:parseInt(price,10),
            quantity:parseInt(quant,10)
        });
        setName('')
        setPrice('')
        setQuant('')
    }

    return (
        <div>
        <Nav/>
        <h3 className='m-2 mb-3 text-center'>Add Product</h3>
        <div className="form-floating mt-5">
            <input type="text" className="form-control" id="floatingInput" placeholder="abc.." name='productname' required
              value={name} 
      onChange={(e) => setName(e.target.value)} />
            <label htmlFor="floatingInput">Product Name</label>
          </div>
          <div class="form-floating">
          <input type="text" className="form-control" id="floatingInput" placeholder="0.." name='price' required
               value={price} 
               onChange={(e) => setPrice(e.target.value)}/>
            <label htmlFor="floatingInput">Price</label>
    </div>
    <div class="form-floating">
          <input type="text" className="form-control" id="floatingInput" placeholder="0.." name='quantity' required
              value={quant} 
              onChange={(e) => setQuant(e.target.value)} />
            <label htmlFor="floatingInput">Quantity</label>
    </div>
          <button className=" btn btn-lg btn-dark mt-5" type="submit" onClick={addProduct} >Add Product</button>
    </div>
    )
}

export default Add
