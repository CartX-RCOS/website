import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Database from './pages/Database'
import Error from './pages/Error'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="database" element={<Database />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
