import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from './../../components/Layout/UserMenu';

const Profile = () => {
  return (
    <>
      <Layout>
        <div className="container-fluid dashboard">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">User Profile</div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Orders;
