
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import './App.css'
import { Home } from './pages/Home/Home';
import { Explore } from './pages/Explore';
import { Register } from './pages/BeforeLogIn/Register';
import { LogIn } from './pages/BeforeLogIn/LogIn';
import { Settings } from './pages/Settings';
import { All } from './pages/MyBooks/Shelves/All';
import { Stats } from './pages/MyBooks/Stats/Stats';
import { Admin } from './pages/Admin/Admin';
import { Shelf } from './pages/MyBooks/Shelves/Shelf';
import { userContext } from './context/userContex';
import { updateContext } from './context/updateContext';
import { User } from './pages/User';
import { NotFound } from "./pages/NotFound"
import { Details } from "./pages/Details"
import axios from "axios"
import { searchShelfContext } from './context/searchContext';
import { ShowUsers } from './pages/Admin/Show/ShowUsers';
import { ShowComments } from './pages/Admin/Show/ShowComments';
import { AdminForms } from './pages/Admin/Forms/AdminForms';
import {Moderator} from "./pages/Moderator/Moderator"
import { useAuth } from './hooks/useAuth';


function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("decoded")));
  const jwt = localStorage.getItem("jwt")

  const [searchValue, setSearchValue] = useState("")
  const [searchAdmin, setSearchAdmin] = useState("")
  const [searchAdminCom, setSearchAdminCom] = useState("")
  const [searchOutput, setSearchOutput] = useState([]);

  useEffect(() => {
    const decode = JSON.parse(localStorage.getItem("decoded"));

    setUser(decode)
  }, [jwt])


  useEffect(() => {

    if (user != null) {
      axios.get(`http://localhost:3000/users/${user.email}`, { headers: { Authorization: `Bearer ${jwt}` } }).then(res => { setUser(res.data); }).catch(err => console.log(err))

    }




  }, [jwt]);


  const [update, setupdate] = useState(false)
  const isLogin = useAuth();


  return (
    <div className="root bg-light-beige h-full " >
      <updateContext.Provider value={{ update: update, setupdate: setupdate }} >

        <userContext.Provider value={{ user: user, setUpdateUser: setUser, jwt: jwt }}>
          <searchShelfContext.Provider value={{ searchValue: searchValue, setSearchValue: setSearchValue, searchOutput: searchOutput, setSearchOutput: setSearchOutput, searchAdminCom: searchAdminCom, setSearchAdminCom: setSearchAdminCom,searchAdmin: searchAdmin, setSearchAdmin: setSearchAdmin }}>
          <Routes>
              {!isLogin ? (
                <>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<LogIn />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/details/:id" element={<Details />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/mybooks" element={<All />} />
                  <Route path="/users" element={<User />} />
                  {user && user.role === "admin" && (
                    <>
                      <Route path="/admin" element={<Admin />} />
                      <Route
                        path="/admin/showusers"
                        element={<ShowUsers />}
                      />
                      <Route
                        path="/admin/showcomments"
                        element={<ShowComments goBack="/admin" />}
                      />
                      <Route path="/admin/forms" element={<AdminForms />} />
                    </>
                  )}
                  {user && user.role === "moderator" && (
                    <>
                      <Route path="/moderator" element={<Moderator />} />
                      <Route
                        path="/moderator/showcomments"
                        element={<ShowComments />}
                      />
                    </>
                  )}
                  <Route path="/mybooks/shelves/all" element={<All />} />
                  <Route path="/mybooks/stats" element={<Stats />} />
                  <Route
                    path="mybooks/shelves/:name/:id"
                    element={<Shelf />}
                  />
                  <Route path="*" element={<NotFound />} />
                </>
              )}
            </Routes>
          </searchShelfContext.Provider>
        </userContext.Provider>
      </updateContext.Provider>
    </div>
  )
}

export default App
