
import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css'
import { Home } from './pages/Home';
import { SignIn } from './pages/BeforeLogIn/SignIn';
import { LogIn } from './pages/BeforeLogIn/LogIn';
import { NotLoggedIn } from "./pages/BeforeLogIn/NotLoggedIn"
import { Settings } from './pages/Settings';
import { MyBooks } from './pages/MyBooks/MyBooks';
import { All } from './pages/MyBooks/Shelfs/All';
import { CurrentlyReading } from './pages/MyBooks/Shelfs/CurrentlyReading';
import { Read } from './pages/MyBooks/Shelfs/Read';


function App() {


  return (
    <div className="root bg-white min-h-screen " >







      <Routes>

        <Route exact path="/" element={<Home />}></Route>
        <Route exact path='/sign' element={<SignIn />}></Route>
        <Route exact path='/login' element={<LogIn />}></Route>
        <Route exact path='/settings' element={<Settings />}></Route>
        <Route exact path="/notlogged" element={<NotLoggedIn />}></Route>
        <Route exact path='/mybooks' element={<MyBooks />}>    </Route>
        <Route exact path='mybooks/shelfs/all' element={<All/>}></Route>
        <Route exact path='mybooks/shelfs/currentlyreading' element={<CurrentlyReading/>}></Route>
        <Route exact path='mybooks/shelfs/read' element={<CurrentlyReading/>}></Route>

      </Routes>

    </div>
  )
}

export default App
