import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("Enter Category Name");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/all-categories`
      );

      if (data.success) {
        setCategories(data?.allCategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(data.message);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data?.success) {
        toast.success(data?.message);
        setVisible(false);
        setUpdateName("");
        setSelected(null);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <>
      <Layout title={"Dashboard - Create Category"}>
        <div className="container-fluid dashboard">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Manage Category</h1>
              <div className="p-3 w-50">
                <CategoryForm
                  value={name}
                  setValue={setName}
                  handleSubmit={handleSubmit}
                />
              </div>
              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <>
                        <tr key={c._id}>
                          <td>{c.name}</td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setVisible(true);
                                setSelected(c);
                                setUpdateName(c.name);
                              }}
                            >
                              Edit
                            </button>
                            <button className="btn btn-danger ms-2"
                            onClick={()=>{handleDelete(c._id)}}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal
                footer={null}
                open={visible}
                onCancel={() => setVisible(false)}
              >
                <CategoryForm
                  value={updateName}
                  setValue={setUpdateName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
