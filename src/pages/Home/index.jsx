import { useState, useEffect } from 'react';
import './index.css'
import NavBar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Content from '../../components/Content/Content'

const Home = () => {
  const [address, setAddress] = useState();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        setAddress(latitude);
      });
    }
    else {
      console.log("Geolocation is not supported by this browser.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (address){
      localStorage.setItem('address', address);
    }
  }, [address]);

  return (
   <>
      <Sidebar />  
      <Content className="content"/>
      <NavBar />
   </>
  )
}

export default Home

