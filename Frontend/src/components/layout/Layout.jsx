import React from 'react'
import Navbar from '../Navbar'
import { useQuery } from '@tanstack/react-query'

const Layout = ({children}) => {
  const {data:authUser,isLoading}=useQuery({queryKey:["authUser"]});
  console.log("auth user is in layout",authUser)
  return (
    <div className='min-h-screen bg-base-100  flex flex-col'>
    <Navbar/>
<main className='max-w-xl auto px-4 py-6 items-center flex justify-center'>
    {children}
</main>
    </div>
  )
}

export default Layout
