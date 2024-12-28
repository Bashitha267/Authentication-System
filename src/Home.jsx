import React from 'react'
import './Home.css'
import check from './assets/check.png.png'

export const Home = () => {
  return (
    <div className="body">
        {
            <div className="home bg-gray-100 box-decoration-slice border-4 border-teal-300 p-4">
                <img src={check} alt="check" className="check"/>
                <h1 className='text-4xl font-bold'>  Login   Complete</h1>
            </div>
        }
    </div>
  )
}
