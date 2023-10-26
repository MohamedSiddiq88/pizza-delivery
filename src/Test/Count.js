import React, { useContext } from 'react'
import Test from './Test';
import { MenuCtx } from '../Context/AppProvider';

function Count() {
  const {count,setCount} = useContext(MenuCtx);
  


  return (
    <div className='text-center mt-5'>
        <button className="btn" onClick={()=>setCount((pre)=>pre+1)}>+</button>
    {count}
        <button className="btn" onClick={()=>setCount((pre)=>pre-1)}>-</button>
    
    </div>

  )
}

export default Count
