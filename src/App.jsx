
import React from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { SignIn } from './pages/BeforeLogIn/SignIn';
import { LogIn } from './pages/BeforeLogIn/LogIn';
import { NotLoggedIn } from "./pages/BeforeLogIn/NotLoggedIn"
import { Settings } from './pages/Settings';
import { MyBooks } from './pages/MyBooks';


function App() {


  return (
    <div className="root bg-white min-h-screen " >

   





      <Routes>

        <Route exact path="/" element={<Home />}></Route>
        <Route exact path='/sign' element={<SignIn />}></Route>
        <Route exact path='/login' element={<LogIn />}></Route>
        <Route exact path='/settings' element={<Settings />}></Route>
        <Route exact path="/notlogged" element={<NotLoggedIn />}></Route>
        <Route exact path='/mybooks' element={<MyBooks />}></Route>
      </Routes>

    </div>
  )
}

export default App
