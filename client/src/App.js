import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavbarComponents from './Layouts/Navbar';
import AddressesCompoenent from "./Components/Addresses/index";
import DashboardCompoenent from './Components/Dashboard';
import StreamsCompoenent from './Components/Streams';
import TransactionsCompoenent from './Components/Transactions';
import AssetsCompoenent from './Components/Assets';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <NavbarComponents />
      <div className='main-container'></div>
      <Routes>
        <Route path='/' element={<DashboardCompoenent />} />
        <Route path='/streams' element={<StreamsCompoenent />} />
        <Route path='/transactions' element={<TransactionsCompoenent />} />
        <Route path='/assets' element={<AssetsCompoenent />} />
        <Route path='/addresses' element={<AddressesCompoenent />} />
      </Routes>
    </>
  );
}

export default App;
