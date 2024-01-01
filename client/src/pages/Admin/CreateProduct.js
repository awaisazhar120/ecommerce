import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const CreateProduct = () => {
  return (
    <>
      <Layout title={"Dashboard - Create Product"}>
        <div className="container-fluid dashboard">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">Other Content</div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
