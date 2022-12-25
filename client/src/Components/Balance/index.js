import { useEffect, useState } from "react";
import { gettotalbalances } from "../../Services/api";
import toast from 'react-hot-toast';

const TotalBalanceCompoenent = () => {

  const [list, setList] = useState([])

  useEffect(() => {
    getList();
  }, [])

  const getList = async () => {
    const res = await gettotalbalances();
    if (res.status === 200) {
      setList(res.data.data)
    }
  }

  return (
    <>
      <div className="content-header">
        <div className="container">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-white"> Total Balance List </h1>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="row">
                {
                  list.length > 0 ?
                    list.map((ele, index) => {
                      return (<>
                        <div className="col-lg-3 col-6">
                          <div className="small-box bg-transparent-blue">
                            <div className="right-gold"></div>
                            <div className="inner">
                              <h3>{ele.qty}</h3>
                              <p>{ele.name}</p>
                            </div>
                            <div className="icon">
                              <i className="ion ion-bag"></i>
                            </div>
                          </div>
                        </div>
                      </>)
                    }) :
                    <><div className="col-lg-12 text-center text-white">No balance found</div></>
                }
              </div>
              {/* <div className="card transparent-card">
                <div className="card-body p-0">
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: "10px" }}>#</th>
                        <th>Token</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        list.length > 0 ?
                          list.map((ele, index) => {
                            return (<>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.qty}</td>
                              </tr>
                            </>)
                          }) :
                          <><tr><td colSpan={3} className="text-center">No balance found.</td></tr></>
                      }
                    </tbody>
                  </table>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalBalanceCompoenent;
