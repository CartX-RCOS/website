import './index.css'
import NavBar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Content from '../../components/Content/Content'

const Home = () => {
  return (
   <>
      <Sidebar />  
      <Content className="content"/>
      <NavBar />
   </>
  )
}

export default Home

