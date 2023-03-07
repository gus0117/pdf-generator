import React from 'react'

const WebContent = ({ files }) => {

  return (
    <div className='page-container'>
        {
            files.map(file => {
                <img src={file.path} alt="Imagen ejemplo" key={file.name}/>
            })
        }
    </div>
  )
}

export default WebContent