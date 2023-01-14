import { useEffect, useState } from "react";
import { getInfo } from "../../Services/api";

const NodeCompoenent = () => {

  const [list, setList] = useState({})
  const [modal, setModal] = useState(false)

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
            <div className="col-sm-6">
              <button className="btn float-right" onClick={() => { setModal(true) }}><i class="fa fa-question-circle text-white" aria-hidden="true"></i></button>
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
      {
        modal == true && <>
          <div className="modal">
            <div className="card text-white" style={{ background: "rgba(255, 255, 255, 0.2)", width: "50%" }}>
              
              <div className="left-gold"></div>
              <div className="card-header">
                  <h3>Node Information</h3>
              </div>
              <div className="card-body">
                In the node information section show all the information about the node. In the section name represents the name of the chain we has to created.
                Version represents the version of the multichain. Protocol information show the which protocol use to create the chain. Node Address show the address of the node.
                Blocks represents the how many blocks we have to create on the chain. Peers represent the number of peers connected to the chain
              </div>
              <div className="card-footer">
                <button className="btn text-white float-right" onClick={() => { setModal(false) }}>Close</button>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default NodeCompoenent;
