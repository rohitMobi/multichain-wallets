const DashboardCompoenent = () => {
  return (
    <>
      <div className="text-center m-5"  style={{paddingBottom: "13rem", paddingTop: "5rem", position: "relative"}}>
        
        <h1 className="text-white fs-bold">
          Enterprise blockchain.That actually works.
        </h1>
        <img
          src="https://avatars.githubusercontent.com/u/15611443?s=280&v=4"
          className="mb-5 imgMainDashboard"
        />
      </div>
      <div
        class="row d-flex justify-content-center py-5"
        style={{ background: "#564bed" }}
      >
        <div class="col-lg-5 text-center">
          <div class="section-title text-white">
            <h4>
              MultiChain helps organizations to build and deploy blockchain
              applications with speed.
            </h4>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 p-5">
            <div className="card transparent-card-primary">
              <div className="card-body">
                <div class="row">
                  <div class="col-lg-6 text-center p-4">
                    <div class="users__pic">
                      <img
                        src="https://www.multichain.com/assets/rapid-icon.png"
                        data-ll-status="loaded"
                        class="entered lazyloaded"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="users__text pt-5">
                      <div class="users__text__title">
                        <h2>Rapid deployment</h2>
                        <hr
                          style={{
                            background: "white",
                            width: "80%",
                            textAlign: "left !important",
                            marginLeft: "0",
                          }}
                        ></hr>
                        <p>
                          Just two simple steps to create a new blockchain, and
                          three to connect to an existing one. Deploy unlimited
                          blockchains per server for cross-chain applications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 p-5">
            <div className="card transparent-card-primary">
              <div className="card-body">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="users__text pt-5">
                      <div class="users__text__title">
                        <h2>Unlimited assets</h2>
                        <hr
                          style={{
                            background: "white",
                            width: "80%",
                            textAlign: "left !important",
                            marginLeft: "0",
                          }}
                        ></hr>
                        <p>
                          Issue millions of assets and tokens, all tracked and
                          verified at the network level. Perform safe
                          multi-asset and multi-party atomic exchange
                          transactions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 text-center p-4">
                    <div class="users__pic">
                      <img
                        src="https://www.multichain.com/assets/asset-icon.png"
                        data-ll-status="loaded"
                        class="entered lazyloaded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 p-5">
            <div className="card transparent-card-primary">
              <div className="card-body">
                <div class="row">
                  <div class="col-lg-6 text-center p-4">
                    <div class="users__pic">
                      <img
                        src="https://www.multichain.com/assets/stream-icon.png"
                        data-ll-status="loaded"
                        class="entered lazyloaded"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="users__text pt-5">
                      <div class="users__text__title">
                        <h2>Data streams</h2>
                        <hr
                          style={{
                            background: "white",
                            width: "80%",
                            textAlign: "left !important",
                            marginLeft: "0",
                          }}
                        ></hr>
                        <p>
                          Create multiple key-value, time series or identity
                          databases. Store data on- or off-chain. Ideal for data
                          sharing, timestamping and encrypted archiving.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 p-5">
            <div className="card transparent-card-primary">
              <div className="card-body">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="users__text pt-5">
                      <div class="users__text__title">
                        <h2>Fine-grained permissions</h2>
                        <hr
                          style={{
                            background: "white",
                            width: "80%",
                            textAlign: "left !important",
                            marginLeft: "0",
                          }}
                        ></hr>
                        <p>
                          Optionally control who can connect, send and receive
                          transactions, create assets, streams and blocks. Each
                          blockchain is as open or as closed as you need.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 text-center p-4">
                    <div class="users__pic">
                      <img
                        src="https://www.multichain.com/assets/permission-icon.png"
                        data-ll-status="loaded"
                        class="entered lazyloaded"
                      />
                    </div>
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

export default DashboardCompoenent;
