
import React, { useState} from 'react';
import { Route, Routes} from 'react-router';

import './App.css'
import { Home } from './pages/Home/Home';
import { Explore } from './pages/Explore';
import { Register } from './pages/BeforeLogIn/Register';
import { LogIn } from './pages/BeforeLogIn/LogIn';
import { NotLoggedIn } from "./pages/BeforeLogIn/NotLoggedIn"
import { Settings } from './pages/Settings';
import { MyBooks } from './pages/MyBooks/MyBooks';
import { All } from './pages/MyBooks/Shelves/All';
import { Stats } from './pages/MyBooks/Stats/Stats';
import { Admin } from './pages/Admin';
import { Shelf } from './pages/MyBooks/Shelves/Shelf';
import { userContext } from './context/userContex';
import {  updateShelfContext } from './context/updateShelfContext';
import { User } from './pages/User';
import { NotFound } from "./pages/NotFound"
import jwt_decode from "jwt-decode";

function App() {

  const token = localStorage.getItem("jwt")
  const decode =jwt_decode(token)
  console.log(decode.user)

  const [jwt, updateJwt] = useState(token)
  const [user,updateUser]= useState(decode.user)
  // const [user, updateUser] = useState("")
  const [updateShelves, setUpdateShelves] = useState(false)



  return (
    <div className="root bg-light-beige min-h-screen " >
      <updateShelfContext.Provider value={{ updateShelves: updateShelves, setUpdateShelves: setUpdateShelves }} >
        <userContext.Provider value={{ user:user,updateUser: updateUser, jwt:jwt, updateJwt:updateJwt }}>
        
          <Routes>
         
            <Route  path="/" element={<Home />}></Route>
            <Route  path='/sign' element={<Register />}></Route>
            <Route  path='/login' element={<LogIn />}></Route>
            <Route  path='/explore' element={<Explore />}></Route>
            <Route  path='/settings' element={<Settings />}></Route>
            <Route  path="/notlogged" element={<NotLoggedIn />}></Route>
            <Route  path='/mybooks' element={<MyBooks />}>    </Route>
            <Route  path="/users" element={<User/>}/>
<Route  path="/admin" element={<Admin/>}></Route>
            <Route  path='mybooks/shelves/all' element={<All />}></Route>
            <Route  path='mybooks/stats' element={<Stats />}></Route>
            <Route path="mybooks/shelves/:name" element={<Shelf />}></Route>
            <Route  path='*'  element={<NotFound/>} />
          
          </Routes>
        </userContext.Provider>
      </updateShelfContext.Provider>
    </div>
  )
}

export default App
