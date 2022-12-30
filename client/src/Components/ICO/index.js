import { useEffect, useState } from "react";
import {
  getAssets,
  createAssets,
  tokenTransafer,
  getAddresses,
  tokenTransaferBoth,
  getPermissions,
} from "../../Services/api";
import toast from "react-hot-toast";
import $ from "jquery";

const ICOCompoenent = () => {
  const [list, setList] = useState([]);
  const [permission, setPermission] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [status, setStatus] = useState(2);
  const [loader, setLoader] = useState(false);

  const [address, setAddress] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [assetsName, setAssetsName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [smallestUnit, setSmallestUnit] = useState("");

  useEffect(() => {
    getList();
  }, []);

  const clearFields = () => {
    setFromAddress("");
    setToAddress("");
    setAssetsName("");
    setQuantity("");
    setSmallestUnit("");
    setStatus(2);
  };

  const getList = async () => {
    const res = await getAssets();
    const addressResult = await getAddresses();
    const permissions = await getPermissions();
    if (addressResult.status === 200) {
      setPermission(permissions.data.data);
      var array = [];
      if (addressResult.data.data.length > 0) {
        addressResult.data.data.forEach(async (element) => {
          let permissionsList = await filterPermissions(
            element.address,
            permissions.data.data
          );
          if (permissionsList.length > 0) {
            array.push(element);
          }
        });
      }
      setList(res.data.data);
      setAddressList(array);
      setAddress(addressResult.data.data[0].address);
    }
  };

  const changeAddressFormat = (ele) => {
    return ele !== "" && ele !== null && ele !== undefined
      ? ele.substr(0, 4) + "..." + ele.substr(ele.length - 4, ele.length)
      : "-";
  };

  const filterPermissions = async (address, array) => {
    var result = array.filter((ele) => {
      return (
        ele.address === address &&
        (ele.type == "mine" ||
          ele.type == "send" ||
          ele.type == "issue" ||
          ele.type == "receive")
      );
    });
    return result;
  };

  const transferTokenNew = async () => {
    setLoader(true);

    if (!fromAddress || !toAddress || !assetsName || !quantity) {
      toast.error("All fields mendatory.");
      setLoader(false);
      return;
    }

    if (fromAddress === toAddress) {
      toast.error("From Address & To addres must be different");
      setLoader(false);
      return;
    }

    const res = await tokenTransaferBoth(
      fromAddress,
      toAddress,
      assetsName,
      quantity
    );
    if (res.status === 200) {
      setLoader(false);
      getList();
      clearFields();
      toast.success("Token Transfer Successfully.");
    }
  };

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
                <button
                  className="btn btn-primary btn-sm float-sm-right"
                  onClick={() => setStatus(1)}
                >
                  Create New Asset
                </button>
                <button
                  className="btn btn-primary btn-sm float-sm-right mr-2"
                  onClick={() => setStatus(2)}
                >
                  Assets Transfer
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="card transparent-card">
                  <div className="card-body p-2">
                    <table className="table" id="tokenTableDT">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Asset Name</th>
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
                              <td colSpan={6} className="text-center">
                                No assets found.
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

  const createAssetsORTransferTokenUI = () => {
    return (
      <>
        <div className="content-header">
          <div className="container">
            <div className="row mb-5">
              <div className="col-sm-6">
                <h1 className="m-0 text-white">
                  {status === 2 && "Buy Token"}{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="offset-lg-3 col-lg-6">
                <div className="row mb-2">
                  {status === 2 && (
                    <>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="text-white">From Address</label>
                          <>
                            <select
                              class="form-control"
                              aria-label="Default select example"
                              onChange={(e) => {
                                setFromAddress(e.target.value);
                              }}
                              value={fromAddress}
                            >
                              <option disabled="">select</option>
                              {addressList.map((ele) => {
                                return (
                                  <>
                                    <option value={ele.address}>
                                      {ele.address}
                                    </option>
                                  </>
                                );
                              })}
                            </select>
                          </>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="text-white">To Address</label>
                          <>
                            <select
                              class="form-control"
                              aria-label="Default select example"
                              onChange={(e) => {
                                setToAddress(e.target.value);
                              }}
                              value={toAddress}
                            >
                              <option disabled="">select</option>
                              {addressList.map((ele) => {
                                return (
                                  <>
                                    <option value={ele.address}>
                                      {ele.address}
                                    </option>
                                  </>
                                );
                              })}
                            </select>
                          </>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="text-white">Asset Name</label>
                      <>
                        <select
                          class="form-control"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setAssetsName(e.target.value);
                          }}
                          value={assetsName}
                        >
                          <option disabled="">select</option>
                          {list.map((ele) => {
                            return (
                              <>
                                <option value={ele.name}>{ele.name}</option>
                              </>
                            );
                          })}
                        </select>
                      </>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="text-white">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    {status === 2 && (
                      <>
                        <button
                          className="btn btn-primary btn-sm float-sm-right"
                          onClick={() => transferTokenNew()}
                        >
                          {loader === true ? (
                            <>
                              <div
                                className="spinner-border spinner-border-sm"
                                role="status"
                              >
                                <span className="visually-hidden"></span>
                              </div>
                            </>
                          ) : (
                            <>Buy Token</>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>{(status === 1 || status === 2) && createAssetsORTransferTokenUI()}</>
  );
};

export default ICOCompoenent;
// 1ChLoT66BFGP3UASDhdRZFkCV3dqXeeeyMWbjY
// 13NQckpfy1S5VonqBpfrEzBCGihhuWERboAWxc
