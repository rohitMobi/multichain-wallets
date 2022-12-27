import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarComponents = () => {
    const location = useLocation();

    useEffect(() => {
      console.log('Location changed');
      console.log(location)
    }, [location])

    return (
      <>
        <div className="wrapper">
          <nav className="main-header navbar navbar-expand-md navbar-dark navbar-dark border-0 p-3" style={{marginLeft: "unset", background: "transparent"}}>
            <div className="container">
              <Link to="/home" className="navbar-brand">
                <img src="https://avatars.githubusercontent.com/u/15611443?s=280&v=4" alt="AdminLTE Logo" className="brand-image img-circle elevation-3 mr-2" style={{opacity: "0.8", height: "1.8rem"}} />
                <span className="brand-text font-weight-light">Multichain</span>
              </Link>
  
              <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/node" className={ window.location.pathname === "/node" ? "nav-link link-active" : "nav-link"}>
                      Node
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/addresses" className={ window.location.pathname === "/addresses" ? "nav-link link-active" : "nav-link"}>
                      Addresses
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/assets" className={ window.location.pathname === "/assets" ? "nav-link link-active" : "nav-link"}>
                      Assets
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/balance" className={ window.location.pathname === "/balance" ? "nav-link link-active" : "nav-link"}>
                      Balance
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/streams" className={ window.location.pathname === "/streams" ? "nav-link link-active" : "nav-link"}>
                      Streams
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/transactions" className={ window.location.pathname === "/transactions" ? "nav-link link-active" : "nav-link"}>
                      Transactions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  };
  
  export default NavbarComponents;
  