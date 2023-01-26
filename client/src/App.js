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
import ViewStreamsCompoenent from './Components/Streams/ViewSteams';
import PublishStreamCompoenent from './Components/Streams/PublishStream';
import ICOCompoenent from './Components/ICO';
import WhiteComponent from './Components/WhitePaper';
import ICODashboardCompoenent from './Components/ICONEW/Dashboard';
import ICOLoginCompoenent from './Components/ICONEW/Login';

function App() {
  
  const location = useLocation();

  return (
    <>
      <Toaster position="top-right" />
      <NavbarComponents />
      {
        (location.pathname === "/home" && <>
          <video className='videoTag main-video' autoPlay loop muted>
            <source src={Bg} type='video/mp4' />
          </video> 
        </> )
      }
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/ico' element={<Navigate to="/ico/dashboard" />} />
        <Route path='/home' element={<><DashboardCompoenent /> </>} />
        <Route path='/node' element={<><NodeCompoenent /> <div className='main-container'></div></> } />
        <Route path='/streams' element={<><StreamsCompoenent /> <div className='main-container'></div></> } />
        <Route path='/view-stream' element={<><ViewStreamsCompoenent /></> } />
        <Route path='/publish-stream' element={<><PublishStreamCompoenent /></> } />
        <Route path='/change-permission' element={<><ChangePermissionCompoenent /> <div className='main-container'></div></> } />
        <Route path='/transactions' element={<><TransactionsCompoenent /> <div className='main-container'></div></> } />
        <Route path='/assets' element={<><AssetsCompoenent /> <div className='main-container'></div></> } />
        <Route path='/addresses' element={<><AddressesCompoenent /> <div className='main-container'></div></> } />
        <Route path='/balance' element={<><TotalBalanceCompoenent /> <div className='main-container'></div></> } />
        <Route path='/token-transfer' element={<><ICOCompoenent /> <div className='main-container'></div></> } />


        <Route path='/ico/white-paper' element={<><WhiteComponent /></> } />
        <Route path='/ico/dashboard' element={<><ICODashboardCompoenent /></> } />
        <Route path='/ico/login' element={<><ICOLoginCompoenent /></> } />
      </Routes>
      <div className="footer__copyright" style={{ background: "transaparent" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="footer__copyright__text text-white">
                <p className='py-3'>
                  © 2023 { location.pathname.toString().search("ico") !== 1 ? 'Multichain Web' : 'Multichain ICO'} - All Rights Reserved
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              
            <div className="footer__copyright__text text-white text-right">
                <p className='py-3'>
                  Designed and Developed by <a href='https://www.mobiloitte.com/' target="_blank">Mobiloitte</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
