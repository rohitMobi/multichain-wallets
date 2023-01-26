import { useEffect, useState } from "react";
import { publishStreamItems, getAddresses } from "../../Services/api"
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const PublishStreamCompoenent = () => {

  const navigate = useNavigate()

  const [addressList, setAddressList] = useState([]);
  const [loader, setLoader] = useState(false);

  const [address, setAddress] = useState("");
  const [stream, setStream] = useState("");
  const [key, setKey] = useState("");
  const [objKey, setObjKey] = useState("");
  const [objValue, setObjValue] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    getList();
  }, []);

  const clearFields = () => {
    setAddress("");
    setKey("");
    setValue("");
    setObjKey("");
    setObjValue("");
  }

  const isValidKeys = (text) => {
    if(text.length > 20){
      setKey(text.substr(0, 20))
    }
  }

  const isValidObjKey = (text) => {
    if(text.length > 20){
      setObjKey(text.substr(0, 20))
    }
  }

  const isValidObjValue = (text) => {
    if(text.length > 20){
      setObjValue(text.substr(0, 20))
    }
  }

  const getList = async () => {
    const queryParams = new URLSearchParams(window.location.search)
    const stream = queryParams.get("name")
    setStream(stream);
    const addressResult = await getAddresses();
    if (addressResult.status === 200) {
      setAddressList(addressResult.data.data);
      setAddress(addressResult.data.data[0].address)
    }
  };

  const publistStream = async () => {
    
    setLoader(true);

    if (!stream || !key || !objKey || !objValue) {
      toast.error("All fields mendatory.")
      setLoader(false);
      return;
    }

    const valueObj = JSON.parse(`{"${objKey}":"${objValue}"}`);

    const res = await publishStreamItems(stream, key, valueObj);
    console.log("res: ", res)
    if(res.status === 200){
      setLoader(false);
      getList();
      clearFields();
      toast.success("Publish Stream Suucessfully.")
      navigate("/streams")
    }
  }

  const createAssetsORTransferTokenUI = () => {
    return (
      <>
        <div className="content-header">
          <div className="container">
            <div className="row mb-5">
              <div className="col-sm-6">
                <h1 className="m-0 text-white"> Publish to Stream </h1>
              </div>
              <div className="col-sm-6">
                  <Link to="/streams">
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
                      <label className="text-white">Stream</label>
                      <input type="text" className="form-control" placeholder="Enter Stream" value={stream} disabled="true" />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="text-white">Operational Keys</label>
                      <input type="text" className="form-control" placeholder="Enter Operational Keys" onKeyUp={(e) => { isValidKeys(e.target.value) }} value={key} onChange={(e) => setKey(e.target.value)} />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="text-white">Data</label>
                      <div className="row">
                        <div className="col-sm-4"><input type="text" className="form-control" placeholder="Key" onKeyUp={(e) => { isValidObjKey(e.target.value) }} value={objKey} onChange={(e) => setObjKey(e.target.value)} /></div>
                        <div className="col-sm-4"><input type="text" className="form-control" placeholder="Value" onKeyUp={(e) => { isValidObjValue(e.target.value) }} value={objValue} onChange={(e) => setObjValue(e.target.value)} /></div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-sm-12">
                    <div className="form-group">
                      <label className="text-white">JSON Data</label>
                      <textarea className="form-control" placeholder="JSON data" rows="3" onChange={(e) => setValue(e.target.value)}></textarea>
                    </div>
                  </div> */}
                  <div className="col-sm-12">
                    <button className="btn btn-primary btn-sm float-sm-right" onClick={() => publistStream()}>
                      {
                        loader === true ?
                          <>
                            <div className="spinner-border spinner-border-sm" role="status">
                              <span className="visually-hidden"></span>
                            </div>
                          </>
                          :
                          <>
                            Publish Stream
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

export default PublishStreamCompoenent;
