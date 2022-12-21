import { useEffect, useState } from "react";
import { getTransactions } from "../../Services/api";
import { format } from 'date-fns'

const TransactionsCompoenent = () => {

  const [list, setList] = useState({});
 
  useEffect(() => {
    getList();
  }, [])

  const getList = async() => {
    const res = await getTransactions();
    console.log("res: ", res);
    if(res.status === 200){
      setList(res.data.data)
    }
  }

  const changeAddressFormat = (ele) => {
    return ( (ele !== "" && ele !== null && ele !== undefined) ? ele.substr(0, 4) + "..." + ele.substr(ele.length - 4, ele.length) : "-")
  }

    return (
      <>
        <div className="content-header">
          <div className="container">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-white"> Transactions List</h1>
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
                          <th>From address</th>
                          <th>To address</th>
                          <th>Block Hash</th>
                          <th>Transaction Id</th>
                          {/* <th>Date & Time</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          list.length > 0 ?
                          list.map((ele, index) => {
                            return(<>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{changeAddressFormat(ele.myaddresses[0])}</td>
                                <td>{changeAddressFormat(ele.addresses[0])}</td>
                                <td>{changeAddressFormat(ele.blockhash)}</td>
                                <td>{changeAddressFormat(ele.txid)}</td>
                                {/* <td>{ele.time} {format(new Date(ele.time), 'dd/MM/yyyy')}</td> */}
                              </tr>
                            </>)
                          })
                          :
                          <><tr><td colSpan={5} className="text-center">No transactions found.</td></tr></>
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
  
  export default TransactionsCompoenent;
  