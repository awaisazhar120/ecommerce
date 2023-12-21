import React from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { json } from "react-router-dom";

const HomPage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <Layout>
        <h1>Home Page</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </Layout>
    </div>
  );
};

export default HomPage;
