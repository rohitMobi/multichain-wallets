import { useEffect, useState } from "react";
import { getAddresses, createAddresses } from "../../Services/api";
import toast from 'react-hot-toast';
import $ from "jquery";

const AddressesCompoenent = () => {

  const [list, setList] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    getList();
  }, [])

  const getList = async() => {
    const res = await getAddresses();
    if(res.status === 200){
      setList(res.data.data)
      dataTablesApply()
    }
  }

  const dataTablesApply = () => {
    if (!$.fn.DataTable.isDataTable("#addressTableDT")) {
      setTimeout(function () {
        $("#addressTableDT").dataTable({
          "bDestroy": true,
          pagingType: "full_numbers",
          pageLength: 10,
          processing: true,
          dom: "Bfrtip",
          select: {
            style: "single",
          },

          buttons: [
            {
              extend: "pageLength",
              className: "btn btn-sm btn-secondary bg-secondary",
            },
            {
              extend: "csv",
              className: "btn btn-sm btn-success bg-success",
            },
            {
              extend: "print",
              customize: function (win) {
                $(win.document.body).css("font-size", "10pt");
                $(win.document.body)
                  .find("table")
                  .addClass("compact")
                  .css("font-size", "inherit");
              },
              className: "btn btn-sm btn-danger bg-danger",
            },
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

  const generateAddress = async() => {
    setLoader(true);
    const res = await createAddresses();
    if(res.status === 200){
      setLoader(false);
      $("#addressTableDT").DataTable().destroy()
      getList();
      toast.success("New Address Genarate Successfully.")
    }
  }

  return (
    <>
      <div className="content-header">
        <div className="container">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-white"> Addresses List</h1>
            </div>
            <div className="col-sm-6">
              <button class="btn btn-primary btn-sm float-sm-right" onClick={() => generateAddress()}>
                {
                  loader === true ? 
                  <>
                    <div class="spinner-border spinner-border-sm" role="status">
                      <span class="visually-hidden"></span>
                    </div>
                  </>
                  :
                  <>
                    Generate New Address
                  </>
                } 
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="card transparent-card">
                <div className="card-body p-2">
                  <table className="table" id="addressTableDT">
                    <thead>
                      <tr>
                        <th style={{width: "10px"}}>#</th>
                        <th>Addresses</th>
                        <th>Mine</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        list.length > 0 ?
                        list.map((ele, index) => {
                          return(<>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{ele.address}</td>
                              <td>{ele.ismine === true ? <><span class="badge badge-success">mine</span></> : "-"}</td>
                            </tr>
                          </>)
                        }) :
                        <><tr><td colSpan={3} className="text-center">No addresses found.</td></tr></>
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

export default AddressesCompoenent;
