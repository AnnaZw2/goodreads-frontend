
import React from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';


function App() {


  return (
    <div className="App " >

    <Link to="/" >Home</Link>
    <Link  to="/sign" >Sign in</Link>
      <Routes>
      
        <Route exact path="/" element={<Home/>}>
        </Route>
        <Route exact path='/sign' element={<SignIn/>}></Route>
      </Routes>
 
    </div>
  )
}

export default App
