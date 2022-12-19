import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavbarComponents from './Layouts/Navbar';
import AddressesCompoenent from "./Components/Addresses/index";

function App() {
  return (
    <>
      <NavbarComponents />
      {/* <img src="https://images.ctfassets.net/55dvf9f8kaqk/22S3uuWu9rCe08or8rP4yQ/752fdbd8510d68533801e0f2d5e090df/multichain-header.jfif" className='imgBlur' /> */}
      
      {/* <img src="https://blockzeit.com/wp-content/uploads/2022/09/image-60.png" className='imgBlur' /> */}
      <div className='main-container'>
      </div>
      <Routes>
        <Route path='/addresses' element={<AddressesCompoenent />} />
      </Routes>
    </>
  );
}

export default App;
