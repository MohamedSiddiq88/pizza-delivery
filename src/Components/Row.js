import React, { useState } from 'react'
import EditButton from './EditButton'

function Row({ ele, ind, handleEdit, handleUpdate, setUpdatedQuantity, updatedQuantity }) {
    const [editClicked, setEditClicked] = useState(false);
    // updatedQuantity=ele.quantity;
    return (
        <tr key={ele.id}>
            <td>{ele.name}</td>
            <td> 
            {editClicked  ? (
                    <input type="text" value={updatedQuantity} onChange={(e) => setUpdatedQuantity(e.target.value)} />
                  ) : (
                    <input type="text" value={ele.quantity} readOnly />
                  )}
               {/* <input type="text" value={ele.quantity} readOnly={editClicked ? false : true} onChange={(e) => (setUpdatedQuantity(e.target.value))}  /> */}
            </td>
            <td>
                {editClicked ?
                    <>
                        <button className='btn btn-success' onClick={() => (setEditClicked(!editClicked),handleUpdate(ind,"sauce"))}>Update</button>
                        <button className='btn btn-danger' onClick={() => setEditClicked(!editClicked)}>Cancel</button>
                    </>
                    :
                    <button className='btn btn-primary' onClick={() => (setEditClicked(!editClicked),handleEdit(ind,"sauce"))}>Edit</button>

                }
            </td>
        </tr>
    )
}

export default Row
