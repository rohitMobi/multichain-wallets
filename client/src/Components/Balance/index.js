import { useEffect, useState } from "react";
import { gettotalbalances } from "../../Services/api";
import toast from 'react-hot-toast';

const TotalBalanceCompoenent = () => {

  const [list, setList] = useState([])
  const [listNew, setListNew] = useState([])

  useEffect(() => {
    getList();
  }, [])

  const getList = async () => {
    const res = await gettotalbalances();
    if (res.status === 200) {
      var array = [];
      for (const obj in res.data.data) {
        if (Object.hasOwnProperty.call(res.data.data, obj)) {
          const element = res.data.data[obj];
          element.forEach((ele) => {
            array.push({ ...ele, account: obj })
          });
        }
      }
      setList(array)
      setListNew(array)
    }
  }

  const changeAddressFormat = (ele) => {
    return ((ele !== "" && ele !== null && ele !== undefined) ? ele.substr(0, 4) + "..." + ele.substr(ele.length - 4, ele.length) : "-")
  }

  async function filterByValue(string) {
    const res = await gettotalbalances();
    if (res.status === 200) {
      var array = [];
      for (const obj in res.data.data) {
        if (Object.hasOwnProperty.call(res.data.data, obj)) {
          const element = res.data.data[obj];
          element.forEach((ele) => {
            array.push({ ...ele, account: obj })
          });
        }
      }


      const filtered = array.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(string)));
      // console.log("filtered: ", filtered);
      return filtered;
    }
  }

  const onKeyType = async(e) => {
    var result = await filterByValue(e);
    console.log("result : ", result)
    setListNew(result)
  }

  const copyPaste = (text) => {
    navigator.clipboard.writeText(text)
    toast.success("Copy wallet address " + changeAddressFormat(text));
  }

  return (
    <>
      <div className="content-header">
        <div className="container">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-white"> Available Balances </h1>
            </div>
            <div className="col-sm-6 dataTables_wrapper no-footer" id="tokenTableDT_wrapper">
              <div id="tokenTableDT_filter" class="dataTables_filter">
                <label className="text-white">
                  Search:
                  <input type="search" onKeyUp={(e) => onKeyType(e.target.value)} class="" placeholder="" aria-controls="tokenTableDT" />
                </label>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="row">
                {
                  listNew.length > 0 ?
                    listNew.filter((ele) => { return ele.account !== "total" }).map((ele, index) => {
                      return (<>
                        <div className="col-lg-3 col-6">
                          <div className="small-box bg-transparent-blue">
                            <div className="right-gold"></div>
                            <div className="inner">
                              <h3>{ele.qty} <span style={{ fontSize: "small" }}>{ele.name}</span></h3>
                              <p>{ele.account === "total" ? "Total" : changeAddressFormat(ele.account)} <i class="fa fa-clone" style={{ zindex: 1 }} aria-hidden="true" onClick={() => { copyPaste(ele.account) }}></i></p>
                            </div>
                            {/* <div className="icon">
                              <i className="ion ion-bag"></i>
                            </div> */}
                          </div>
                        </div>
                      </>)
                    }) :
                    <><div className="col-lg-12 text-center text-white">No balance found</div></>
                }
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-white"> Total Balances </h1>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="row">
                {
                  listNew.length > 0 ?
                    listNew.filter((ele) => { return ele.account === "total" }).map((ele, index) => {
                      return (<>
                        <div className="col-lg-3 col-6">
                          <div className="small-box bg-transparent-blue">
                            <div className="right-gold"></div>
                            <div className="inner">
                              <h3>{ele.qty} <span style={{ fontSize: "small" }}>{ele.name}</span></h3>
                              <p>{ele.account === "total" ? "Total" : changeAddressFormat(ele.account)}</p>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalBalanceCompoenent;
