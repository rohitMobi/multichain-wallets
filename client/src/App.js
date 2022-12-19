import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavbarComponents from './Layouts/Navbar';
import AddressesCompoenent from "./Components/Addresses/index";

function App() {
  return (
    <>
      <NavbarComponents />
      <Routes>
        <Route path='/addresses' element={<AddressesCompoenent />} />
      </Routes>
    </>
  );
}

export default App;
