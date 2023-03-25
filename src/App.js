import React from 'react';
import './App.css';
import {BrowserRouter as Routers, Route, Routes} from "react-router-dom"
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import "./assets/styles/main.css"
import EditTask from './pages/EditTask';
function App() {
  return (
    <Routers>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddTask/>} />
        <Route path='/edit/:id' element={<EditTask/>}/>
      </Routes>
    </Routers>
  )
}

export default App;
