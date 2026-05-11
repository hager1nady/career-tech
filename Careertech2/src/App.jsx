import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Outlet , createBrowserRouter , RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './component/Login/Login'

function App() {
  return (
    <>
<Login />
    </>
  )
}

export default App

