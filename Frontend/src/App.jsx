import { useState } from 'react'
import Layout from './components/layout/Layout'
import HomePage from './pages/auth/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import './App.css'

import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Layout>
<Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/signup" element={<SignUpPage/>}/>
  <Route path="/login" element={<LoginPage/>}/>

</Routes>
     </Layout>
     
    </>
  )
}

export default App
