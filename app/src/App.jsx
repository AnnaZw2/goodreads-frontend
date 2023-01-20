
import React, { useContext, useEffect, useState,useMemo } from 'react';
import { Route, Routes } from 'react-router';

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
import { Admin } from './pages/Admin/Admin';
import { Shelf } from './pages/MyBooks/Shelves/Shelf';
import { userContext } from './context/userContex';
import { updateShelfContext } from './context/updateShelfContext';
import { User } from './pages/User';
import { NotFound } from "./pages/NotFound"
import {Details} from "./components/books/Details"
import jwt_decode from "jwt-decode";
import axios from "axios"

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("decoded")));
const jwt = localStorage.getItem("jwt")

 

  useEffect(()=>{
    const decode = JSON.parse(localStorage.getItem("decoded"));
    console.log("user from useeffect",user)
setUser(decode)
  },[jwt])
  console.log(user);
  
  
  
// console.log("from app",JSON.parse(decode))
// const parsed = JSON.parse(decode)
// setUser(parsed)
// console.log(user)

useEffect(() => {
  

    

      axios.get(`http://localhost:3000/users/${user.email}`,  { headers: { Authorization: `Bearer ${jwt}` }}).then(res => {setUser(res.data);}).catch(err => console.log(err))

}, [jwt]);


  const [updateShelves, setUpdateShelves] = useState(false)



  return (
    <div className="root bg-light-beige min-h-screen " >
      <updateShelfContext.Provider value={{ updateShelves: updateShelves, setUpdateShelves: setUpdateShelves }} >
      
      <userContext.Provider value={{ user: user, setUpdateUser:setUser , jwt: jwt}}>
          <Routes>
        
            <Route path="/" element={<Home />}></Route>
            <Route path='/details/:id' element={<Details/>}></Route>
            <Route path='/sign' element={<Register />}></Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/explore' element={<Explore />}></Route>
            <Route path='/settings' element={<Settings />}></Route>
            <Route path="/notlogged" element={<NotLoggedIn />}></Route>
            <Route path='/mybooks' element={<MyBooks />}>    </Route>
            <Route path="/users" element={<User />} />
{user.role === "admin" ?
              <Route path="/admin" element={<Admin />}></Route> : null }
            <Route path='mybooks/shelves/all' element={<All />}></Route>
            <Route path='mybooks/stats' element={<Stats />}></Route>
            <Route path="mybooks/shelves/:name" element={<Shelf />}></Route>
            <Route path='*' element={<NotFound />} />

          </Routes>
          </userContext.Provider>
      </updateShelfContext.Provider>
    </div>
  )
}

export default App
