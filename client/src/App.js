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
import TotalBalanceCompoenent from './Components/Balance';

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <NavbarComponents />
      <div className='main-container'></div>
      <Routes>
        <Route path='/' element={<DashboardCompoenent />} />
        <Route path='/streams' element={<StreamsCompoenent />} />
        <Route path='/transactions' element={<TransactionsCompoenent />} />
        <Route path='/tokens' element={<AssetsCompoenent />} />
        <Route path='/addresses' element={<AddressesCompoenent />} />
        <Route path='/balance' element={<TotalBalanceCompoenent />} />
      </Routes>
    </>
  );
}

export default App;
