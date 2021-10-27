import React,{useEffect} from 'react'
import { onValue, push, query, ref, remove, set, update } from '@firebase/database'

import Nav from './Nav'
import database from '../util/firebase'
import { useHistory } from 'react-router'
import { useState } from 'react'

const Generate = () => {

    const history = useHistory();


    const [items,setItem]=useState([])
    const [selectedItem,setSelected]=useState();
    const [data,setData]=useState();
    const [key,setKey]=useState();
    const [quant,setQuant]=useState('');
    const [error,setError]=useState('');
    const [arr,setArr]=useState([]);
    const [obj,setObj]=useState([])
    const [total,setTotal]=useState(0);

    useEffect(() => {
        const dbref= ref(database,'products/');
        onValue(dbref,(snapshot)=>{
          // const id=snapshot.key
          // console.log(id)
          const data=snapshot.val()
          setItem(data)
        })
        console.log(selectedItem)
        onValue(dbref, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              if(childData.name===selectedItem){
                //   console.log(childData)
                  setData(childData)
                  setKey(childKey)
              }
              // ...
            });
          }, {
            onlyOnce: true
          });
        
      }, [selectedItem])

      
      const handleSelect=(e)=>{
            e.preventDefault()
            setSelected(e.target.value);
            // console.log(e.target.value)
      }
      const handleSubmit=(e)=>{
          e.preventDefault()
          if(data){
          if(parseInt(quant, 10)>parseInt(data.quantity, 10)){
              setError('quantity should not  be greater than')
          }
          else{
            setError('')
            const object={pname:data.name,price:data.price*quant,quant:quant}
            setArr([...arr, object ])
            setTotal(total+data.price*quant)
            setObj([...obj,{id:key,number:quant,dquant:data.quantity}])

          
          }
        }
      }

      const generate=(e)=>{
          e.preventDefault()
        const invoiceRef = ref(database, 'invoices');
        const newInvoiceRef = push(invoiceRef);
        set(newInvoiceRef,{
            product:arr,
            amount:total
        });
        obj.map((a)=>{
            if(a.dquant-a.number===0){
                remove(ref(database,'products/'+a.id));

            }else{
                update(ref(database,'products/'+a.id), {
                    quantity:(a.dquant-a.number)
                });
    
            }
        })
       
        history.push("/home");
      }



    return (
        <div>
        <Nav/>
        <h3 className='m-2 mb-3 text-center'>Billing</h3>
        <div class="container">
  <div class="row">
        <div className=' col-sm'>
       <label htmlFor="floatingInput">Product Name:</label>
       {/* <input type="text" className=" form-control " id='floatingInput' placeholder="abc.." name='productname' required 
       /> */}
       <select value={selectedItem} className=" form-control " id='floatingInput' onChange={handleSelect} >
       <option value="" disabled selected hidden>select a product</option>
       {Object.keys(items).map((item,index)=>{
                  return(
                    <option key={index} value={items[item].name}>{items[item].name}</option>
                  )
              })}
     </select>
       </div>
       <div className=' col-sm'>
       <label htmlFor="floatingInput">Quantity:</label>
       <input type="text" className=" form-control" id='floatingInput' placeholder="0" name='quantity' required 
       onChange={(e)=>{setQuant(e.target.value)}}/>
       </div>
       <button className=" w-25 btn-dark justify-content-center m-4" type="submit" onClick={handleSubmit} >Add to Invoice</button>

       </div>
       <div>
           {(error===''?
       <h4> </h4>:
       <h4>{error} {data.quantity}</h4>
       )}
       </div>
       </div>
       <hr/>
       <div className='container'>
       <h3 className='m-2 mb-3 text-decoration-underline'>Invoice</h3>
       <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
       {arr.map((a,i)=>{
            return(
                <tr key={i}>
                <td>{i+1}</td>
                <td>{a.pname}</td>
                <td>{a.quant}</td>
                <td>₹ {a.price}</td>
              </tr>
              )
       })}
       <tr className=''>
           <td></td>
           <td></td>
           <td></td>
           <td style={{fontWeight:700}}>Total: {total}</td>
       </tr>
       </tbody>
        </table>
      </div>
      <div className='d-flex flex-row-reverse'>
      <button className=" w-25 btn-primary btn justify-content-center m-4" type="submit" onClick={generate} >Generate</button>
      </div>
       </div>
    </div>
    )
}

export default Generate
