import { useEffect, useState } from "react";
import { listStreamItems } from "../../Services/api";
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns'

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

  const convertDate = (long) => {
    var date = new Date(Math.floor(long * 1000))
    return date;
  }

  const isEmpty = (ele) => {
    return (ele != null && ele != undefined && ele != "")
  }

  return (
    <>
      <div className="content-header">
        <div className="container">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-white"> Stream Items List</h1>
            </div>
              <div className="col-sm-6">
                  <Link to="/streams">
                    <button className="btn btn-outline-warning btn-sm float-sm-right">
                        Back
                    </button>
                  </Link>
              </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              {
                list.length > 0 ?
                <>
                  <div className="row">
                    {
                      list.map((ele) => {
                        return(
                        <>
                          <div className="offset-lg-2 col-lg-8">
                            <div className="card transparent-card">
                              <div className="card-body p-2">
                                <table className="table">
                                  <tbody>
                                    <tr>
                                      <th>Publishers</th>
                                      <td>{ele.publishers[0]}</td>
                                    </tr>
                                    <tr>
                                      <th>Key(s)</th>
                                      <td>{ele.keys[0]}</td>
                                    </tr>
                                    <tr>
                                      <th>JSON data</th>
                                      <td><code>{JSON.stringify(ele.data.json)}</code></td>
                                    </tr>
                                    <tr>
                                      <th>Added</th>
                                      <td>{ isEmpty(ele.blocktime) ? format(convertDate(ele.blocktime), 'dd MMMM, yyyy hh:mm a') : "-"}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>  
                        </>)
                      })
                    }
                  </div>
                </>
                :
                <>
                  <div className="card transparent-card">
                    <div className="card-body p-2">
                      <h4 className="text-center">No Items Found.</h4>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ViewStreamsCompoenent;
