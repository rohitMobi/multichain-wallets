import { useEffect, useState } from "react";
import { listAtreams } from "../../Services/api";
import { format } from 'date-fns'
import $ from "jquery";

const StreamsCompoenent = () => {

  const [list, setList] = useState({});

  useEffect(() => {
    getList();
  }, [])

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

                  <table className="table" id="streamsTableDT">
                    <thead>
                      <tr>
                        <th style={{ width: "10px" }}>#</th>
                        <th>Name</th>
                        <th>Create Txid</th>
                        <th>Items</th>
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
                                <td>{ele.items ? ele.items : "Not Subscribed"}</td>
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

export default StreamsCompoenent;
