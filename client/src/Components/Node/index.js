import { useEffect, useState } from "react";
import { getInfo } from "../../Services/api";

const NodeCompoenent = () => {

  const [list, setList] = useState({})

  useEffect(() => {
    getList();
  }, [])

  const getList = async () => {
    const res = await getInfo();
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
              <h1 className="m-0 text-white"> Node Information </h1>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="row">
                <div className="offset-lg-3 col-lg-6">
                  <div className="card bg-transparent-blue">
                    <div className="right-gold"></div>
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>{list.chainname}</td>
                        </tr>
                        <tr>
                          <td>Version</td>
                          <td>{list.version}</td>
                        </tr>
                        <tr>
                          <td>Protocol</td>
                          <td>{list.protocol}</td>
                        </tr>
                        <tr>
                          <td>Node Address</td>
                          <td>{list.nodeaddress}</td>
                        </tr>
                        <tr>
                          <td>Blocks</td>
                          <td>{list.blocks}</td>
                        </tr>
                        <tr>
                          <td>Peers</td>
                          <td>{list.connections}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NodeCompoenent;
