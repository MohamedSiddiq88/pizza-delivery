import React, { useContext } from 'react'
import Test from './Test';
import { MenuCtx } from '../Context/AppProvider';

function Display() {
  const {count} = useContext(MenuCtx);
  return (
      <div className='text-center mt-5'>
        {count}
      </div>
  )
}

export default Display

