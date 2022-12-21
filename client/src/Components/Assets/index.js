import { useEffect, useState } from "react";
import { getAssets, createAssets } from "../../Services/api";
import toast from 'react-hot-toast';

const AssetsCompoenent = () => {

  const [list, setList] = useState([]);
  const [status, setStatus] = useState(0);
  const [loader, setLoader] = useState(false);

  const [address, setAddress] = useState("");
  const [assetsName, setAssetsName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [smallestUnit, setSmallestUnit] = useState("");

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await getAssets();
    console.log("res: ", res);
    if (res.status === 200) {
      setList(res.data.data);
    }
  };

  const changeAddressFormat = (ele) => {
    return ele !== "" && ele !== null && ele !== undefined
      ? ele.substr(0, 4) + "..." + ele.substr(ele.length - 4, ele.length)
      : "-";
  };

  const createAssetSNew = async () => {
    setLoader(true);

    if(!address || !assetsName || !quantity || !smallestUnit){
      toast.error("All fields mendatory.")
      setLoader(false);
    }

    const res = await createAssets(address, assetsName, quantity, smallestUnit);
    if(res.status === 200){
      setLoader(false);
      getList();
      setStatus(0)
      toast.success("New Assets Genarate Successfully.")
    }
  }

  const listAssetsUI = () => {
    return (
      <>
        <div className="content-header">
          <div className="container">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-white"> Assets List</h1>
              </div>
              <div className="col-sm-6">
                <button class="btn btn-primary btn-sm float-sm-right" onClick={() => setStatus(1)}>
                  Create New Assets
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
                          <th style={{ width: "10px" }}>#</th>
                          <th>Assets Name</th>
                          <th>Issue Trnsaction ID</th>
                          <th>Units</th>
                          <th>Quantity</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.length > 0 ? (
                          list.map((ele, index) => {
                            return (
                              <>
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{ele.name}</td>
                                  <td>{changeAddressFormat(ele.issuetxid)}</td>
                                  <td>{ele.units}</td>
                                  <td>{ele.issueqty}</td>
                                  <td>
                                    {ele.fungible === true
                                      ? "Fungible Token"
                                      : "Non Fungible Token"}
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        ) : (
                          <>
                            <tr>
                              <td colSpan={5} className="text-center">
                                No transactions found.
                              </td>
                            </tr>
                          </>
                        )}
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

  const createAssetsUI = () => {
    return (
      <>
        <div className="content-header">
          <div className="container">
            <div className="row mb-5">
              <div className="col-sm-6">
                <h1 className="m-0 text-white"> Create Assets </h1>
              </div>
              <div className="col-sm-6">
                <button class="btn btn-warning btn-sm float-sm-right" onClick={() => setStatus(0)}>
                  Back
                </button>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6">
                <div class="form-group">
                  <label className="text-white">Address</label>
                  <input type="text" class="form-control" placeholder="Enter address" onChange={(e) => { setAddress(e.target.value) }} />
                </div>
              </div>
              <div className="col-sm-6">
                <div class="form-group">
                  <label className="text-white">Assets Name</label>
                  <input type="text" class="form-control" placeholder="Enter assets name, example : (MTK)" onChange={(e) => { setAssetsName(e.target.value) }} />
                </div>
              </div>
              <div className="col-sm-6">
                <div class="form-group">
                  <label className="text-white">Quantity</label>
                  <input type="number" class="form-control" placeholder="Enter quantity" onChange={(e) => { setQuantity(e.target.value) }} />
                </div>
              </div>
              <div className="col-sm-6">
                <div class="form-group">
                  <label className="text-white">Smallest Unit</label>
                  <input type="number" class="form-control" placeholder="Enter smallest unit" onChange={(e) => { setSmallestUnit(e.target.value) }} />
                </div>
              </div>
              <div className="col-sm-12">
                <button class="btn btn-primary btn-sm float-sm-right" onClick={() => createAssetSNew()}>
                  {
                    loader === true ? 
                    <>
                      <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden"></span>
                      </div>
                    </>
                    :
                    <>
                      Create Assets
                    </>
                  } 
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {status === 0 && listAssetsUI()}
      {status === 1 && createAssetsUI()}
    </>
  );
};

export default AssetsCompoenent;
