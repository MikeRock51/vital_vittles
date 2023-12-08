import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
          const Links =[
            {name: "HOME"},
            {name: "CHATBOT"},
            {name: "USERS"},
            {name: "LOGOUT"},

          ]
  return (
    <div>
       <nav className="bg-red-700 p-4 shadow-md h-16"> 
        <ul>
          {
            Links.map((link,index)=>{
              <li key={index} className='md: inline-block md:ml-10 ml-5'>
                <a href='/' className='text-white text-sm'>{Link.name}</a>
                
              </li>
            })
          }
        </ul>
    </nav>
    </div>
  )
}

export default NavBar
