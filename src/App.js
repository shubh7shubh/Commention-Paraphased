
import React from "react";
import Home from "./Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserForm from "./UserForm";
import Login from "./Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/userForm' element={<UserForm />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer
    autoClose={1000}
    pauseOnHover={false}
    position="bottom-right"
    toastStyle={{color:"white",backgroundColor:"#544fb2"}}
     />
  </>
}

export default App;
