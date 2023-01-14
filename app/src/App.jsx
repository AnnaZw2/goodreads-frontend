
import React, { useState, useEffect } from 'react';
import { Route, Routes} from 'react-router';
import './App.css'
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Register } from './pages/BeforeLogIn/Register';
import { LogIn } from './pages/BeforeLogIn/LogIn';
import { NotLoggedIn } from "./pages/BeforeLogIn/NotLoggedIn"
import { Settings } from './pages/Settings';
import { MyBooks } from './pages/MyBooks/MyBooks';
import { All } from './pages/MyBooks/Shelves/All';
import { Stats } from './pages/MyBooks/Stats/Stats';

import { Shelf } from './pages/MyBooks/Shelves/Shelf';
import { userContext } from './context/userContex';
import jwt_decode from "jwt-decode";

function App() {

  const token = localStorage.getItem("jwt")
  const decode =jwt_decode(token)

  const [jwt,updateJwt]= useState(token)
  const [user,updateUser]= useState(decode)



  return (
      <div className="root bg-light-beige min-h-screen " >

<userContext.Provider value={{user,updateUser,jwt,updateJwt}}>
        <Routes>

          <Route exact path="/" element={<Home />}></Route>
          <Route exact path='/sign' element={<Register />}></Route>
          <Route exact path='/login' element={<LogIn />}></Route>
          <Route exact path='/explore' element={<Explore />}></Route>
          <Route exact path='/settings' element={<Settings />}></Route>
          <Route exact path="/notlogged" element={<NotLoggedIn />}></Route>
          <Route exact path='/mybooks' element={<MyBooks />}>    </Route>

          <Route exact path='mybooks/shelves/all' element={<All />}></Route>
          {/* <Route exact path='mybooks/shelves/currentlyreading' element={<CurrentlyReading />}></Route>
          <Route exact path='mybooks/shelves/read' element={<Read />}></Route>
         */}
         <Route exact path='mybooks/stats' element={<Stats />}></Route>

          {/* {FIXXXXXXX ELEMENT={FETCH DO ODPOWIENIEJ PÓŁKI}} */}

         <Route path="mybooks/shelves/:name" element={<Shelf/>}></Route>

          
          
        </Routes>
</userContext.Provider>
      </div>
  )
}

export default App
