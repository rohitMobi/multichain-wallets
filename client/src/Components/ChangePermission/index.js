import { useEffect, useState } from "react";
import { changePermissionAddress, getAddresses, getPermissions } from "../../Services/api"
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const ChangePermissionCompoenent = () => {

  const navigate = useNavigate()

  const checkboxArray = [
    { name: 'mine', check: false },
    { name: 'connect', check: false },
    { name: 'send', check: false },
    { name: 'receive', check: false },
    { name: 'create', check: false },
    { name: 'issue', check: false },
    { name: 'activate', check: false },
    { name: 'admin', check: false }
  ];

  const [addressList, setAddressList] = useState([]);
  const [status, setStatus] = useState(0);
  const [loader, setLoader] = useState(false);

  const [address, setAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [operation, setOperation] = useState("");
  const [permisssion, setPermisssion] = useState("");

  useEffect(() => {
    getList();
  }, []);

  const clearFields = () => {
    setAddress("");
    setOperation("");
    setPermisssion("");
  }

  const getList = async () => {
    const queryParams = new URLSearchParams(window.location.search)
    const address = queryParams.get("address")
    setToAddress(address);
    const addressResult = await getAddresses();
    const permissions = await getPermissions();
    if (addressResult.status === 200 && permissions.status === 200) {
      setAddressList(addressResult.data.data);
      const permissionList = permissions.data.data.filter((ele) => { return ele.address === address})
      console.log("permissionList: ", permissionList);
      setPermisssion(permissionList);
      setAddress(addressResult.data.data[0].address)
    }
  };

  const createAssetSNew = async () => {
    setLoader(true);
    var permissionList = document.getElementById("permissionList").value;

    if (!toAddress || !operation || !permissionList) {
      toast.error("All fields mendatory.")
      setLoader(false);
      return;
    }

    const res = await changePermissionAddress(operation, toAddress, permissionList);
    if(res.status === 200){
      setLoader(false);
      getList();
      clearFields();
      toast.success("Change Permission Suucessfully.")
      navigate("/addresses")
    }
  }

  const setValuePermissions = async(_ind) => {
    console.log("index: ", _ind);
    checkboxArray.forEach((item, index) => {
      if(index === _ind){
        item.check = !item.check;
      }
    })
    checkValuePermissions()
  }

  const checkValuePermissions = async() => {
    var permissions = "";
    checkboxArray.forEach((item) => {
      if(item.check){
        permissions = permissions + item.name +",";
      }
    })
    if(permissions.length > 0){
      permissions = permissions.substr(0, permissions.length - 1)
      document.getElementById("permissionList").value = permissions;
    }else{
      document.getElementById("permissionList").value = permissions;
    }
  }

  const filterType = (type) => {
    console.log("permisssion: ", permisssion)
    if(permisssion){
      console.log("permisssion.length: ", permisssion.length);
      console.log("permisssion.length: ", permisssion.length);
      const filter = permisssion.filter(permiss => { return permiss.type === type})
      if(operation == "grant" && (filter.length == 0 || permisssion.length == 0)){
        console.log("True");
        return true;
      }else if(operation == "revoke" && filter.length > 0){
        console.log("True");
        return true;
      }else{
        console.log("False");
        return false;
      }
    }
  }

  const createAssetsORTransferTokenUI = () => {
    return (
      <>
        <div className="content-header">
          <div className="container">
            <div className="row mb-5">
              <div className="col-sm-6">
                <h1 className="m-0 text-white"> Change Permission </h1>
              </div>
              <div className="col-sm-6">
                  <Link to="/addresses">
                    <button className="btn btn-outline-warning btn-sm float-sm-right">
                        Back
                    </button>
                  </Link>
              </div>
            </div>
            <div className="row mb-2">
              <div className="offset-lg-3 col-lg-6">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="text-white">From Address</label>
                      <input type="text" className="form-control" placeholder="Enter address" value={address} disabled="true" />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="text-white">To Address</label>
                      <input type="text" className="form-control" placeholder="Enter address" value={toAddress} disabled="true" />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="text-white">Operation</label>
                      <div className="row ml-2">
                        <div className="custom-control custom-radio form-check-inline">
                          <input className="custom-control-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="grant" onClick={() => { setOperation('grant') }} />
                          <label className="custom-control-label text-white" for="inlineRadio1">grant</label>
                        </div>
                        {
                          permisssion.length > 0 &&
                          <>
                            <div className="custom-control custom-radio form-check-inline">
                              <input className="custom-control-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="revoke"  onClick={() => { setOperation('revoke') }} />
                              <label className="custom-control-label  text-white" for="inlineRadio2">revoke</label>
                            </div>
                          </>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="text-white">Permissions</label>
                      <input type="text" className="form-control" placeholder="Permission" id="permissionList" disabled="true" />
                    </div>
                    <div className="form-group">
                      <div className="row ml-2">
                        {
                          checkboxArray.map((checkbox, index) => {
                            return(
                              <>
                                {
                                  (filterType(checkbox.name) == true) && 
                                  <>
                                    <div className="custom-control custom-checkbox form-check-inline">
                                      <input className="custom-control-input" type="checkbox" id={`inlineCheckbox${index+1}`} value={checkbox.check} onChange={() => { setValuePermissions(index) }} />
                                      <label className="custom-control-label text-white" for={`inlineCheckbox${index+1}`}>{checkbox.name}</label>
                                    </div>
                                  </>
                                }
                                {
                                  console.log("status: ", filterType(checkbox.name))
                                }
                                {/* <div className="custom-control custom-checkbox form-check-inline">
                                  <input className="custom-control-input" type="checkbox" id={`inlineCheckbox${index+1}`} value={checkbox.check} onChange={() => { setValuePermissions(index) }} />
                                  <label className="custom-control-label text-white" for={`inlineCheckbox${index+1}`}>{checkbox.name}</label>
                                </div> */}
                              </>
                            )
                          })
                        }
                      </div>  
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <button className="btn btn-primary btn-sm float-sm-right" onClick={() => createAssetSNew()}>
                      {
                        loader === true ?
                          <>
                            <div className="spinner-border spinner-border-sm" role="status">
                              <span className="visually-hidden"></span>
                            </div>
                          </>
                          :
                          <>
                            Change Permission
                          </>
                      }
                    </button>
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
    <>
      {createAssetsORTransferTokenUI()}
    </>
  );
};

export default ChangePermissionCompoenent;
