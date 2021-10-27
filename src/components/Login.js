import { Link, Redirect } from 'react-router-dom'
import React,{useEffect, useState} from 'react'
import { onValue, push, query, ref, remove, set, update } from '@firebase/database'

import { UserContext } from '../context/usercontext'
import database from '../util/firebase'
import { useContext } from 'react'
import { useHistory } from 'react-router'

const Login = () => {
  const {setUser}=useContext(UserContext);
  const [admin,setAdmin]=useState();
  const [ps,setPs]=useState();
  const [err,setErr]=useState('');
  const [login,setLogin]=useState();
  const history = useHistory();

  useEffect(()=>{
    const dbref= ref(database,'user');
    onValue(dbref, (snapshot) => {
      setLogin(snapshot.val())
      // console.log(snapshot.val().password)
    } )
  }, [])
  
 
  const handleLogin=e=>{
    e.preventDefault();
    if (parseInt(admin,10)===login.admin && ps===login.password){
      setUser(true)
    history.push("/home");
    }else{
      setErr('Wrong Credentials');
    }
    
  }
    
    return (
      <div className="App vh-100">
        <main className="form-signin">
          <form onSubmit={handleLogin}>
          <h1 className="h3 mb-3">Login</h1>

          <div className="form-floating mt-5">
            <input type="text" className="form-control" id="floatingInput" placeholder="+91" name='Mobile' required
              onChange={e=>{setAdmin(e.target.value)}} />
            <label htmlFor="floatingInput">Mobile Number</label>
          </div>
          <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required onChange={(e)=>{setPs(e.target.value)}}/>
      <label for="floatingPassword">Password</label>
    </div>
    <div> <h5>{err}</h5></div>
          <button className="w-100 btn btn-lg btn-dark mt-5" type="submit" >Login</button>
        </form>
        </main>
      </div>

    )
}

export default Login
