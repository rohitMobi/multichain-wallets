import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listAtreams, createStream, subscribeStream } from "../../Services/api";
import toast from 'react-hot-toast';
import $ from "jquery";

const StreamsCompoenent = () => {

  const [list, setList] = useState({});
  const [name, setName] = useState("");
  const [status, setStatus] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getList();
  }, [])

  const clearFields = () => {
    setName("");
    setStatus(0)
  }

  const getList = async () => {
    const res = await listAtreams();
    console.log("res: ", res);
    if (res.status === 200) {
      setList(res.data.data);
      dataTablesApply();
    }
  }

  const dataTablesApply = () => {
    if (!$.fn.DataTable.isDataTable("#streamsTableDT")) {
      setTimeout(function () {
        $("#streamsTableDT").dataTable({
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
    return ((ele !== "" && ele !== null && ele !== undefined) ? ele.substr(0, 4) + "..." + ele.substr(ele.length - 4, ele.length) : "-")
  }



  const createAssetSNew = async () => {
    setLoader(true);

    if (!name) {
      toast.error("All fields mendatory.")
      setLoader(false);
    }

    const res = await createStream(name);
    if (res.status === 200) {
      setLoader(false);
      $("#streamsTableDT").DataTable().destroy()
      getList();
      clearFields();
      toast.success("New Stream Genarate Successfully.")
    }
  }
  
  const subscribeStreamsAction = async (name) => {
    if (!name) {
      toast.error("All fields mendatory.")
      setLoader(false);
    }

    const res = await subscribeStream(name);
    if (res.status === 200) {
      $("#streamsTableDT").DataTable().destroy()
      getList();
      clearFields();
      toast.success("Subscribe Stream Successfully.")
    }
  }

  const getStreamList = () => {
    return (
      <>
        <div className="content-header">
          <div className="container">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-white"> Streams List</h1>
              </div>
              <div className="col-sm-6">
                <button className="btn btn-primary btn-sm float-sm-right" onClick={() => setStatus(1)}>
                  Create New Stream
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="card transparent-card">
                  <div className="card-body p-2">

                    <table className="table" id="streamsTableDT">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Name</th>
                          <th>Create Txid</th>
                          <th>Subscribe Status</th>
                          <th>Action</th>
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
                                  <td>{changeAddressFormat(ele.createtxid)}</td>
                                  <td>{ele.subscribed === true ? <span className="badge badge-light mr-1">Subscribed</span> : 
                                    <>Not Subscribed - <button className="btn btn-sm btn-primary" onClick={() => subscribeStreamsAction(ele.name)}>Click to subscribed</button></>
                                  }</td>
                                    <td>
                                      <Link to={`/view-stream?name=${ele.name}`}><button className="btn btn-sm btn-primary">view</button></Link>
                                    </td>
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
    )
  }

  const createStreamSection = () => {
    return (
      <>
        <div className="content-header">
          <div className="container">
            <div className="row mb-5">
              <div className="col-sm-6">
                <h1 className="m-0 text-white">Create Stream </h1>
              </div>
              <div className="col-sm-6">
                <button className="btn btn-warning btn-sm float-sm-right" onClick={() => clearFields()}>
                  Back
                </button>
              </div>
            </div>
            <div className="row mb-2">
              <div className="offset-lg-3 col-lg-6">
                <div className="row">

                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="text-white">Stream Name</label>
                      <input type="text" className="form-control" placeholder="Enter Stream Name" onChange={(e) => { setName(e.target.value) }} />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    {
                      status === 1 && <>
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
                                Create Stream
                              </>
                          }
                        </button>
                      </>
                    }
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
      {status === 0 && getStreamList()}
      {status === 1 && createStreamSection()}
    </>
  );
};

export default StreamsCompoenent;
