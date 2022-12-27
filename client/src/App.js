import logo from './logo.svg';
import Bitcoin from "./Assets/bitcoin.mp4";
import Bg from "./Assets/bg.mp4";
import './App.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import NavbarComponents from './Layouts/Navbar';
import AddressesCompoenent from "./Components/Addresses/index";
import DashboardCompoenent from './Components/Dashboard';
import StreamsCompoenent from './Components/Streams';
import TransactionsCompoenent from './Components/Transactions';
import AssetsCompoenent from './Components/Assets';
import { Toaster } from 'react-hot-toast';
import TotalBalanceCompoenent from './Components/Balance';
import NodeCompoenent from './Components/Node';
import ChangePermissionCompoenent from './Components/ChangePermission';

function App() {
  
  const location = useLocation();

  return (
    <>
      <Toaster position="bottom-center" />
      <NavbarComponents />
      {
        (location.pathname === "/home" && <>
          <video className='videoTag main-video' autoPlay loop muted>
            <source src={Bg} type='video/mp4' />
          </video> 
        </> )
      }
      <Routes>
        <Route path='/home' element={<><DashboardCompoenent /> </>} />
        <Route path='/node' element={<><NodeCompoenent /> <div className='main-container'></div></> } />
        <Route path='/streams' element={<><StreamsCompoenent /> <div className='main-container'></div></> } />
        <Route path='/change-permission' element={<><ChangePermissionCompoenent /> <div className='main-container'></div></> } />
        <Route path='/transactions' element={<><TransactionsCompoenent /> <div className='main-container'></div></> } />
        <Route path='/assets' element={<><AssetsCompoenent /> <div className='main-container'></div></> } />
        <Route path='/addresses' element={<><AddressesCompoenent /> <div className='main-container'></div></> } />
        <Route path='/balance' element={<><TotalBalanceCompoenent /> <div className='main-container'></div></> } />
      </Routes>
      <div className="footer__copyright" style={{ background: "transaparent" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="footer__copyright__text text-white">
                <p className='py-3'>
                  © 2022 Mobiloitte
                </p>
              </div>
            </div>
            <div className="col-lg-4">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
