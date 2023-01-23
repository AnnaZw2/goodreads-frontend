
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
import axios from "axios"
import { searchShelfContext } from './context/searchContext';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("decoded")));
const jwt = localStorage.getItem("jwt")

const [searchValue,setSearchValue] = useState("")
const [searchOutput, setSearchOutput] = useState([]);

  useEffect(()=>{
    const decode = JSON.parse(localStorage.getItem("decoded"));
 
setUser(decode)
  },[jwt])


useEffect(() => {
  
if(user!=null){
  axios.get(`http://localhost:3000/users/${user.email}`,  { headers: { Authorization: `Bearer ${jwt}` }}).then(res => {setUser(res.data);}).catch(err => console.log(err))

}
    

      

}, [jwt]);


  const [updateShelves, setUpdateShelves] = useState(false)



  return (
    <div className="root bg-light-beige h-full " >
      <updateShelfContext.Provider value={{ updateShelves: updateShelves, setUpdateShelves: setUpdateShelves }} >
      
      <userContext.Provider value={{ user: user, setUpdateUser:setUser , jwt: jwt}}>
      <searchShelfContext.Provider value={{searchValue:searchValue,setSearchValue:setSearchValue,searchOutput:searchOutput,setSearchOutput:setSearchOutput}}>
          <Routes>
        
            <Route path="/" element={<Home />}></Route>
            <Route path='/details/:id' element={<Details/>}></Route>
            <Route path='/sign' element={<Register />}></Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/explore' element={<Explore />}></Route>
            <Route path='/settings' element={<Settings />}></Route>
            <Route path="/notlogged" element={<NotLoggedIn />}></Route>
            <Route path='/mybooks' element={<All/>}>    </Route>
            <Route path="/users" element={<User />} />
{ user.role === "admin" ?
              <Route path="/admin" element={<Admin />}></Route> : null }
            <Route path='mybooks/shelves/all' element={<All />}></Route>
            <Route path='mybooks/stats' element={<Stats />}></Route>
            <Route path="mybooks/shelves/:name/:id" element={<Shelf />}></Route>
            <Route path='*' element={<NotFound />} />

          </Routes>
          </searchShelfContext.Provider>
          </userContext.Provider>
      </updateShelfContext.Provider>
    </div>
  )
}

export default App
