import { useEffect, useState } from "react";
import { listStreamItems } from "../../Services/api";
import { Link, useNavigate } from "react-router-dom";

const ViewStreamsCompoenent = () => {
    
  const navigate = useNavigate()

  const [list, setList] = useState({});

  useEffect(() => {
    getList();
  }, [])

  const getList = async () => {
    const queryParams = new URLSearchParams(window.location.search)
    const name = queryParams.get("name")
    console.log("name: ", name);
    const res = await listStreamItems(name);
    if (res.status === 200) {
      setList(res.data.data);
      console.log("list: ", res)
    }
  }

  const changeAddressFormat = (ele) => {
    return ((ele !== "" && ele !== null && ele !== undefined) ? ele.substr(0, 4) + "..." + ele.substr(ele.length - 4, ele.length) : "-")
  }

  return (
    <>
      <div className="content-header">
        <div className="container">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-white"> Streams List</h1>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="card transparent-card">
                <div className="card-body p-2">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ViewStreamsCompoenent;
