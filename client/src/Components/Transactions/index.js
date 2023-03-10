import { useEffect, useState } from "react";
import { getTransactions } from "../../Services/api";
import { format } from 'date-fns'
import toast from 'react-hot-toast';
import $ from "jquery";

const TransactionsCompoenent = () => {

  const [list, setList] = useState({});
 
  useEffect(() => {
    getList();
  }, [])

  const getList = async() => {
    const res = await getTransactions();
    console.log("res: ", res);
    if(res.status === 200){
      var arr = res.data.data.sort((a, b) => { return (Number(b.time) - Number(a.time)) })
      console.log("arr: ", arr);
      setList(res.data.data);
      dataTablesApply();
    }
  }

  const dataTablesApply = () => {
    if (!$.fn.DataTable.isDataTable("#transactionTableDT")) {
      setTimeout(function () {
        $("#transactionTableDT").dataTable({
          "bDestroy": true,
          pagingType: "full_numbers",
          pageLength: 10,
          processing: true,
          dom: "Bfrtip",
          select: {
            style: "single",
          },

          buttons: [
            // {
            //   extend: "pageLength",
            //   className: "btn btn-sm btn-secondary bg-secondary",
            // },
            // {
            //   extend: "csv",
            //   className: "btn btn-sm btn-success bg-success",
            // },
            // {
            //   extend: "print",
            //   customize: function (win) {
            //     $(win.document.body).css("font-size", "10pt");
            //     $(win.document.body)
            //       .find("table")
            //       .addClass("compact")
            //       .css("font-size", "inherit");
            //   },
            //   className: "btn btn-sm btn-danger bg-danger",
            // },
          ],

          fnRowCallback: function (
            nRow,
            aData,
            iDisplayIndex,
            iDisplayIndexFull
          ) {
            var index = iDisplayIndexFull + 1;
            $("td:first", nRow).html(index);
            return nRow;
          },

          lengthMenu: [
            [10, 20, 30, 50, -1],
            [10, 20, 30, 50, "All"],
          ],
          columnDefs: [
            {
              targets: 0,
              render: function (data, type, row, meta) {
                return type === "export" ? meta.row + 1 : data;
              },
            },
          ],
        });
      }, 500);
    }
  }

  const changeAddressFormat = (ele) => {
    // return ele;
    return ( (ele !== "" && ele !== null && ele !== undefined) ? ele.substr(0, 4) + "..." + ele.substr(ele.length - 4, ele.length) : "-")
  }

  const convertDate = (long) => {
    var date = new Date(Math.floor(long * 1000))
    return date;
  }

  const copyPaste = (address, text) => {
    navigator.clipboard.writeText(address)
    toast.success(`Copy ${text} ${changeAddressFormat(address)}`);
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
                  <div className="card-body p-2">
                    <table className="table" id="transactionTableDT">
                      <thead>
                        <tr>
                          <th style={{width: "10px"}}>#</th>
                          <th>Addresses</th>
                          <th>Transaction Type</th>
                          <th>Block Hash</th>
                          <th>Transaction Id</th>
                          <th style={{width: "20%"}}>Date & Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          list.length > 0 ?
                          list.map((ele, index) => {
                            return(<>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{changeAddressFormat(ele.myaddresses[0])} 
                                  <><i className="fa fa-clone float-right mr-5 text-warning" onClick={() => copyPaste(changeAddressFormat(ele.myaddresses[0]), "Wallet Address")} style={{cursor: "pointer"}}></i></>
                                </td>
                                <td>
                                  {
                                    ele.permissions.length > 0 ? <span className="badge badge-pill bg-info">Change Permissions</span> :
                                      ele.balance.assets.length > 0 && ele.issue ? <span className="badge badge-pill bg-purple">Create Assets</span> :
                                        ele.create ? <span className="badge badge-pill bg-pink">Create Stream</span> :
                                          ele.myaddresses.length == 2 ? <span className="badge badge-pill bg-indigo">Token Transfer</span> :
                                            ele.items.length > 0 ? <span className="badge badge-pill bg-maroon">Write data on Stream</span> : <span className="badge badge-pill bg-primary">Normal Transaction</span>
                                  }
                                </td>
                                <td>{changeAddressFormat(ele.blockhash)}</td>
                                <td>{changeAddressFormat(ele.txid)} 
                                  <><i className="fa fa-clone float-right mr-5 text-warning" onClick={() => copyPaste(changeAddressFormat(ele.txid), "Transaction Id")} style={{cursor: "pointer"}}></i></>
                                </td>
                                <td>{format(convertDate(ele.time), 'dd MMM, yyyy hh:mm a')}</td>
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
  