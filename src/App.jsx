
import React from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { LogIn } from './pages/LogIn';


function App() {


  return (
    <div className="root bg-beige min-h-screen " >

    <div className='flex justify-center gap-2 font-semibold text-xl '>
    <Link to="/" className=' text-light-brown border border-brown rounded-lg p-1 hover:bg-yellow hover:text-light-brown' >Home</Link>
    <Link  to="/sign" className=' text-light-brown border border-brown rounded-lg p-1 hover:bg-yellow hover:text-light-brown' >Sign in</Link>
    <Link  to="/login" className=' text-light-brown border border-brown rounded-lg p-1 hover:bg-yellow hover:text-light-brown' >Log in</Link>
    </div>
      <Routes>
      
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path='/sign' element={<SignIn/>}></Route>
        <Route exact path='/login' element={<LogIn/>}></Route>
      </Routes>
 
    </div>
  )
}

export default App
