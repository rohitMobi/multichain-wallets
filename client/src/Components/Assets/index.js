import { useEffect, useState } from "react";
import { getAssets, createAssets, tokenTransafer } from "../../Services/api";
import toast from 'react-hot-toast';
import $ from "jquery";

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

  const clearFields = () => {
    setAddress("");
    setAssetsName("");
    setQuantity("");
    setSmallestUnit("");
    setStatus(0)
  }

  const dataTablesApply = () => {
    if (!$.fn.DataTable.isDataTable("#tokenTableDT")) {
      setTimeout(function () {
        $("#tokenTableDT").dataTable({
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

  const getList = async () => {
    const res = await getAssets();
    console.log("res: ", res);
    if (res.status === 200) {
      setList(res.data.data);
      dataTablesApply();
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
      $("#tokenTableDT").DataTable().destroy()
      getList();
      clearFields();
      toast.success("New Token Genarate Successfully.")
    }
  }

  const transferTokenNew = async () => {
    setLoader(true);

    if(!address || !assetsName || !quantity){
      toast.error("All fields mendatory.")
      setLoader(false);
    }

    const res = await tokenTransafer(address, assetsName, quantity);
    if(res.status === 200){
      setLoader(false);
      $("#tokenTableDT").DataTable().destroy()
      getList();
      clearFields();
      toast.success("Token Transfer Successfully.")
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
                <button className="btn btn-primary btn-sm float-sm-right" onClick={() => setStatus(1)}>
                  Create New Asset
                </button>
                <button className="btn btn-primary btn-sm float-sm-right mr-2" onClick={() => setStatus(2)}>
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
                <h1 className="m-0 text-white"> { status === 1 && "Create token" } { status === 2 && "Token Transfer" } </h1>
              </div>
              <div className="col-sm-6">
                <button className="btn btn-warning btn-sm float-sm-right" onClick={() => clearFields()}>
                  Back
                </button>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="text-white">Address</label>
                  <input type="text" className="form-control" placeholder="Enter address" onChange={(e) => { setAddress(e.target.value) }} />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="text-white">Asset Name</label>
                  <input type="text" className="form-control" placeholder="Enter ssset name, example : (MTK)" onChange={(e) => { setAssetsName(e.target.value) }} />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="text-white">Quantity</label>
                  <input type="number" className="form-control" placeholder="Enter quantity" onChange={(e) => { setQuantity(e.target.value) }} />
                </div>
              </div>
              {
                status === 1 && 
                <>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="text-white">Smallest Unit</label>
                      <input type="number" className="form-control" placeholder="Enter smallest unit" onChange={(e) => { setSmallestUnit(e.target.value) }} />
                    </div>
                  </div>
                </>
              }
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
                          Create Asset
                        </>
                      } 
                    </button>
                  </>
                }
                {
                  status === 2 && <>
                    <button className="btn btn-primary btn-sm float-sm-right" onClick={() => transferTokenNew()}>
                      {
                        loader === true ? 
                        <>
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden"></span>
                          </div>
                        </>
                        :
                        <>
                          Asset Transfer
                        </>
                      } 
                    </button>
                  </>
                }
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
      {(status === 1 || status === 2) && createAssetsORTransferTokenUI()}
    </>
  );
};

export default AssetsCompoenent;
