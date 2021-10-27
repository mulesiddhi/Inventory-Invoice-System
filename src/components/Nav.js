import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import { UserContext } from '../context/usercontext'

const Nav = () => {
  const {setUser}=useContext(UserContext);
    return (
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center text-white bg-dark">
  <header class="mb-auto">
    <div>
      <h3 class="float-md-start mb-0">DashBoard</h3>
      <nav class="nav nav-masthead justify-content-center float-md-end">
       <Link to='/home' className='nav-link active' style={{color:'#fff'}}>Home</Link>
       {/* <Link to='/invoice' className='nav-link'style={{color:'#fff'}}>Invoice</Link> */}
       <Link to='/add' className='nav-link'style={{color:'#fff'}}>Add Product</Link>
       <Link to='/generate' className='nav-link'style={{color:'#fff'}}>Generate Invoice</Link>
       <button className='p-1 btn nav-link' onClick={()=>setUser(false)}>Logout</button>
      </nav>
    </div>
  </header>

 
</div>
  

    )
}

export default Nav
