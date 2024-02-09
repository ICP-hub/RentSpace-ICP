import React from 'react'

const AdminMessage = ({text}) => {
  return (
    <div className="admin-message-cont">
        <p className='admin-message'>
            {text}
        </p>
    </div>
    
  )
}

export default AdminMessage