import { useEffect, useState } from "react";
import { getAddresses, createAddresses } from "../../Services/api";
import toast from 'react-hot-toast';

const AddressesCompoenent = () => {

  const [list, setList] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    getList();
  }, [])

  const getList = async() => {
    const res = await getAddresses();
    if(res.status === 200){
      setList(res.data.data)
    }
  }

  const generateAddress = async() => {
    setLoader(true);
    const res = await createAddresses();
    if(res.status === 200){
      setLoader(false);
      getList();
      toast.success("New Address Genarate Successfully.")
    }
  }

  return (
    <>
      <div className="content-header">
        <div className="container">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-white"> Addresses List</h1>
            </div>
            <div className="col-sm-6">
              <button class="btn btn-primary btn-sm float-sm-right" onClick={() => generateAddress()}>
                {
                  loader === true ? 
                  <>
                    <div class="spinner-border spinner-border-sm" role="status">
                      <span class="visually-hidden"></span>
                    </div>
                  </>
                  :
                  <>
                    Generate New Address
                  </>
                } 
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="card transparent-card">
                <div className="card-body p-0">
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{width: "10px"}}>#</th>
                        <th>Addresses</th>
                        <th>Mine</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        list.length > 0 ?
                        list.map((ele, index) => {
                          return(<>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{ele.address}</td>
                              <td>{ele.ismine === true ? <><span class="badge badge-success">mine</span></> : "-"}</td>
                            </tr>
                          </>)
                        }) :
                        <><tr><td colSpan={3} className="text-center">No addresses found.</td></tr></>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressesCompoenent;
