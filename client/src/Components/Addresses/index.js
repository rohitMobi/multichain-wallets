import { useEffect, useState } from "react"
import { getAddresses } from "../../Services/api";

const AddressesCompoenent = () => {

  useEffect(() => {
    getList();
  }, [])

  const getList = async() => {
    const res = await getAddresses();
    if (res.status === 200) {
      console.log("res: ", res);
    } else if (res.status === 500) {
    }
  }


  return (
    <>
      <div class="content-header">
        <div class="container">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0"> Addresses List</h1>
            </div>
          </div>
          <div className="row mt-3">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body p-0">
                  <table class="table">
                    <thead>
                      <tr>
                        <th style={{width: "10px"}}>#</th>
                        <th>Addresses</th>
                        <th>Mine</th>
                      </tr>
                    </thead>
                    <tbody>
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
