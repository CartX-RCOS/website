import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'


const Layout = () => {
  return (
   <>
      <div>
         <Navbar />
         <Outlet />
      </div>   
   </>
  )
}

export default Layout

