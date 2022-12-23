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
      <Routes>
        <Route path='/' element={<><DashboardCompoenent /> <div className='main-container'></div> </>} />
        <Route path='/streams' element={<><StreamsCompoenent /> <div className='main-container'></div></> } />
        <Route path='/transactions' element={<><TransactionsCompoenent /> <div className='main-container'></div></> } />
        <Route path='/tokens' element={<><AssetsCompoenent /> <div className='main-container'></div></> } />
        <Route path='/addresses' element={<><AddressesCompoenent /> <div className='main-container'></div></> } />
        <Route path='/balance' element={<><TotalBalanceCompoenent /> <div className='main-container'></div></> } />
      </Routes>
      <div class="footer__copyright" style={{ background: "transaparent" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="footer__copyright__text text-white">
                <p className='py-3'>
                  © 2022 Mobiloitte
                </p>
              </div>
            </div>
            <div class="col-lg-4">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
