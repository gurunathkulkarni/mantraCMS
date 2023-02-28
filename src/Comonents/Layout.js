import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './Layout.css'

export default function Layout({children}) {
  return (
    <div>
        <Sidebar/>
        <Navbar/>
        <div className='ml-200'> 
{children}
        </div>
    
    </div>
  )
}
