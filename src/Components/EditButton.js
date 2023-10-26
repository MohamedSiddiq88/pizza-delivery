import React from 'react'

function EditButton({className, key, content, editClicked, setEditClicked}) {
  return (
    <button className={className} key={key} onClick={()=>setEditClicked(!editClicked)}>{content}</button>
  )
}

export default EditButton
