import React from 'react'

const Header = ({headerName}:{headerName:string}) => {
  return (
    <h2 className="font-bold text-base py-2 px-5 text-gray-900">{headerName}</h2>
  )
}

export default Header