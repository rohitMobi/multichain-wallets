import { Link } from "react-router-dom";

const NavbarComponents = () => {
    return (
      <>
        <div className="wrapper">
          <nav className="main-header navbar navbar-expand-md navbar-dark navbar-dark" style={{marginLeft: "unset"}}>
            <div className="container">
              <a href="" className="navbar-brand">
                <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/17050.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3 mr-2" style={{opacity: "0.8", height: "1.8rem"}} />
                <span className="brand-text font-weight-light">Multichain</span>
              </a>
  
              <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      Transaction
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      Streams
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      Assets
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/addresses" className="nav-link">
                      Addresses
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
  